import { Subject } from 'rxjs/Subject';

export default class AnimatedLine {
  initLength;
  currentLength;
  line;
  path;
  sensSubject;
  sensSubscribe;

  constructor(line) {
    this.line = line;
    this.initLength = Math.ceil(Math.sqrt(
      ((line.end.x - line.begin.x) ** 2) + ((line.end.y - line.begin.y) ** 2)
    ));
    this.currentLength = this.initLength;
    this.sensSubject = new Subject();
  }

  draw(canvas) {
    this.path = canvas.path(`M${this.line.begin.x} ${this.line.begin.y} L${this.line.end.x} ${this.line.end.y}`);
    this.path.node.setAttribute('style', `stroke-dasharray: ${this.initLength}; stroke-dashoffset: ${this.initLength};`);
    return this;
  }

  animate(o) {
    this.currentLength = this.currentLength + (o.sens * (this.initLength / o.interval));
    // permet l'animation de l'écran sans dessiner de ligne
    if (this.path) {
      this.path.node.setAttribute('style', `stroke-dasharray: ${this.currentLength}; stroke-dashoffset: ${this.initLength};`);
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
