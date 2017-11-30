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

// BACKLOG ajouter un système de déplacement automatique trello:#20
// DONE Refactorer le système d'actualPointSubject pour quelque chose de plus ramifié trello:#71
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
  actualRoadSubject;
  wheelObservable = Observable.fromEvent(window, 'wheel')
    .map(event => event.deltaY / Math.abs(event.deltaY));
  // DONE refacto avec le nouveau système d'animation trello:#71
  declareAnimatedRoad = (indexRoad) => {
    const road = this.ROADS[indexRoad];
    const observable = Observable.combineLatest(
      this.wheelObservable,
      this.actualRoadSubject
    ).withLatestFrom(this.actualPointSubject)
      .map(values => ({
        sens: values[0][0],
        currentPoint: values[1],
        roadId: values[0][1]
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
      .debounceTime(20);
    const animatedLine = new AnimatedLine(road, 5, observable)
      .draw(this.canvas)
      .animate();
    animatedLine.subscribe((point) => {
      this.actualPointSubject.next(point);
    });
  };
  // DONE affichage des boxes en retour
  // BACKLOG conservé l'affichage des boxes sur certaines routes
  declareSteps = (indexRoad, indexStep, showBegin, showEnd) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject
      .withLatestFrom(this.actualRoadSubject)
      .filter(values => values[1] === road.id)
      .map(values => values[0])
      .subscribe((point) => {
        if (road.begin.isEqual(point) && showBegin) {
          this.actualBoxesSubject.next(indexStep);
          this.nextStepSubject.next(indexStep);
        } else if (road.end.isEqual(point) && showEnd) {
          this.actualBoxesSubject.next(indexStep + 1);
          this.nextStepSubject.next(indexStep + 1);
        } else {
          this.actualBoxesSubject.next(-1);
        }
      });
  };
  // DONE supprimer les déclarations inutiles
  declareCoastlineGenerator = (indexCoastline, indexStep) => {
    const sub = this.nextStepSubject.filter(step => step === indexStep).subscribe(() => {
      this.COASTLINES[indexCoastline].forEach((orientedVector) => {
        const path = this.canvas.path(`M${orientedVector.begin.x} ${orientedVector.begin.y}`);
        path.animate({ path: `M${orientedVector.begin.x} ${orientedVector.begin.y} L${orientedVector.end.x} ${orientedVector.end.y}` }, 2000);
      }, this);
      sub.unsubscribe();
    });
  };
  // DONE corrigé l'affichage du van en fin de route
  declareAnimatedVan = (indexRoad, reverse, hideBegin, hideEnd) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject
      .withLatestFrom(this.actualRoadSubject)
      .filter(values => values[1] === road.id)
      .map(values => values[0])
      .subscribe((point) => {
        if ((road.begin.isEqual(point) && hideBegin) || (road.end.isEqual(point) && hideEnd)) {
          this.van.remove();
        } else {
          this.van.draw(this.canvas, point, reverse).animate();
        }
      });
  };
  // PLANNING réflexion sur le merge avec animatedRoad
  declareAnimatedScreen = (indexRoad) => {
    const road = this.ROADS[indexRoad];
    const observable = Observable.combineLatest(
      this.wheelObservable,
      this.actualRoadSubject
    ).withLatestFrom(this.actualPointSubject)
      .map(values => ({
        sens: values[0][0],
        currentPoint: values[1],
        roadId: values[0][1]
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
      .debounceTime(20);
    const animatedLine = new AnimatedLine(road, 5, observable)
      .animate();
    animatedLine.subscribe((point) => {
      this.actualPointSubject.next(point);
    });
  };
  declareAnimatedKapitiBoat = (indexRoad, revert) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject
      .withLatestFrom(this.actualRoadSubject)
      .filter(values => values[1] === road.id)
      .map(values => values[0])
      .subscribe((point) => {
        if (road.begin.isEqual(point) || road.end.isEqual(point)) {
          this.kapitiBoat.remove();
        } else {
          this.kapitiBoat.draw(this.canvas, point, revert).animate();
        }
      });
  };

  COASTLINES = [];

  ROADS = [];

  // DONE corriger tous le steps avec le nouveau système d'animation trello:#71
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
      const sensObservable = Observable.combineLatest(
        Observable.of(1),
        this.actualPointSubject
      ).map(values => ({
        sens: 1,
        currentPoint: values[1]
      })).delay(5);
      const animatedLine = new AnimatedLine(
        new OrientedVector('airplaneLine', this.initPoint.x, this.initPoint.y, this.airportPoint.x, this.airportPoint.y),
        400, sensObservable
      );
      const sub = this.nextStepSubject.filter(step => step === 3).subscribe(() => {
        this.sky.stop();
        this.airport.landing(this.canvas, {
          x: this.airportPoint.x - (window.innerWidth / 2),
          y: this.airportPoint.y + (window.innerHeight / 2)
        });
        animatedLine
          .animate()
          .subscribe((point) => {
            this.actualPointSubject.next(point);
            if (this.airportPoint.isEqual(point)) {
              animatedLine.unsubscribe();
            }
          });
        this.actualBoxesSubject.next(3);
        sub.unsubscribe();
      });
    },
    // fourth step
    () => {
      this.declareAnimatedRoad(0);
      this.declareSteps(0, 4, true, true);
      this.declareCoastlineGenerator(0, 4);
    },
    // fifth step
    () => {
      this.declareAnimatedRoad(1);
      this.declareAnimatedVan(1, false, true, true);
      this.declareSteps(1, 5, true, true);
      this.declareCoastlineGenerator(1, 5);
    },
    // sixth step
    () => {
      this.declareAnimatedRoad(2);
      this.declareAnimatedVan(2, false, true, false);
      this.declareSteps(2, 6, true, true);
      this.declareCoastlineGenerator(2, 6);
    },
    // Seventh step
    () => {
      this.declareAnimatedRoad(3);
      this.declareAnimatedRoad(4);
      this.declareAnimatedVan(3, false, false, false);
      this.declareAnimatedVan(4, false, false, true);
      this.declareSteps(3, 7, true, false);
      this.declareSteps(4, 7, false, true);
      this.declareCoastlineGenerator(3, 7);
    },
    // Eigth step
    () => {
      this.declareAnimatedRoad(5);
      this.declareAnimatedRoad(6);
      this.declareAnimatedVan(5, false, true, false);
      this.declareAnimatedVan(6, false, false, true);
      this.declareSteps(5, 8, true, false);
      this.declareSteps(6, 8, false, true);
    },
    // ninth step
    () => {
      this.declareAnimatedRoad(7);
      this.declareAnimatedRoad(8);
      this.declareAnimatedRoad(9);
      this.declareAnimatedVan(7, true, true, false);
      this.declareAnimatedVan(8, true, false, false);
      this.declareAnimatedVan(9, true, false, true);
      this.declareSteps(7, 9, true, false);
      this.declareSteps(8, 9, false, false);
      this.declareSteps(9, 9, false, true);
      this.declareCoastlineGenerator(4, 9);
    },
    // tenth step
    () => {
      this.declareAnimatedRoad(10);
      this.declareAnimatedRoad(11);
      this.declareAnimatedVan(10, true, true, false);
      this.declareAnimatedVan(11, true, false, true);
      this.declareSteps(10, 10, true, false);
      this.declareSteps(11, 10, false, true);
    },
    // eleventh step
    () => {
      this.declareAnimatedRoad(12);
      this.declareAnimatedVan(12, true, true, true);
      this.declareSteps(12, 11, true, true);
    },
    // twelveth step
    () => {
      this.declareAnimatedRoad(13);
      this.declareAnimatedRoad(14);
      this.declareAnimatedRoad(15);
      this.declareAnimatedVan(13, true, true, false);
      this.declareAnimatedVan(14, true, false, false);
      this.declareAnimatedVan(15, true, false, true);
      this.declareSteps(13, 12, true, false);
      this.declareSteps(14, 12, false, false);
      this.declareSteps(15, 12, false, true);
    },
    // DONE refacto pour rendre générique les retour trello:#71
    // voir avec la refacto possible du actualPointSubject
    // Thirteenth step
    () => {
      this.declareAnimatedRoad(16);
      this.declareAnimatedRoad(17);
      this.declareAnimatedRoad(18);
      this.declareAnimatedRoad(19);
      this.declareAnimatedVan(16, false, true, false);
      this.declareAnimatedVan(17, false, false, false);
      this.declareAnimatedVan(18, false, false, false);
      this.declareAnimatedVan(19, true, false, false);
      this.declareSteps(16, 13, true, false);
      this.declareSteps(17, 13, false, false);
      this.declareSteps(18, 13, false, false);
      this.declareSteps(19, 13, false, true);
    },
    // Fourteenth step
    () => {
      this.declareAnimatedRoad(20);
      this.declareAnimatedRoad(21);
      this.declareAnimatedVan(20, true, false, false);
      this.declareAnimatedVan(21, true, false, true);
      this.declareSteps(20, 14, true, false);
      this.declareSteps(21, 14, false, true);
    },
    // fifteenth step
    () => {
      this.declareAnimatedRoad(22);
      this.declareAnimatedRoad(23);
      this.declareAnimatedVan(22, false, true, false);
      this.declareAnimatedVan(23, false, false, true);
      this.declareSteps(22, 15, true, false);
      this.declareSteps(23, 15, false, true);
      this.declareCoastlineGenerator(5, 15);
    },
    // sixteenth step
    () => {
      this.declareAnimatedRoad(24);
      this.declareAnimatedRoad(25);
      this.declareAnimatedRoad(26);
      this.declareAnimatedVan(24, true, true, false);
      this.declareAnimatedVan(25, true, false, false);
      this.declareAnimatedVan(26, true, false, true);
      this.declareSteps(24, 16, true, false);
      this.declareSteps(25, 16, false, false);
      this.declareSteps(26, 16, false, true);
      this.declareCoastlineGenerator(6, 16);
    },
    // seventeenth step
    () => {
      this.declareAnimatedRoad(27);
      this.declareAnimatedRoad(28);
      this.declareAnimatedVan(27, false, true, false);
      this.declareAnimatedVan(28, true, false, false);
      this.declareSteps(27, 17, true, false);
      this.declareSteps(28, 17, false, true);
    },
    // eighteenth step
    () => {
      this.declareAnimatedRoad(29);
      this.declareAnimatedRoad(30);
      this.declareAnimatedVan(29, true, false, false);
      this.declareAnimatedVan(30, true, false, true);
      this.declareSteps(29, 18, true, false);
      this.declareSteps(30, 18, false, true);
      this.declareCoastlineGenerator(7, 18);
    },
    // DONE ajouter le step 19 trello:#54
    // nineteenth step
    () => {
      this.declareAnimatedRoad(31);
      this.declareAnimatedRoad(32);
      this.declareAnimatedVan(31, true, true, false);
      this.declareAnimatedVan(32, true, false, true);
      this.declareSteps(31, 19, true, false);
      this.declareSteps(32, 19, false, true);
      this.declareCoastlineGenerator(8, 19);
    },
    // DONE ajouter le step 20 trello:#55
    // twentieth step
    () => {
      this.declareAnimatedRoad(33);
      this.declareAnimatedRoad(34);
      this.declareAnimatedRoad(35);
      this.declareAnimatedScreen(36);
      this.declareAnimatedVan(33, false, true, false);
      this.declareAnimatedVan(34, false, false, true);
      this.declareAnimatedKapitiBoat(36);
      this.declareSteps(33, 20, true, false);
      this.declareSteps(34, 20, false, false);
      this.declareSteps(35, 20, false, false);
      this.declareSteps(36, 20, false, true);
      this.declareCoastlineGenerator(9, 20);
    },
    // DONE ajouter le step 21 trello:#56
    // twenty first step
    () => {
      this.declareAnimatedScreen(37);
      this.declareAnimatedRoad(38);
      this.declareAnimatedRoad(39);
      this.declareAnimatedKapitiBoat(37, true);
      this.declareAnimatedVan(39, false, true, false);
      this.declareSteps(37, 21, true, false);
      this.declareSteps(38, 21, false, false);
      this.declareSteps(39, 21, false, true);
    },
    // DONE ajouter le step 22 trello:#57
    // twenty second step
    () => {
      this.declareAnimatedRoad(40);
      this.declareAnimatedRoad(41);
      this.declareAnimatedVan(40, false, false, false);
      this.declareAnimatedVan(41, false, false, true);
      this.declareSteps(40, 22, true, false);
      this.declareSteps(41, 22, false, true);
    },
    // DONE ajouter le step 23 trello:#58
    () => {
      this.declareAnimatedRoad(42);
      this.declareAnimatedRoad(43);
      this.declareAnimatedRoad(44);
      this.declareAnimatedVan(42, true, true, false);
      this.declareAnimatedVan(43, true, false, false);
      this.declareAnimatedVan(44, true, false, true);
      this.declareSteps(42, 23, true, false);
      this.declareSteps(43, 23, false, false);
      this.declareSteps(44, 23, false, true);
    },
    // DONE ajouter le step 24 trello:#59
    () => {}
  ];

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject) {
    this.canvas = canvas;
    this.actualPointSubject = actualPointSubject;
    this.actualBoxesSubject = actualBoxesSubject;
    this.nextStepSubject = new Subject();
    this.airport = new Airport();
    this.airportPoint = new Coordinate(708, 502, pixelRatio);
    this.van = new Van();
    this.kapitiBoat = new KapitiBoat();
    this.initPoint = new Coordinate(
      this.airportPoint.x + (window.innerWidth / 2),
      this.airportPoint.y - (window.innerHeight / 2)
    );
    this.ROADS = buildRoads(pixelRatio);
    this.COASTLINES = buildCoastlines(pixelRatio);
    this.actualRoadSubject = new BehaviorSubject(this.ROADS[0].id);
  }

  // BACKLOG joue l'intégralité du scénario précedent l'étape donnée en param
  launch(index) {
    this.index = index;
    this.steps.forEach(step => step());
    this.nextStepSubject.next(index);
  }

  nextStep() {
    this.index += 1;
    this.nextStepSubject.next(this.index);
  }
}
