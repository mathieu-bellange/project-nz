import { add, divide, subtract, multiply, unaryMinus, square, sqrt, ceil } from 'mathjs';
import { Observable } from 'rxjs/Observable';

import Airport from './airport';
import Sky from './sky';
import { Marker, Coordinate, Path } from '../tools';

// TODO extraire la logique de déplacement dans une autre class trello:#66
// BACKLOG ajouter un système de déplacement automatique
export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  actualBoxesSubject;
  pixelRatio;
  airport;
  index = 0;

  Markers = [
    new Marker('nh54-nh55', 705, 498, 703, 498),
    new Marker('nh55-nh56', 703, 498, 706, 504),
    new Marker('nh56-nh57', 706, 504, 714, 503)
  ];

  Roads = [
    new Marker('rnh1-rnh2', 708, 502, 705, 485)
  ]

  Waves = [
    new Coordinate(705, 498),
    new Coordinate(703, 498),
    new Coordinate(706, 504),
    new Coordinate(714, 503),
    new Coordinate(715, 506),
    new Coordinate(703, 507),
    new Coordinate(699, 496),
    new Coordinate(705, 496),
    new Coordinate(705, 498)
  ];

  // TODO supprimer la référence au point courrant trello:#63
  steps = [
    // launch step
    this.launch,
    // first step
    () => {
      this.actualBoxesSubject.next(1);
    },
    // second step
    () => {
      this.actualBoxesSubject.next(2);
    },
    // third step
    () => {
      const endPoint = {
        x: 708 * this.pixelRatio,
        y: 502 * this.pixelRatio
      };
      this.sky.stop();
      this.airport.landing(this.canvas, {
        x: endPoint.x - (window.innerWidth / 2),
        y: endPoint.y + (window.innerHeight / 2)
      });
      this.lineDeplacementAnimation({
        x: 708 * this.pixelRatio + (window.innerWidth / 2),
        y: 502 * this.pixelRatio - (window.innerHeight / 2)
      }, endPoint, this.nextStep);
      this.actualBoxesSubject.next(3);
    },
    // fourth step
    () => {
      const fourthPoint = {
        x: 708 * this.pixelRatio,
        y: 502 * this.pixelRatio
      };
      this.actualPointSubject.next(fourthPoint);
      this.actualBoxesSubject.next(4);
      new Path({ fill: 'url(/images/wave.png)', 'stroke-width': 0, opacity: 0 })
        .draw(this.canvas, this.pixelRatio, this.Waves)
        .animate(2000);
      this.Markers.forEach((marker) => {
        const path = this.canvas.path(`M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio}`);
        path.animate({ path: `M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio} L${marker.end.x * this.pixelRatio} ${marker.end.y * this.pixelRatio}` }, 2000);
      }, this);
    },
    // fifth step
    () => {
      const fifthPoint = {
        x: 708 * this.pixelRatio,
        y: 502 * this.pixelRatio,
        drawCircle: false,
        keepPrevious: false
      };
      this.actualPointSubject.next(fifthPoint);
      this.actualBoxesSubject.next(-1);
      const road = this.Roads[0];
      const deltaX = Math.abs((road.begin.x * this.pixelRatio) - (road.end.x * this.pixelRatio)) / 5;
      const deltaY = Math.abs((road.begin.y * this.pixelRatio) - (road.end.y * this.pixelRatio)) / 5;
      const path = this.canvas.path(`M${road.begin.x * this.pixelRatio} ${road.begin.y * this.pixelRatio} L${road.end.x * this.pixelRatio} ${road.end.y * this.pixelRatio}`);
      const init = ceil(sqrt(add(
        square(subtract(road.end.x * this.pixelRatio, road.begin.x * this.pixelRatio)),
        square(subtract(road.end.y * this.pixelRatio, road.begin.y * this.pixelRatio))
      )));
      const interval = init / 5;
      let index = init;
      path.node.setAttribute('style', `stroke-dasharray: ${init}; stroke-dashoffset: ${init};`);
      Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY))
        .map(delta => ({
          dashArray: index + (delta * interval),
          delta
        }))
        .filter(o => o.dashArray >= init && o.dashArray <= init * 2)
        .do((o) => { index = o.dashArray; })
        .do((o) => {
          fifthPoint.x -= deltaX * o.delta;
          fifthPoint.y -= deltaY * o.delta;
        })
        .subscribe((o) => {
          this.actualPointSubject.next(fifthPoint);
          path.node.setAttribute('style', `stroke-dasharray: ${o.dashArray}; stroke-dashoffset: ${init};`);
        });
    }
  ];

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject) {
    this.canvas = canvas;
    this.pixelRatio = pixelRatio;
    this.actualPointSubject = actualPointSubject;
    this.actualBoxesSubject = actualBoxesSubject;
    this.airport = new Airport();
  }

  // BACKLOG joue l'intégralité du scénario précedent l'étape donnée en param
  // TODO lance le scénario depuis une étape donnée param trello:#65
  launch() {
    const actualPoint = {
      x: 708 * this.pixelRatio + (window.innerWidth / 2),
      y: 502 * this.pixelRatio - (window.innerHeight / 2)
    };
    this.actualPointSubject.next(actualPoint);
    this.actualBoxesSubject.next(0);
    this.airport.fliing(this.canvas, actualPoint);
    this.sky = new Sky(this.canvas, actualPoint);
    this.sky.launch();
  }

  nextStep() {
    this.index += 1;
    this.steps[this.index]();
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
      y: unaryMinus(orthogonalY)
    });
    if (newX > exitX) {
      setTimeout(() => {
        this.movePointTo(delta, alpha, k, newX, exitX, exec);
      }, 5);
    } else {
      this.nextStep();
    }
  }
}
