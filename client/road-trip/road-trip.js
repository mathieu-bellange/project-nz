import React from 'react';
import Raphael from 'raphael';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import Scenario from './scenario';
import RoadTripCanvas from './canvas';
import RoadController from './road-controller';
import * as Boxes from './boxes';
import * as Popin from './popin';

// BACKLOG initialiser le tutorial au lancement du premier road trip trello:#70
// PLANNING ajouter une fonction de sauvegarde à l'arrivée d'un nouveau point trello:#73
// DONE ajouter un composant permettant de lancer la route trello:#72
export default class RoadTrip extends React.Component {
  width = 1080;
  height = 1120;
  pixelRatio = 20;
  canvasId = 'roadTrip-canvas';
  actualPointSubject;
  actualBoxesSubject;
  onRoadAgainSubject;
  scenario;

  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      canvasCenter: {
        x: 0,
        y: 0
      },
      boxes: [],
      drawCircle: false
    };
    this.actualPointSubject = new ReplaySubject(1);
    this.actualBoxesSubject = new Subject();
    this.onRoadAgainSubject = new BehaviorSubject(false);
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
    });
    this.actualBoxesSubject.subscribe((id) => {
      self.defineBoxes(id);
    });
    if (window.innerWidth < 680) {
      this.pixelRatio = 15;
    }
    this.centerCanvas = this.centerCanvas.bind(this);
    this.initRaphael = this.initRaphael.bind(this);
    this.defineBoxes = this.defineBoxes.bind(this);
    this.onNextStep = this.onNextStep.bind(this);
    this.onPreviousStep = this.onPreviousStep.bind(this);
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

    // PLANNING récupérer le point de départ du système de sauvegarde mis en place et l'injecter dans le scenario trello:#73
    // PLANNING récupérer le bon scenario suivant le point de sauvegarde trello:#73
    this.scenario = new Scenario(canvas, this.pixelRatio, this.actualPointSubject, this.actualBoxesSubject, this.onRoadAgainSubject);
    this.scenario.launch(0);
  }

  componentDidMount() {
    this.initRaphael();
  }

  onNextStep() {
    this.scenario.nextStep();
  }

  onPreviousStep() {
  }

  render() {
    return (
      <main id="roadTrip">
        <RoadTripCanvas
          canvasId={this.canvasId}
          canvasCenter={this.state.canvasCenter}
        ></RoadTripCanvas>
        <Popin.Wrapper
          drawCircle={this.state.drawCircle}
          popinBoxes={this.state.boxes}
        ></Popin.Wrapper>
        <RoadController
          hasNext={true}
          hasPrevious={false}
          hasClickedNext={this.onNextStep}
          hasClickedPrevious={this.onPreviousStep}
        ></RoadController>
      </main>
    );
  }
}
