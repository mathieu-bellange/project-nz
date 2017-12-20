import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import Airport from './airport';
import Sky from './sky';
import Van from './van';
import KapitiBoat from './kapiti-boat';
import { OrientedVector, Coordinate, AnimatedLine } from '../tools';
import buildRoads from './road-markers';
import buildCoastlines from './coastline-markers';

// DONE ajouter un système de déplacement automatique trello:#72
// BACKLOG ajouter une liste de marker avec la position des villes principales trello:#76
// BACKLOG ajouter avec la position des villes principales, leur nom trello:#76
// BACKLOG ajouter avec les décors avoisinant la route trello:#77
// PLANNING voir pour utiliser l'event de défilement pour mobile comme pour le wheel sous desktop trello:#21
// PLANNING ajouter un affichage du kilométrage parcouru trello:#75
export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  actualBoxesSubject;
  nextStepSubject;
  airport;
  van;
  kapitiBoat;
  index;
  initPoint;
  airportPoint;
  landingPoint;
  actualRoadSubject;
  wheelObservable;
  automatedObservable;
  airplaneObservable;
  declareAnimatedLine = (indexRoad, showBegin, showEnd, hideRoad) => {
    const road = this.ROADS[indexRoad];
    const observable = Observable.combineLatest(
      this.automatedObservable,
      this.actualRoadSubject
    ).withLatestFrom(this.actualPointSubject)
      .map(values => ({
        sens: values[0][0].sens,
        currentPoint: values[1],
        roadId: values[0][1],
        interval: values[0][0].interval
      }))
      .filter(o => o.roadId === road.id)
      .do((o) => {
        if (o.sens === 1 && road.end.isEqual(o.currentPoint) && indexRoad + 1 < this.ROADS.length) {
          this.actualRoadSubject.next(this.ROADS[indexRoad + 1].id);
        }
        if (o.sens === -1 && road.begin.isEqual(o.currentPoint) && indexRoad > 0) {
          this.actualRoadSubject.next(this.ROADS[indexRoad - 1].id);
        }
      })
      .filter(o => (o.sens === 1 && !road.end.isEqual(o.currentPoint)) ||
        (o.sens === -1 && !road.begin.isEqual(o.currentPoint)))
      .debounceTime(5);
    let animatedLine = new AnimatedLine(road, observable);
    if (!hideRoad) {
      animatedLine = animatedLine.draw(this.canvas);
    }
    animatedLine.animate();
    animatedLine.subscribe((point) => {
      if ((road.begin.isEqual(point) && showBegin) || (road.end.isEqual(point) && showEnd)) {
        this.automatedRoadOn = false;
      }
      this.actualPointSubject.next(point);
    });
  };
  declareSteps = (indexRoad, indexStep, showBegin, showEnd, keepShowing) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject
      .withLatestFrom(this.actualRoadSubject)
      .filter(values => values[1] === road.id)
      .map(values => values[0])
      .subscribe((point) => {
        if (road.begin.isEqual(point) && showBegin) {
          this.actualBoxesSubject.next(indexStep);
          this.nextStepSubject.next(indexStep);
          this.onRoadAgainSubject.next(false);
          const sub = Observable.timer(1000)
            .filter(value => value < 1)
            .subscribe(() => {
              this.onRoadAgainSubject.next(true);
              sub.unsubscribe();
            });
        } else if (road.end.isEqual(point) && showEnd) {
          this.actualBoxesSubject.next(indexStep + 1);
          this.nextStepSubject.next(indexStep + 1);
          this.onRoadAgainSubject.next(false);
          const sub = Observable.timer(1000)
            .filter(value => value < 1)
            .subscribe(() => {
              this.onRoadAgainSubject.next(true);
              sub.unsubscribe();
            });
        } else if (keepShowing) {
          this.actualBoxesSubject.next(indexStep);
        } else {
          this.actualBoxesSubject.next(-1);
        }
      });
  };
  declareCoastlineGenerator = (indexCoastline, indexStep) => {
    const sub = this.nextStepSubject.filter(step => step === indexStep).subscribe(() => {
      this.COASTLINES[indexCoastline].forEach((orientedVector) => {
        const path = this.canvas.path(`M${orientedVector.begin.x} ${orientedVector.begin.y}`);
        path.animate({ path: `M${orientedVector.begin.x} ${orientedVector.begin.y} L${orientedVector.end.x} ${orientedVector.end.y}` }, 2000);
      }, this);
      sub.unsubscribe();
    });
  };
  declareAnimatedSVG = (indexRoad, svg, reverse, hideBegin, hideEnd) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject
      .withLatestFrom(this.actualRoadSubject)
      .filter(values => values[1] === road.id)
      .map(values => values[0])
      .subscribe((point) => {
        if ((road.begin.isEqual(point) && hideBegin) || (road.end.isEqual(point) && hideEnd)) {
          svg.remove();
        } else {
          svg.draw(this.canvas, point, reverse).animate();
        }
      });
  };

  COASTLINES = [];

  ROADS = [];

  steps = [
    // launch step
    () => {
      const sub = this.nextStepSubject.filter(step => step === 0).subscribe(() => {
        this.actualPointSubject.next(this.initPoint);
        this.actualBoxesSubject.next(0);
        this.airport.fliing(this.canvas, this.initPoint);
        this.sky = new Sky(this.canvas, this.initPoint);
        this.sky.launch();
        sub.unsubscribe();
      });
    },
    // first step
    () => {
      const sub = this.nextStepSubject.filter(step => step === 1).subscribe(() => {
        this.actualBoxesSubject.next(1);
        sub.unsubscribe();
      });
    },
    // second step
    () => {
      const sub = this.nextStepSubject.filter(step => step === 2).subscribe(() => {
        this.actualBoxesSubject.next(2);
        sub.unsubscribe();
      });
    },
    // third step
    () => {
      const animatedLine = new AnimatedLine(
        new OrientedVector('airplaneLine', this.initPoint.x, this.initPoint.y, this.airportPoint.x, this.airportPoint.y),
        this.airplaneObservable
      );
      const sub = this.nextStepSubject.filter(step => step === 3).subscribe(() => {
        this.sky.stop();
        this.airport.landing(this.canvas, this.landingPoint);
        animatedLine
          .animate()
          .subscribe((point) => {
            this.actualPointSubject.next(point);
            if (this.airportPoint.isEqual(point)) {
              animatedLine.unsubscribe();
              this.onRoadAgainSubject.next(true);
            }
          });
        this.actualBoxesSubject.next(3);
        sub.unsubscribe();
      });
    },
    // fourth step
    () => {
      this.declareAnimatedLine(0, true, true);
      this.declareSteps(0, 4, true, true);
      this.declareCoastlineGenerator(0, 4);
    },
    // fifth step
    () => {
      this.declareAnimatedLine(1, true, true);
      this.declareAnimatedSVG(1, this.van, false, true, true);
      this.declareSteps(1, 5, true, true);
      this.declareCoastlineGenerator(1, 5);
    },
    // sixth step
    () => {
      this.declareAnimatedLine(2, true, true);
      this.declareAnimatedSVG(2, this.van, false, true, false);
      this.declareSteps(2, 6, true, true);
      this.declareCoastlineGenerator(2, 6);
    },
    // Seventh step
    () => {
      this.declareAnimatedLine(3, true, false);
      this.declareAnimatedLine(4, false, true);
      this.declareAnimatedSVG(3, this.van, false, false, false);
      this.declareAnimatedSVG(4, this.van, false, false, true);
      this.declareSteps(3, 7, true, false, true);
      this.declareSteps(4, 7, false, true, true);
      this.declareCoastlineGenerator(3, 7);
    },
    // Eigth step
    () => {
      this.declareAnimatedLine(5, true, false);
      this.declareAnimatedLine(6, false, true);
      this.declareAnimatedSVG(5, this.van, false, true, false);
      this.declareAnimatedSVG(6, this.van, false, false, true);
      this.declareSteps(5, 8, true, false);
      this.declareSteps(6, 8, false, true);
    },
    // ninth step
    () => {
      this.declareAnimatedLine(7, true, false);
      this.declareAnimatedLine(8, false, false);
      this.declareAnimatedLine(9, false, true);
      this.declareAnimatedSVG(7, this.van, true, true, false);
      this.declareAnimatedSVG(8, this.van, true, false, false);
      this.declareAnimatedSVG(9, this.van, true, false, true);
      this.declareSteps(7, 9, true, false);
      this.declareSteps(8, 9, false, false);
      this.declareSteps(9, 9, false, true);
      this.declareCoastlineGenerator(4, 9);
    },
    // tenth step
    () => {
      this.declareAnimatedLine(10, true, false);
      this.declareAnimatedLine(11, false, true);
      this.declareAnimatedSVG(10, this.van, true, true, false);
      this.declareAnimatedSVG(11, this.van, true, false, true);
      this.declareSteps(10, 10, true, false);
      this.declareSteps(11, 10, false, true);
    },
    // eleventh step
    () => {
      this.declareAnimatedLine(12, true, true);
      this.declareAnimatedSVG(12, this.van, true, true, true);
      this.declareSteps(12, 11, true, true);
    },
    // twelveth step
    () => {
      this.declareAnimatedLine(13, true, false);
      this.declareAnimatedLine(14, false, false);
      this.declareAnimatedLine(15, false, true);
      this.declareAnimatedSVG(13, this.van, true, true, false);
      this.declareAnimatedSVG(14, this.van, true, false, false);
      this.declareAnimatedSVG(15, this.van, true, false, true);
      this.declareSteps(13, 12, true, false);
      this.declareSteps(14, 12, false, false);
      this.declareSteps(15, 12, false, true);
    },
    // Thirteenth step
    () => {
      this.declareAnimatedLine(16, true, false);
      this.declareAnimatedLine(17, false, false);
      this.declareAnimatedLine(18, false, false);
      this.declareAnimatedLine(19, false, true);
      this.declareAnimatedSVG(16, this.van, false, true, false);
      this.declareAnimatedSVG(17, this.van, false, false, false);
      this.declareAnimatedSVG(18, this.van, false, false, false);
      this.declareAnimatedSVG(19, this.van, true, false, false);
      this.declareSteps(16, 13, true, false);
      this.declareSteps(17, 13, false, false);
      this.declareSteps(18, 13, false, false);
      this.declareSteps(19, 13, false, true);
    },
    // Fourteenth step
    () => {
      this.declareAnimatedLine(20, true, false);
      this.declareAnimatedLine(21, false, true);
      this.declareAnimatedSVG(20, this.van, true, false, false);
      this.declareAnimatedSVG(21, this.van, true, false, true);
      this.declareSteps(20, 14, true, false, true);
      this.declareSteps(21, 14, false, true, true);
    },
    // fifteenth step
    () => {
      this.declareAnimatedLine(22, true, false);
      this.declareAnimatedLine(23, false, true);
      this.declareAnimatedSVG(22, this.van, false, true, false);
      this.declareAnimatedSVG(23, this.van, false, false, true);
      this.declareSteps(22, 15, true, false);
      this.declareSteps(23, 15, false, true);
      this.declareCoastlineGenerator(5, 15);
    },
    // sixteenth step
    () => {
      this.declareAnimatedLine(24, true, false);
      this.declareAnimatedLine(25, false, false);
      this.declareAnimatedLine(26, false, true);
      this.declareAnimatedSVG(24, this.van, true, true, false);
      this.declareAnimatedSVG(25, this.van, true, false, false);
      this.declareAnimatedSVG(26, this.van, true, false, true);
      this.declareSteps(24, 16, true, false);
      this.declareSteps(25, 16, false, false);
      this.declareSteps(26, 16, false, true);
      this.declareCoastlineGenerator(6, 16);
    },
    // seventeenth step
    () => {
      this.declareAnimatedLine(27, true, false);
      this.declareAnimatedLine(28, false, true);
      this.declareAnimatedSVG(27, this.van, false, true, false);
      this.declareAnimatedSVG(28, this.van, true, false, false);
      this.declareSteps(27, 17, true, false);
      this.declareSteps(28, 17, false, true);
    },
    // eighteenth step
    () => {
      this.declareAnimatedLine(29, true, false);
      this.declareAnimatedLine(30, false, true);
      this.declareAnimatedSVG(29, this.van, true, false, false);
      this.declareAnimatedSVG(30, this.van, true, false, true);
      this.declareSteps(29, 18, true, false, true);
      this.declareSteps(30, 18, false, true, true);
      this.declareCoastlineGenerator(7, 18);
    },
    // nineteenth step
    () => {
      this.declareAnimatedLine(31, true, false);
      this.declareAnimatedLine(32, false, true);
      this.declareAnimatedSVG(31, this.van, true, true, false);
      this.declareAnimatedSVG(32, this.van, true, false, true);
      this.declareSteps(31, 19, true, false);
      this.declareSteps(32, 19, false, true);
      this.declareCoastlineGenerator(8, 19);
    },
    // twentieth step
    () => {
      this.declareAnimatedLine(33, true, false);
      this.declareAnimatedLine(34, false, false);
      this.declareAnimatedLine(35, false, false);
      this.declareAnimatedLine(36, false, true, true);
      this.declareAnimatedSVG(33, this.van, false, true, false);
      this.declareAnimatedSVG(34, this.van, false, false, true);
      this.declareAnimatedSVG(36, this.kapitiBoat, false, true, true);
      this.declareSteps(33, 20, true, false);
      this.declareSteps(34, 20, false, false);
      this.declareSteps(35, 20, false, false);
      this.declareSteps(36, 20, false, true);
      this.declareCoastlineGenerator(9, 20);
    },
    // twenty first step
    () => {
      this.declareAnimatedLine(37, true, false, true);
      this.declareAnimatedLine(38, false, false);
      this.declareAnimatedLine(39, false, true);
      this.declareAnimatedSVG(37, this.kapitiBoat, true, true, true);
      this.declareAnimatedSVG(39, this.van, false, true, false);
      this.declareSteps(37, 21, true, false);
      this.declareSteps(38, 21, false, false);
      this.declareSteps(39, 21, false, true);
    },
    // twenty second step
    () => {
      this.declareAnimatedLine(40, true, false);
      this.declareAnimatedLine(41, false, true);
      this.declareAnimatedSVG(40, this.van, false, false, false);
      this.declareAnimatedSVG(41, this.van, false, false, true);
      this.declareSteps(40, 22, true, false, true);
      this.declareSteps(41, 22, false, true, true);
    },
    // twenty third step
    () => {
      this.declareAnimatedLine(42, true, false);
      this.declareAnimatedLine(43, false, false);
      this.declareAnimatedLine(44, false, true);
      this.declareAnimatedSVG(42, this.van, true, true, false);
      this.declareAnimatedSVG(43, this.van, true, false, false);
      this.declareAnimatedSVG(44, this.van, true, false, true);
      this.declareSteps(42, 23, true, false);
      this.declareSteps(43, 23, false, false);
      this.declareSteps(44, 23, false, true);
    },
    // twenty fourth step
    () => {}
  ];

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject, onRoadAgainSubject, hasPreviousSubject, hasNextSubject) {
    this.canvas = canvas;
    this.actualPointSubject = actualPointSubject;
    this.actualBoxesSubject = actualBoxesSubject;
    this.onRoadAgainSubject = onRoadAgainSubject;
    this.hasPreviousSubject = hasPreviousSubject;
    this.hasNextSubject = hasNextSubject;
    this.nextStepSubject = new Subject();
    this.airport = new Airport();
    this.initPoint = new Coordinate(754, 476, pixelRatio);
    this.airportPoint = new Coordinate(708, 502, pixelRatio);
    this.landingPoint = new Coordinate(675, 521, pixelRatio);
    this.van = new Van();
    this.kapitiBoat = new KapitiBoat();
    this.ROADS = buildRoads(pixelRatio);
    this.COASTLINES = buildCoastlines(pixelRatio);
    this.actualRoadSubject = new BehaviorSubject(this.ROADS[0].id);
    this.wheelObservable = Observable.fromEvent(window, 'wheel')
      .withLatestFrom(this.onRoadAgainSubject)
      .filter(values => values[1])
      .map(values => values[0].deltaY / Math.abs(values[0].deltaY));
    this.airplaneObservable = Observable.combineLatest(
      Observable.of({ sens: 1, interval: 320 }),
      this.actualPointSubject
    ).map(values => ({
      sens: values[0].sens,
      currentPoint: values[1],
      interval: values[0].interval
    })).delay(5);
    this.launchAutomatedSubject = new Subject();
    this.automatedObservable = Observable.combineLatest(
      this.launchAutomatedSubject,
      this.actualPointSubject
    ).filter(() => this.automatedRoadOn)
      .map(values => ({
        sens: values[0].sens,
        interval: values[0].interval
      })).delay(5);
    this.nextStepSubject.subscribe((step) => {
      this.hasPreviousSubject.next(step > 4);
      this.hasNextSubject.next(step < 43);
    });
  }

  // PLANNING joue l'intégralité du scénario précedent l'étape donnée en param trello:#73
  launch(index) {
    this.index = index;
    this.steps.forEach(step => step());
    this.nextStepSubject.next(index);
  }

  nextStep() {
    this.index += 1;
    if (this.index < 4) {
      this.nextStepSubject.next(this.index);
    } else {
      this.automatedRoadOn = true;
      this.launchAutomatedSubject.next({ sens: 1, interval: 320 });
    }
  }

  previousStep() {
    this.index -= 1;
    if (this.index >= 3) {
      this.automatedRoadOn = true;
      this.launchAutomatedSubject.next({ sens: -1, interval: 320 });
    }
  }
}
