import React from 'react';

import RoadTripCanvas from './canvas';
import * as Boxes from './boxes';

export default class RoadTrip extends React.Component {
  width = 1080;
  height = 1120;
  pixelRatio = 8;

  constructor(props) {
    super(props);
    let windowWidth = 0;
    let windowHeight = 0;
    if (typeof window !== 'undefined') {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    }
    this.state = {
      windowWidth,
      windowHeight,
      pixelRatio: this.pixelRatio,
      canvasCenter: {
        x: 0,
        y: 0
      },
      boxes: []
    };
    this.onResize = this.onResize.bind(this);
    this.centerCanvas = this.centerCanvas.bind(this);
  }

  centerCanvas() {
    const point = {
      x: 708 * this.state.pixelRatio,
      y: 502 * this.state.pixelRatio
    };
    const x = (0 - point.x) + (this.state.windowWidth / 2);
    const y = (0 - point.y) + (this.state.windowHeight / 2);
    this.setState({
      canvasCenter: { x, y }
    });
  }

  defineBoxes() {
    const boxes = Boxes.find({ x: 708, y: 502 });
    this.setState({
      boxes: [...boxes]
    });
  }

  onResize() {
    if (typeof window !== 'undefined') {
      this.setState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
      this.centerCanvas();
      this.defineBoxes();
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize, false);
    }
    this.centerCanvas();
    this.defineBoxes();
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  render() {
    return (
      <main id="roadTrip">
        <RoadTripCanvas
          canvasWidth={this.width}
          canvasHeight={this.height}
          canvasCenter={this.state.canvasCenter}
          pixelRatio={this.state.pixelRatio}
          popinBoxes={this.state.boxes}
        ></RoadTripCanvas>
      </main>
    );
  }
}
