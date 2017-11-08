import { add, subtract, square, sqrt, ceil } from 'mathjs';
import { Subject } from 'rxjs/Subject';

// DONE déplacer la gestion de la ligne dans tools/animated-line trello:#66
export default class AnimatedLine {
  initLength;
  currentLength;
  line;
  path;
  subject;
  sensObservable;
  observable;
  sensSubscribe;

  constructor(line, delta, sensObservable) {
    this.line = line;
    this.initLength = ceil(sqrt(add(
      square(subtract(line.end.x, line.begin.x)),
      square(subtract(line.end.y, line.begin.y))
    )));
    this.deltaX = (line.end.x - line.begin.x) / delta;
    this.deltaY = (line.end.y - line.begin.y) / delta;
    this.interval = this.initLength / delta;
    this.sensObservable = sensObservable;
    this.subject = new Subject();
  }

  draw(canvas) {
    this.path = canvas.path(`M${this.line.begin.x} ${this.line.begin.y} L${this.line.end.x} ${this.line.end.y}`);
    this.path.node.setAttribute('style', `stroke-dasharray: ${this.initLength}; stroke-dashoffset: ${this.initLength};`);
    return this;
  }

  animate() {
    this.currentLength = this.initLength;
    const currentPoint = this.line.begin;
    this.sensSubscribe = this.sensObservable.subscribe((sens) => {
      this.subject.next(sens);
    });
    this.observable = this.subject
      .map(sens => ({
        newLength: this.currentLength + (sens * this.interval),
        sens
      }))
      .filter(o => Math.trunc(o.newLength) >= this.initLength && Math.trunc(o.newLength) <= this.initLength * 2)
      .do((o) => { this.currentLength = o.newLength; })
      .do(() => {
        // DONE permettre l'animation de l'écran sans dessiner de ligne trello:#67
        if (this.path) {
          this.path.node.setAttribute('style', `stroke-dasharray: ${this.currentLength}; stroke-dashoffset: ${this.initLength};`);
        }
      })
      .map((o) => {
        // DONE déterminer le sens du déplacement x et y
        currentPoint.x += this.deltaX * o.sens;
        currentPoint.y += this.deltaY * o.sens;
        return currentPoint;
      })
      .map(point => ({
        x: Math.trunc(point.x),
        y: Math.trunc(point.y)
      }));
    return this;
  }

  subscribe(callback) {
    return this.observable.subscribe(callback);
  }

  unsubscribe() {
    this.sensSubscribe.unsubscribe();
  }
}
