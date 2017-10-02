import React from 'react';
import PropTypes from 'prop-types';
import Raphael from 'raphael';

import './canvas.css';
import * as NorthIsland from '../north-island';

export default class RoadTripCanvas extends React.Component {
  canvasId = 'roadTrip-canvas';

  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    canvasCenter: PropTypes.object.isRequired,
    pixelRatio: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      canvasStyle: {}
    };
    this.defineCanvasStyle = this.defineCanvasStyle.bind(this);
  }

  componentDidMount() {
    // init Rapahael
    const rsr = Raphael(
      this.canvasId,
      this.props.canvasWidth * this.props.pixelRatio,
      this.props.canvasHeight * this.props.pixelRatio
    );
    rsr.setViewBox(
      0,
      0,
      this.props.canvasWidth * this.props.pixelRatio,
      this.props.canvasHeight * this.props.pixelRatio
    );
    // drawing on the canvas
    const niLayer = new NorthIsland.Layer(rsr, this.props.pixelRatio);
    niLayer.draw();
    const rniLayer = new NorthIsland.RoadLayer(rsr, this.props.pixelRatio);
    rniLayer.draw();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.canvasCenter !== this.props.canvasCenter) {
      this.defineCanvasStyle();
    }
  }

  defineCanvasStyle() {
    this.setState({
      canvasStyle: {
        left: this.props.canvasCenter.x,
        top: this.props.canvasCenter.y
      }
    });
  }

  render() {
    return (
        <div id="viewport">
          <div id={this.canvasId} style={this.state.canvasStyle}>
          </div>
        </div>
    );
  }
}
