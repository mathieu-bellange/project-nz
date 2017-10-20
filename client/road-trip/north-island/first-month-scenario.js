import Airplane from './airplane';
import Sky from './sky';

export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  pixelRatio;
  airplane;

  steps = [
    // first step
    this.launch,
    () => {
      const firstPoint = {
        x: 708 * this.pixelRatio,
        y: 502 * this.pixelRatio,
        id: 1,
        drawCircle: false,
        keepPrevious: true
      };
      this.actualPointSubject.next(firstPoint);
    },
    // second step
    () => {
      const secondPoint = {
        x: 708 * this.pixelRatio,
        y: 502 * this.pixelRatio,
        drawCircle: false,
        id: 2,
        keepPrevious: true
      };
      this.actualPointSubject.next(secondPoint);
    },
    // third step
    () => {
      const thirdPoint = {
        x: 708 * this.pixelRatio,
        y: 502 * this.pixelRatio,
        drawCircle: false,
        id: 3,
        keepPrevious: false
      };
      this.sky.stop();
      this.airplane.stopAnimation();
      this.airplane.landing();
      this.actualPointSubject.next(thirdPoint);
    }
  ];

  constructor(canvas, pixelRatio, actualPointSubject) {
    this.canvas = canvas;
    this.pixelRatio = pixelRatio;
    this.actualPointSubject = actualPointSubject;
  }

  launch() {
    const actualPoint = {
      x: 708 * this.pixelRatio,
      y: 502 * this.pixelRatio,
      drawCircle: false,
      id: 0
    };
    this.actualPointSubject.next(actualPoint);
    this.airplane = new Airplane();
    this.airplane.draw(this.canvas, actualPoint);
    this.airplane.animate();
    this.sky = new Sky(this.canvas, actualPoint);
    this.sky.launch();
  }

  nextStep(index) {
    this.steps[index]();
  }
}
