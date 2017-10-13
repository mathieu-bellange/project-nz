import Airplane from './airplane';

export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  pixelRatio;

  constructor(canvas, pixelRatio, actualPointSubject) {
    this.canvas = canvas;
    this.pixelRatio = pixelRatio;
    this.actualPointSubject = actualPointSubject;
  }

  launch() {
    const actualPoint = {
      x: 708 * this.pixelRatio,
      y: 502 * this.pixelRatio,
      id: 1
    };
    this.actualPointSubject.next(actualPoint);
    const airplane = new Airplane();
    airplane.draw(this.canvas, actualPoint);
    airplane.animate();
  }
}
