import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import Airport from './airport';
import Sky from './sky';
import Van from './van';
import { Marker, Coordinate, Path, AnimatedLine, SVGImage } from '../tools';
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
        if (o.sens === 1 && road.end.isEqual(o.currentPoint)) {
          this.actualRoadSubject.next(this.ROADS[indexRoad + 1].id);
        }
        if (o.sens === -1 && road.begin.isEqual(o.currentPoint)) {
          if (indexRoad !== 0) this.actualRoadSubject.next(this.ROADS[indexRoad - 1].id);
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
  // PLANNING affichage des boxes en retour
  declareSteps = (indexRoad, indexStep) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject.subscribe((point) => {
      if (road.begin.isEqual(point)) {
        this.actualBoxesSubject.next(indexStep);
        this.nextStepSubject.next(indexStep);
      } else if (road.isOn(point)) {
        this.actualBoxesSubject.next(-1);
      }
    });
  };
  // TODO supprimer les déclarations inutiles
  declareCoastlineGenerator = (indexCoastline, indexStep) => {
    const sub = this.nextStepSubject.filter(step => step === indexStep).subscribe(() => {
      this.COASTLINES[indexCoastline].forEach((marker) => {
        const path = this.canvas.path(`M${marker.begin.x} ${marker.begin.y}`);
        path.animate({ path: `M${marker.begin.x} ${marker.begin.y} L${marker.end.x} ${marker.end.y}` }, 2000);
      }, this);
      sub.unsubscribe();
    });
  };
  declareAnimatedVan = (indexRoad, hideEnd) => {
    const road = this.ROADS[indexRoad];
    const van = new Van();
    this.actualPointSubject.subscribe((point) => {
      if (road.begin.isEqual(point) || (road.end.isEqual(point) && hideEnd)) {
        van.remove();
      } else if (road.isOn(point)) {
        van.draw(this.canvas, point).animate();
      } else {
        van.remove();
      }
    });
  };

  COASTLINES = [];

  ROADS = [];

  animatedRoads = [];

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
        new Marker('airplaneLine', this.initPoint.x, this.initPoint.y, this.airportPoint.x, this.airportPoint.y),
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
      this.declareCoastlineGenerator(0, 4);
      this.declareSteps(0, 4);
    },
    // fifth step
    () => {
      this.declareAnimatedRoad(1);
      this.declareCoastlineGenerator(1, 5);
      this.declareAnimatedVan(1, true);
      this.declareSteps(1, 5);
    },
    // sixth step
    () => {
      this.declareAnimatedRoad(2);
      this.declareCoastlineGenerator(2, 6);
      this.declareAnimatedVan(2, false);
      this.declareSteps(2, 6);
    },
    // Seventh step
    () => {
      this.declareAnimatedRoad(3);
      this.declareAnimatedRoad(4);
      this.declareCoastlineGenerator(3, 7);
      this.declareAnimatedVan(3, false);
      this.declareAnimatedVan(4, true);
      this.declareSteps(3, 7, true);
    },
    // Eigth step
    () => {
      this.declareAnimatedRoad(5);
      this.declareAnimatedRoad(6);
      this.declareCoastlineGenerator(4, 8);
      this.declareAnimatedVan(5, false);
      this.declareAnimatedVan(6, true);
      this.declareSteps(5, 8);
    },
    // ninth step
    () => {
      this.declareAnimatedRoad(7);
      this.declareAnimatedRoad(8);
      this.declareAnimatedRoad(9);
      this.declareCoastlineGenerator(5, 9);
      this.declareAnimatedVan(7, false);
      this.declareAnimatedVan(8, false);
      this.declareAnimatedVan(9, true);
      this.declareSteps(7, 9);
    },
    // tenth step
    () => {
      this.declareAnimatedRoad(10);
      this.declareAnimatedRoad(11);
      this.declareCoastlineGenerator(6, 10);
      this.declareAnimatedVan(10, false);
      this.declareAnimatedVan(11, true);
      this.declareSteps(10, 10);
    },
    // eleventh step
    () => {
      this.declareAnimatedRoad(12);
      this.declareCoastlineGenerator(7, 11);
      this.declareAnimatedVan(12, true);
      this.declareSteps(12, 11);
    },
    // twelveth step
    () => {
      this.declareAnimatedRoad(13);
      this.declareAnimatedRoad(14);
      this.declareAnimatedRoad(15);
      this.declareCoastlineGenerator(8, 12);
      this.declareAnimatedVan(13, false);
      this.declareAnimatedVan(14, false);
      this.declareAnimatedVan(15, true);
      this.declareSteps(13, 12);
    },
    // DONE refacto pour rendre générique les retour trello:#71
    // voir avec la refacto possible du actualPointSubject
    () => {
      this.declareAnimatedRoad(16);
      this.declareAnimatedRoad(17);
      this.declareAnimatedRoad(18);
      this.declareCoastlineGenerator(9, 13);
      this.declareAnimatedVan(16, false);
      this.declareAnimatedVan(17, false);
      this.declareAnimatedVan(18, false);
      this.declareSteps(16, 13);
    },
    () => {
      this.declareAnimatedRoad(19);
      this.declareAnimatedRoad(20);
      this.declareAnimatedRoad(21);
      this.declareCoastlineGenerator(10, 14);
      this.declareAnimatedVan(19, false);
      this.declareAnimatedVan(20, false);
      this.declareAnimatedVan(21, true);
      this.declareSteps(20, 14);
    },
    () => {
      this.declareAnimatedRoad(22);
      this.declareAnimatedRoad(23);
      this.declareCoastlineGenerator(11, 15);
      this.declareAnimatedVan(22, false);
      this.declareAnimatedVan(23, true);
      this.declareSteps(22, 15);
    },
    () => {
      this.declareAnimatedRoad(24);
      this.declareAnimatedRoad(25);
      this.declareAnimatedRoad(26);
      this.declareCoastlineGenerator(12, 16);
      this.declareAnimatedVan(24, false);
      this.declareAnimatedVan(25, false);
      this.declareAnimatedVan(26, true);
      this.declareSteps(24, 16);
    },
    () => {
      this.declareAnimatedRoad(27);
      this.declareAnimatedRoad(28);
      this.declareAnimatedVan(27, false);
      this.declareAnimatedVan(28, false);
      this.declareCoastlineGenerator(13, 17);
      this.declareSteps(27, 17);
    },
    () => {
      this.declareAnimatedRoad(29);
      this.declareAnimatedRoad(30);
      this.declareCoastlineGenerator(14, 18);
      this.declareAnimatedVan(29, false);
      this.declareAnimatedVan(30, true);
      this.declareSteps(29, 18);
    }
    // TODO ajouter le step 19 trello:#54
    // TODO ajouter le step 20 trello:#55
    // PLANNING ajouter le step 21 trello:#56
    // PLANNING ajouter le step 22 trello:#57
    // PLANNING ajouter le step 23 trello:#58
    // PLANNING ajouter le step 24 trello:#59
    // PLANNING ajouter le step 25 trello:#60
  ];

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject) {
    this.canvas = canvas;
    this.actualPointSubject = actualPointSubject;
    this.actualBoxesSubject = actualBoxesSubject;
    this.nextStepSubject = new Subject();
    this.airport = new Airport();
    this.airportPoint = new Coordinate(708, 502, pixelRatio);
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
