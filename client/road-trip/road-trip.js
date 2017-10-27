import React from 'react';
import Raphael from 'raphael';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import * as NorthIsland from './north-island';
import RoadTripCanvas from './canvas';
import * as Boxes from './boxes';

export default class RoadTrip extends React.Component {
  width = 1080;
  height = 1120;
  pixelRatio = 20;
  canvasId = 'roadTrip-canvas';
  actualPointSubject;
  firstMonthScenario;

  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      pixelRatio: this.pixelRatio,
      canvasCenter: {
        x: 0,
        y: 0
      },
      boxes: [],
      drawCircle: false
    };
    this.actualPointSubject = new Subject();
    const theOne = Observable.combineLatest(
      Observable
        .fromEvent(window, 'resize')
        .map(() => ({ width: window.innerWidth, height: window.innerHeight }))
        .startWith({ width: window.innerWidth, height: window.innerHeight }),
      this.actualPointSubject
    );
    theOne.subscribe((values) => {
      const [windowSize, actualPoint] = values;
      self.centerCanvas(actualPoint, windowSize);
      self.defineBoxes(actualPoint.id, actualPoint.keepPrevious);
      self.defineCircle(actualPoint.drawCircle);
    });
    Observable.fromEvent(window, 'keypress')
      .filter(event => event.keyCode === 13)
      .subscribe(() => self.firstMonthScenario.nextStep());
    this.centerCanvas = this.centerCanvas.bind(this);
    this.initRaphael = this.initRaphael.bind(this);
    this.defineCircle = this.defineCircle.bind(this);
    this.defineBoxes = this.defineBoxes.bind(this);
  }

  centerCanvas(actualPoint, windowSize) {
    const x = (0 - actualPoint.x) + (windowSize.width / 2);
    const y = (0 - actualPoint.y) + (windowSize.height / 2);
    this.setState({
      canvasCenter: { x, y }
    });
  }

  defineBoxes(id, keepPrevious) {
    let boxes = Boxes.find(id);
    if (keepPrevious) {
      boxes = this.state.boxes.filter(box => box.type).concat(boxes);
    }
    this.setState({
      boxes: [...boxes]
    });
  }

  defineCircle(drawCircle) {
    this.setState({
      drawCircle
    });
  }

  initRaphael() {
    // init Rapahael
    const canvas = Raphael(
      this.canvasId,
      this.width * this.pixelRatio,
      this.height * this.pixelRatio
    );
    canvas.setViewBox(
      0,
      0,
      this.width * this.pixelRatio,
      this.height * this.pixelRatio
    );

    // drawing on the canvas
    /* const niLayer = new NorthIsland.Layer(canvas, this.pixelRatio);
    niLayer.draw();
    const rniLayer = new NorthIsland.RoadLayer(canvas, this.pixelRatio);
    rniLayer.draw(); */
    this.firstMonthScenario = new NorthIsland.FirstMonthScenario(canvas, this.pixelRatio, this.actualPointSubject);
    this.firstMonthScenario.launch();
  }

  componentDidMount() {
    this.initRaphael();
  }

  render() {
    return (
      <main id="roadTrip">
        <RoadTripCanvas
          canvasId={this.canvasId}
          canvasCenter={this.state.canvasCenter}
          pixelRatio={this.state.pixelRatio}
          popinBoxes={this.state.boxes}
          drawCircle={this.state.drawCircle}
        ></RoadTripCanvas>
      </main>
    );
  }
}
