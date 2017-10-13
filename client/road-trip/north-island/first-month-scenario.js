import Airplane from './airplane';

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
        keepPrevious: true
      };
      this.actualPointSubject.next(firstPoint);
    },
    // second step
    () => {
      const secondPoint = {
        x: 708 * this.pixelRatio,
        y: 502 * this.pixelRatio,
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
        id: 3,
        keepPrevious: false
      };
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
      id: 0
    };
    this.actualPointSubject.next(actualPoint);
    this.airplane = new Airplane();
    this.airplane.draw(this.canvas, actualPoint);
    this.airplane.animate();
  }

  nextStep(index) {
    this.steps[index]();
  }
}
