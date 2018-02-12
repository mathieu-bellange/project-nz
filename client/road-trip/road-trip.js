import React from 'react';
import SVG from 'svg.js';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { Scenarios } from './scenario';
import RoadTripCanvas from './canvas';
import RoadController from './road-controller';
import BorneKm from './borne-km';
import * as Boxes from './boxes';
import * as Popin from './popin';
import LoadingComponent from './loading';

export default class RoadTrip extends React.Component {
  width = 1080;
  height = 1120;
  pixelRatio = 20;
  canvasId = 'roadTrip-canvas';
  actualPointSubject;
  actualBoxesSubject;
  onRoadAgainSubject;
  nextKmTraveledSubject;
  displayBorneKmSubject;
  scenario;

  constructor(props) {
    super(props);
    this.state = {
      canvasCenter: {
        x: 0,
        y: 0
      },
      hasNext: true,
      hasPrevious: false,
      boxes: [],
      drawCircle: false,
      loading: true,
      startKm: 0,
      nextKm: 0,
      displayBorneKm: false
    };
    this.actualPointSubject = new ReplaySubject(1);
    this.actualBoxesSubject = new Subject();
    this.hasNextSubject = new Subject();
    this.hasPreviousSubject = new Subject();
    this.onRoadAgainSubject = new Subject();
    this.isLoadingSubject = new Subject();
    this.nextKmTraveledSubject = new Subject();
    this.displayBorneKmSubject = new Subject();
    const theOne = Observable.combineLatest(
      Observable
        .fromEvent(window, 'resize')
        .map(() => ({ width: window.innerWidth, height: window.innerHeight }))
        .startWith({ width: window.innerWidth, height: window.innerHeight }),
      this.actualPointSubject
    );
    theOne.subscribe((values) => {
      const [windowSize, actualPoint] = values;
      this.centerCanvas(actualPoint, windowSize);
    });
    this.actualBoxesSubject.subscribe((id) => {
      this.defineBoxes(id);
    });
    this.hasNextSubject.subscribe(value => this.setState({ hasNext: value }));
    this.hasPreviousSubject.subscribe(value => this.setState({ hasPrevious: value }));
    this.onRoadAgainSubject.subscribe(value => this.setState({ hasNext: value, hasPrevious: value }));
    this.isLoadingSubject.subscribe(value => this.setState({ loading: value }));
    this.nextKmTraveledSubject.subscribe(value => this.setState({ nextKm: this.state.nextKm + value }));
    this.displayBorneKmSubject.subscribe(value => this.setState({ displayBorneKm: value }));
    if (window.innerWidth < 680) {
      this.pixelRatio = 15;
    }
    this.centerCanvas = this.centerCanvas.bind(this);
    this.initSvgJs = this.initSvgJs.bind(this);
    this.defineBoxes = this.defineBoxes.bind(this);
    this.onNextStep = this.onNextStep.bind(this);
    this.onPreviousStep = this.onPreviousStep.bind(this);
    this.onKmComplete = this.onKmComplete.bind(this);
  }

  centerCanvas(actualPoint, windowSize) {
    const x = (0 - actualPoint.x) + (windowSize.width / 2);
    const y = (0 - actualPoint.y) + (windowSize.height / 2);
    this.setState({
      canvasCenter: { x, y }
    });
  }

  defineBoxes(id) {
    const currentBox = Boxes.find(id);
    let { boxes } = currentBox;
    if (currentBox.keepPrevious) {
      boxes = this.state.boxes.filter(box => box.type).concat(boxes);
    }
    this.setState({
      drawCircle: currentBox.circle,
      boxes: [...boxes]
    });
  }

  initSvgJs() {
    // init SVG.js
    const draw = SVG(this.canvasId).size(
      this.width * this.pixelRatio,
      this.height * this.pixelRatio
    );
    draw.viewbox(
      0,
      0,
      this.width * this.pixelRatio,
      this.height * this.pixelRatio
    );

    this.scenario = new Scenarios(
      draw,
      this.pixelRatio,
      this.actualPointSubject,
      this.actualBoxesSubject,
      this.onRoadAgainSubject,
      this.hasPreviousSubject,
      this.hasNextSubject,
      this.isLoadingSubject,
      this.nextKmTraveledSubject,
      this.displayBorneKmSubject
    );
    this.scenario.launch();
  }

  componentDidMount() {
    this.initSvgJs();
  }

  onNextStep() {
    this.scenario.nextStep();
  }

  onPreviousStep() {
    this.scenario.previousStep();
  }

  onKmComplete() {
    this.setState({ startKm: this.state.nextKm });
  }

  render() {
    return (
      <div id="roadTrip">
        <RoadTripCanvas
          canvasId={this.canvasId}
          canvasCenter={this.state.canvasCenter}
          loading={this.state.loading}
        ></RoadTripCanvas>
        <Popin.Wrapper
          drawCircle={this.state.drawCircle}
          popinBoxes={this.state.boxes}
          loading={this.state.loading}
        ></Popin.Wrapper>
        <RoadController
          hasNext={this.state.hasNext}
          hasPrevious={this.state.hasPrevious}
          hasClickedNext={this.onNextStep}
          hasClickedPrevious={this.onPreviousStep}
          loading={this.state.loading}
        ></RoadController>
        <BorneKm
          display={this.state.displayBorneKm}
          start={this.state.startKm}
          end={this.state.nextKm}
          onComplete={this.onKmComplete}
          loading={this.state.loading}
        ></BorneKm>
        <LoadingComponent
          loading={this.state.loading}
        ></LoadingComponent>
      </div>
    );
  }
}
