import { Subject } from 'rxjs';

export default class AnimatedLine {
  initLength;

  currentLength;

  line;

  path;

  sensSubject;

  sensSubscribe;

  constructor(line, hideRoad, canvas) {
    this.line = line;
    const sqrt = ((line.end.x - line.begin.x) ** 2) + ((line.end.y - line.begin.y) ** 2);
    this.initLength = Math.ceil(Math.sqrt(sqrt));
    this.currentLength = this.initLength;
    this.sensSubject = new Subject();
    if (!hideRoad) {
      this.path = canvas.line(
        this.line.begin.x, this.line.begin.y, this.line.end.x, this.line.end.y
      ).stroke({
        dasharray: this.initLength,
        dashoffset: this.initLength,
        color: '#000',
        width: 2
      });
    }
  }

  animate(o) {
    this.currentLength = this.currentLength + (o.sens * (this.initLength / o.interval));
    // permet l'animation de l'écran sans dessiner de ligne
    if (this.path) {
      this.path.stroke({ dasharray: this.currentLength, dashoffset: this.initLength });
    }
    this.sensSubject.next({
      x: o.currentPoint.x + (((this.line.end.x - this.line.begin.x) / o.interval) * o.sens),
      y: o.currentPoint.y + (((this.line.end.y - this.line.begin.y) / o.interval) * o.sens)
    });
  }

  subscribe(callback) {
    this.sensSubscribe = this.sensSubject.subscribe(callback);
    return this.sensSubscribe;
  }

  unsubscribe() {
    if (this.sensSubscribe) this.sensSubscribe.unsubscribe();
  }

  resetLength() {
    this.currentLength = this.initLength;
  }
}
