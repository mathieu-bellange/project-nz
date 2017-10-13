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
    const airplaneSize = {
      w: 334,
      h: 128
    };
    this.canvas.image('/images/airplane.svg', actualPoint.x - (airplaneSize.w / 2), actualPoint.y - (airplaneSize.h / 2), airplaneSize.w, airplaneSize.h);
  }
}
