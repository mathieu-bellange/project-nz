import React from 'react';
import Raphael from 'raphael';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import Scenario from './scenario';
import RoadTripCanvas from './canvas';
import * as Boxes from './boxes';

// BACKLOG initialiser le tutorial au lancement du premier road trip
// BACKLOG ajouter une fonction de sauvegarde à l'arrivée d'un nouveau point
export default class RoadTrip extends React.Component {
  width = 1080;
  height = 1120;
  pixelRatio = 20;
  canvasId = 'roadTrip-canvas';
  actualPointSubject;
  actualBoxesSubject;
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
    // NOTE Faut-il conserver le key press enter ?
    Observable.fromEvent(window, 'keypress')
      .filter(event => event.keyCode === 13)
      .subscribe(() => self.scenario.nextStep());
    this.centerCanvas = this.centerCanvas.bind(this);
    this.initRaphael = this.initRaphael.bind(this);
    this.defineBoxes = this.defineBoxes.bind(this);
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

    // FIXME code mort
    // drawing on the canvas
    /* const niLayer = new NorthIsland.Layer(canvas, this.pixelRatio);
    niLayer.draw();
    const rniLayer = new NorthIsland.RoadLayer(canvas, this.pixelRatio);
    rniLayer.draw(); */
    // BACKLOG récupérer le point de départ du système de sauvegarde mis en place et l'injecter dans le scenario
    // BACKLOG récupérer le bon scenario suivant le point de sauvegarde
    this.scenario = new Scenario(canvas, this.pixelRatio, this.actualPointSubject, this.actualBoxesSubject);
    this.scenario.launch(0);
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
          popinBoxes={this.state.boxes}
          drawCircle={this.state.drawCircle}
        ></RoadTripCanvas>
      </main>
    );
  }
}
