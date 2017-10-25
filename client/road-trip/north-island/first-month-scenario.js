import { add, divide, subtract, multiply, unaryMinus } from 'mathjs';

import Airplane from './airplane';
import Airport from './airport';
import Sky from './sky';


export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  pixelRatio;
  airplane;
  airport;

  steps = [
    // first step
    this.launch,
    () => {
      const firstPoint = {
        x: 708 * this.pixelRatio + (window.innerWidth / 2),
        y: 502 * this.pixelRatio - (window.innerHeight / 2),
        id: 1,
        drawCircle: false,
        keepPrevious: true
      };
      this.actualPointSubject.next(firstPoint);
    },
    // second step
    () => {
      const secondPoint = {
        x: 708 * this.pixelRatio + (window.innerWidth / 2),
        y: 502 * this.pixelRatio - (window.innerHeight / 2),
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
      this.airport.draw(this.canvas, {
        x: thirdPoint.x - window.innerWidth/2,
        y: thirdPoint.y + window.innerHeight/2
      });
      this.lineDeplacementAnimation({
        x: 708 * this.pixelRatio + (window.innerWidth / 2),
        y: 502 * this.pixelRatio - (window.innerHeight / 2)
      }, thirdPoint);
    }
  ];

  constructor(canvas, pixelRatio, actualPointSubject) {
    this.canvas = canvas;
    this.pixelRatio = pixelRatio;
    this.actualPointSubject = actualPointSubject;
    this.airplane = new Airplane();
    this.airport = new Airport();
  }

  launch() {
    const actualPoint = {
      x: 708 * this.pixelRatio + (window.innerWidth / 2),
      y: 502 * this.pixelRatio - (window.innerHeight / 2),
      drawCircle: false,
      id: 0
    };
    this.actualPointSubject.next(actualPoint);
    this.airplane.draw(this.canvas, actualPoint);
    this.airplane.animate();
    this.sky = new Sky(this.canvas, actualPoint);
    this.sky.launch();
  }

  nextStep(index) {
    this.steps[index]();
  }

  lineDeplacementAnimation(pointA, pointB) {
    const alpha = divide(subtract(-pointA.y, -pointB.y), subtract(pointA.x, pointB.x));
    const k = subtract(-pointA.y, multiply(alpha, pointA.x));
    const delta = Math.abs(divide(subtract(pointB.x, pointA.x), 400));
    const func = pointA.x < pointB.x ? add : subtract;
    this.movePointTo(delta, alpha, k, pointA.x, pointB.x, func);
  }

  movePointTo(delta, alpha, k, x, exitX, exec) {
    const newX = exec(x, delta);
    const orthogonalY = add(multiply(newX, alpha), k);
    this.actualPointSubject.next({
      x: newX,
      y: unaryMinus(orthogonalY),
      drawCircle: false,
      id: 3,
      keepPrevious: false
    });
    if (newX > exitX) {
      setTimeout(() => {
        this.movePointTo(delta, alpha, k, newX, exitX, exec);
      }, 5);
    }
  }
}
