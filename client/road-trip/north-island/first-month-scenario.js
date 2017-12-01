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
// DONE subscribe les events de wheel uniquement après l'atterissage de l'avion
// PLANNING stopper la route le temps que les popins chargent
export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  actualBoxesSubject;
  nextStepSubject;
  airport;
  van;
  kapitiBoat;
  index;
  roadIsOn = false;
  initPoint;
  airportPoint;
  actualRoadSubject;
  wheelObservable = Observable.fromEvent(window, 'wheel')
    .filter(() => this.roadIsOn)
    .map(event => event.deltaY / Math.abs(event.deltaY));
  // DONE refacto avec le nouveau système d'animation trello:#71
  // DONE réflexion sur le merge avec animatedRoad
  declareAnimatedLine = (indexRoad, hideRoad) => {
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
    let animatedLine = new AnimatedLine(road, 5, observable);
    if (!hideRoad) {
      animatedLine = animatedLine.draw(this.canvas);
    }
    animatedLine.animate();
    animatedLine.subscribe((point) => {
      this.actualPointSubject.next(point);
    });
  };
  // DONE affichage des boxes en retour
  // DONE conserver l'affichage des boxes sur certaines routes
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
        } else if (road.end.isEqual(point) && showEnd) {
          this.actualBoxesSubject.next(indexStep + 1);
          this.nextStepSubject.next(indexStep + 1);
        } else if (keepShowing) {
          this.actualBoxesSubject.next(indexStep);
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
  // DONE merge l'animation du van et du bateau
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
              this.roadIsOn = true;
            }
          });
        this.actualBoxesSubject.next(3);
        sub.unsubscribe();
      });
    },
    // fourth step
    () => {
      this.declareAnimatedLine(0);
      this.declareSteps(0, 4, true, true);
      this.declareCoastlineGenerator(0, 4);
    },
    // fifth step
    () => {
      this.declareAnimatedLine(1);
      this.declareAnimatedSVG(1, this.van, false, true, true);
      this.declareSteps(1, 5, true, true);
      this.declareCoastlineGenerator(1, 5);
    },
    // sixth step
    () => {
      this.declareAnimatedLine(2);
      this.declareAnimatedSVG(2, this.van, false, true, false);
      this.declareSteps(2, 6, true, true);
      this.declareCoastlineGenerator(2, 6);
    },
    // Seventh step
    () => {
      this.declareAnimatedLine(3);
      this.declareAnimatedLine(4);
      this.declareAnimatedSVG(3, this.van, false, false, false);
      this.declareAnimatedSVG(4, this.van, false, false, true);
      this.declareSteps(3, 7, true, false, true);
      this.declareSteps(4, 7, false, true, true);
      this.declareCoastlineGenerator(3, 7);
    },
    // Eigth step
    () => {
      this.declareAnimatedLine(5);
      this.declareAnimatedLine(6);
      this.declareAnimatedSVG(5, this.van, false, true, false);
      this.declareAnimatedSVG(6, this.van, false, false, true);
      this.declareSteps(5, 8, true, false);
      this.declareSteps(6, 8, false, true);
    },
    // ninth step
    () => {
      this.declareAnimatedLine(7);
      this.declareAnimatedLine(8);
      this.declareAnimatedLine(9);
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
      this.declareAnimatedLine(10);
      this.declareAnimatedLine(11);
      this.declareAnimatedSVG(10, this.van, true, true, false);
      this.declareAnimatedSVG(11, this.van, true, false, true);
      this.declareSteps(10, 10, true, false);
      this.declareSteps(11, 10, false, true);
    },
    // eleventh step
    () => {
      this.declareAnimatedLine(12);
      this.declareAnimatedSVG(12, this.van, true, true, true);
      this.declareSteps(12, 11, true, true);
    },
    // twelveth step
    () => {
      this.declareAnimatedLine(13);
      this.declareAnimatedLine(14);
      this.declareAnimatedLine(15);
      this.declareAnimatedSVG(13, this.van, true, true, false);
      this.declareAnimatedSVG(14, this.van, true, false, false);
      this.declareAnimatedSVG(15, this.van, true, false, true);
      this.declareSteps(13, 12, true, false);
      this.declareSteps(14, 12, false, false);
      this.declareSteps(15, 12, false, true);
    },
    // DONE refacto pour rendre générique les retour trello:#71
    // voir avec la refacto possible du actualPointSubject
    // Thirteenth step
    () => {
      this.declareAnimatedLine(16);
      this.declareAnimatedLine(17);
      this.declareAnimatedLine(18);
      this.declareAnimatedLine(19);
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
      this.declareAnimatedLine(20);
      this.declareAnimatedLine(21);
      this.declareAnimatedSVG(20, this.van, true, false, false);
      this.declareAnimatedSVG(21, this.van, true, false, true);
      this.declareSteps(20, 14, true, false, true);
      this.declareSteps(21, 14, false, true, true);
    },
    // fifteenth step
    () => {
      this.declareAnimatedLine(22);
      this.declareAnimatedLine(23);
      this.declareAnimatedSVG(22, this.van, false, true, false);
      this.declareAnimatedSVG(23, this.van, false, false, true);
      this.declareSteps(22, 15, true, false);
      this.declareSteps(23, 15, false, true);
      this.declareCoastlineGenerator(5, 15);
    },
    // sixteenth step
    () => {
      this.declareAnimatedLine(24);
      this.declareAnimatedLine(25);
      this.declareAnimatedLine(26);
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
      this.declareAnimatedLine(27);
      this.declareAnimatedLine(28);
      this.declareAnimatedSVG(27, this.van, false, true, false);
      this.declareAnimatedSVG(28, this.van, true, false, false);
      this.declareSteps(27, 17, true, false);
      this.declareSteps(28, 17, false, true);
    },
    // eighteenth step
    () => {
      this.declareAnimatedLine(29);
      this.declareAnimatedLine(30);
      this.declareAnimatedSVG(29, this.van, true, false, false);
      this.declareAnimatedSVG(30, this.van, true, false, true);
      this.declareSteps(29, 18, true, false, true);
      this.declareSteps(30, 18, false, true, true);
      this.declareCoastlineGenerator(7, 18);
    },
    // DONE ajouter le step 19 trello:#54
    // nineteenth step
    () => {
      this.declareAnimatedLine(31);
      this.declareAnimatedLine(32);
      this.declareAnimatedSVG(31, this.van, true, true, false);
      this.declareAnimatedSVG(32, this.van, true, false, true);
      this.declareSteps(31, 19, true, false);
      this.declareSteps(32, 19, false, true);
      this.declareCoastlineGenerator(8, 19);
    },
    // DONE ajouter le step 20 trello:#55
    // twentieth step
    () => {
      this.declareAnimatedLine(33);
      this.declareAnimatedLine(34);
      this.declareAnimatedLine(35);
      this.declareAnimatedLine(36, true);
      this.declareAnimatedSVG(33, this.van, false, true, false);
      this.declareAnimatedSVG(34, this.van, false, false, true);
      this.declareAnimatedSVG(36, this.kapitiBoat, false, true, true);
      this.declareSteps(33, 20, true, false);
      this.declareSteps(34, 20, false, false);
      this.declareSteps(35, 20, false, false);
      this.declareSteps(36, 20, false, true);
      this.declareCoastlineGenerator(9, 20);
    },
    // DONE ajouter le step 21 trello:#56
    // twenty first step
    () => {
      this.declareAnimatedLine(37, true);
      this.declareAnimatedLine(38);
      this.declareAnimatedLine(39);
      this.declareAnimatedSVG(37, this.kapitiBoat, true, true, true);
      this.declareAnimatedSVG(39, this.van, false, true, false);
      this.declareSteps(37, 21, true, false);
      this.declareSteps(38, 21, false, false);
      this.declareSteps(39, 21, false, true);
    },
    // DONE ajouter le step 22 trello:#57
    // twenty second step
    () => {
      this.declareAnimatedLine(40);
      this.declareAnimatedLine(41);
      this.declareAnimatedSVG(40, this.van, false, false, false);
      this.declareAnimatedSVG(41, this.van, false, false, true);
      this.declareSteps(40, 22, true, false, true);
      this.declareSteps(41, 22, false, true, true);
    },
    // DONE ajouter le step 23 trello:#58
    () => {
      this.declareAnimatedLine(42);
      this.declareAnimatedLine(43);
      this.declareAnimatedLine(44);
      this.declareAnimatedSVG(42, this.van, true, true, false);
      this.declareAnimatedSVG(43, this.van, true, false, false);
      this.declareAnimatedSVG(44, this.van, true, false, true);
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
