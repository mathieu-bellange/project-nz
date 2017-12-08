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
    this.initLength = Math.ceil(Math.sqrt(
      ((line.end.x - line.begin.x) ** 2) + ((line.end.y - line.begin.y) ** 2)
    ));
    this.deltaX = (line.end.x - line.begin.x) / delta;
    this.deltaY = (line.end.y - line.begin.y) / delta;
    this.interval = this.initLength / delta;
    this.sensObservable = sensObservable;
  }

  draw(canvas) {
    this.path = canvas.path(`M${this.line.begin.x} ${this.line.begin.y} L${this.line.end.x} ${this.line.end.y}`);
    this.path.node.setAttribute('style', `stroke-dasharray: ${this.initLength}; stroke-dashoffset: ${this.initLength};`);
    return this;
  }

  animate() {
    this.currentLength = this.initLength;
    this.sensObservable = this.sensObservable
      .do((o) => { this.currentLength = this.currentLength + (o.sens * this.interval); })
      .do(() => {
        // permet l'animation de l'écran sans dessiner de ligne
        if (this.path) {
          this.path.node.setAttribute('style', `stroke-dasharray: ${this.currentLength}; stroke-dashoffset: ${this.initLength};`);
        }
      })
      .map(o => ({
        x: o.currentPoint.x + (this.deltaX * o.sens),
        y: o.currentPoint.y + (this.deltaY * o.sens)
      }));
    return this;
  }

  subscribe(callback) {
    this.sensSubscribe = this.sensObservable.subscribe(callback);
    return this.sensSubscribe;
  }

  unsubscribe() {
    if (this.sensSubscribe) this.sensSubscribe.unsubscribe();
  }

  resetLength() {
    this.currentLength = this.initLength;
  }
}
