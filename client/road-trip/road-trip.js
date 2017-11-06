import React from 'react';
import Raphael from 'raphael';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import * as NorthIsland from './north-island';
import RoadTripCanvas from './canvas';
import * as Boxes from './boxes';

// BACKLOG initialiser le tutorial au lancement du premier road trip
// BACKLOG ajouter une fonction de sauvegarde à l'arrivée d'un nouveau point
// TODO exposé le current point de l'affichage trello:#63
export default class RoadTrip extends React.Component {
  width = 1080;
  height = 1120;
  pixelRatio = 20;
  canvasId = 'roadTrip-canvas';
  actualPointSubject;
  firstMonthScenario;

  // TODO initialiser le point de départ du road trip trello:#63
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
    // NOTE revoir l'utilité de combiné les deux
    const theOne = Observable.combineLatest(
      Observable
        .fromEvent(window, 'resize')
        .map(() => ({ width: window.innerWidth, height: window.innerHeight }))
        .startWith({ width: window.innerWidth, height: window.innerHeight }),
      this.actualPointSubject
    );
    theOne.subscribe((values) => {
      // DOING Vérifier si l'on peut faire un traitement séparer de ses trois actions
      const [windowSize, actualPoint] = values;
      self.centerCanvas(actualPoint, windowSize);
      self.defineBoxes(actualPoint.id);
    });
    // NOTE Faut-il conserver le key press enter ?
    Observable.fromEvent(window, 'keypress')
      .filter(event => event.keyCode === 13)
      .subscribe(() => self.firstMonthScenario.nextStep());
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
    // TODO Récupérer le scénario depuis une liste de scénario trello:#64
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
