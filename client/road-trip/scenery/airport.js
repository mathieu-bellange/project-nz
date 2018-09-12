import { Subject } from 'rxjs';

import Airplane from './airplane';

export default class Airport {
  runway;
  airplane;
  airplaneLandingSubject;
  runwaySize = {
    w: 509,
    h: 209
  };

  constructor() {
    this.airplaneLandingSubject = new Subject();
    this.airplaneLandingSubject.subscribe(() => {
      this.removeRunway();
    });
    if (window.innerWidth < 680) {
      this.runwaySize = {
        w: 339,
        h: 139
      };
    }
    this.airplane = new Airplane(this.airplaneLandingSubject);
  }

  landing(draw, position) {
    this.runwayPosition = {
      x: position.x - (this.runwaySize.w / 2),
      y: position.y - (this.runwaySize.h / 2)
    };
    this.runway = draw.image('/images/runway.svg', this.runwaySize.w, this.runwaySize.h)
      .move(this.runwayPosition.x, this.runwayPosition.y);
    this.airplane.stopAnimation();
    this.airplane.landing(this.runwayPosition);
  }

  fliing(canvas, position) {
    this.airplane.draw(canvas, position);
    this.airplane.animate();
  }

  removeRunway() {
    this.runway.animate(3000, '-').move(this.runwayPosition.x - this.runwaySize.w, this.runwayPosition.y).after(() => {
      this.runway.remove();
    });
  }
}
