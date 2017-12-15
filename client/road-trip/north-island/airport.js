import { Subject } from 'rxjs/Subject';

import Airplane from './airplane';

// DONE modifier les fonctions d'animations des nuages, atterrisage... sous petites résolutions trello:#34
export default class Airport {
  runway;
  airplane;
  airplaneLandingSubject;
  runwaySize = {
    w: 668,
    h: 128
  };

  constructor() {
    this.airplaneLandingSubject = new Subject();
    this.airplaneLandingSubject.subscribe(() => {
      this.removeRunway();
    });
    if (window.innerWidth < 680) {
      this.runwaySize = {
        w: 334,
        h: 64
      };
    }
    this.airplane = new Airplane(this.airplaneLandingSubject);
  }

  landing(canvas, position) {
    this.runway = canvas.image('/images/runway.svg', position.x - (this.runwaySize.w / 2), position.y, this.runwaySize.w, this.runwaySize.h);
    this.airplane.stopAnimation();
    this.airplane.landing(position);
  }

  fliing(canvas, position) {
    this.airplane.draw(canvas, position);
    this.airplane.animate();
  }

  removeRunway() {
    this.runway.animate({ transform: `t-${this.runwaySize.w},0` }, 4000, () => {
      this.runway.remove();
    });
  }
}
