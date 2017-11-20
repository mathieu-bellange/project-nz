import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import Airport from './airport';
import Sky from './sky';
import Van from './van';
import { Marker, Coordinate, Path, AnimatedLine, SVGImage } from '../tools';
import buildRoads from './road-markers';
import buildCoastlines from './coastline-markers';

// BACKLOG ajouter un système de déplacement automatique trello:#20
// DONE Ajouter l'affichage du van lors du déplacement de la route trello:#69
// DONE réflexion sur le stockage du pixel ratio trello:#68
export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  actualBoxesSubject;
  nextStepSubject;
  airport;
  index;
  initPoint;
  airportPoint;
  wheelObservable = Observable.fromEvent(window, 'wheel')
    .map(event => event.deltaY / Math.abs(event.deltaY));
  // DONE gestion de la route plus générique entre les steps
  declareAnimatedRoad = (indexRoad, indexStep, launchNextStep) => {
    const road = this.ROADS[indexRoad];
    const animatedLine = new AnimatedLine(road, 5, this.wheelObservable)
      .draw(this.canvas)
      .animate();
    animatedLine.subscribe((point) => {
      if (road.isOn(point)) {
        this.actualPointSubject.next(point);
      }
    });
    this.animatedRoads.push(animatedLine);
    this.actualPointSubject.subscribe((point) => {
      if (point.isBackward) return;
      if (road.begin.isEqual(point)) {
        if (indexRoad > 0) this.animatedRoads[indexRoad - 1].subscribeSens();
        this.animatedRoads[indexRoad].subscribeSens();
      } else if (launchNextStep && road.end.isEqual(point)) {
        this.nextStepSubject.next(indexStep + 1);
      } else if (road.isOn(point)) {
        if (indexRoad > 0) this.animatedRoads[indexRoad - 1].unsubscribeSens();
        if (this.animatedRoads[indexRoad + 1]) this.animatedRoads[indexRoad + 1].unsubscribeSens();
      }
    });
  };
  // FIXME affichage des boxes en retour
  declareBoxes = (indexRoad, indexBoxes) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject.subscribe((point) => {
      if (road.begin.isEqual(point)) {
        this.actualBoxesSubject.next(indexBoxes);
      } else if (road.isOn(point)) {
        this.actualBoxesSubject.next(-1);
      }
    });
  };
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

  // DONE changer le nom de la variable pour être moins générique
  COASTLINES = [];

  ROADS = [];

  animatedRoads = [];

  // DONE limiter l'usage du pixel ratio aux constructeurs de point, ligne... trello:#68
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
      const sensObservable = Observable.timer(0, 5).filter(value => value < 400).map(() => 1);
      const animatedLine = new AnimatedLine(
        new Marker('airplaneLine', this.initPoint.x, this.initPoint.y, this.airportPoint.x, this.airportPoint.y),
        400, sensObservable, true
      );
      const sub = this.nextStepSubject.filter(step => step === 3).subscribe(() => {
        this.sky.stop();
        this.airport.landing(this.canvas, {
          x: this.airportPoint.x - (window.innerWidth / 2),
          y: this.airportPoint.y + (window.innerHeight / 2)
        });
        animatedLine
          .animate(true)
          .subscribe((point) => {
            this.actualPointSubject.next(point);
            if (this.airportPoint.isEqual(point)) {
              this.nextStepSubject.next(4);
              animatedLine.unsubscribeSens();
            }
          });
        this.actualBoxesSubject.next(3);
        sub.unsubscribe();
      });
    },
    // fourth step
    () => {
      this.declareAnimatedRoad(0, 4, true);
      this.declareCoastlineGenerator(0, 4);
      this.declareBoxes(0, 4);
    },
    // fifth step
    // DONE réaliser le step 5 trello:#40
    () => {
      this.declareAnimatedRoad(1, 5, true);
      this.declareCoastlineGenerator(1, 5);
      this.declareAnimatedVan(1, true);
      this.declareBoxes(1, 5);
    },
    // DONE ajouter la sixième étape trello:#41
    // sixth step
    () => {
      this.declareAnimatedRoad(2, 6, true);
      this.declareCoastlineGenerator(2, 6);
      this.declareAnimatedVan(2, false);
      this.declareBoxes(2, 6);
    },
    // DONE ajouter la septième étape trello:#42
    // Seventh step
    () => {
      this.declareAnimatedRoad(3, 7);
      this.declareAnimatedRoad(4, 7, true);
      this.declareCoastlineGenerator(3, 7);
      this.declareAnimatedVan(3, false);
      this.declareAnimatedVan(4, true);
      this.declareBoxes(3, 7, true);
    },
    // DONE ajouter la huitième étape trello:#43
    // Eigth step
    () => {
      this.declareAnimatedRoad(5, 8);
      this.declareAnimatedRoad(6, 8, true);
      this.declareCoastlineGenerator(4, 8);
      this.declareAnimatedVan(5, false);
      this.declareAnimatedVan(6, true);
      this.declareBoxes(5, 8);
    },
    // DONE ajouter la neuvième étape trello:#44
    () => {
      this.declareAnimatedRoad(7, 9);
      this.declareAnimatedRoad(8, 9);
      this.declareAnimatedRoad(9, 9, true);
      this.declareCoastlineGenerator(5, 9);
      this.declareAnimatedVan(7, false);
      this.declareAnimatedVan(8, false);
      this.declareAnimatedVan(9, true);
      this.declareBoxes(7, 9);
    },
    // DONE ajouter le step 10 trello:#45
    () => {
      this.declareAnimatedRoad(10, 10);
      this.declareAnimatedRoad(11, 10, true);
      this.declareCoastlineGenerator(6, 10);
      this.declareAnimatedVan(10, false);
      this.declareAnimatedVan(11, true);
      this.declareBoxes(10, 10);
    },
    // DONE ajouter le step 11 trello:#46
    () => {
      this.declareAnimatedRoad(12, 11, true);
      this.declareCoastlineGenerator(7, 11);
      this.declareAnimatedVan(12, true);
      this.declareBoxes(12, 11);
    },
    // DONE ajouter le step 12 trello:#47
    () => {
      this.declareAnimatedRoad(13, 12);
      this.declareAnimatedRoad(14, 13);
      this.declareAnimatedRoad(15, 13, true);
      this.declareCoastlineGenerator(8, 12);
      this.declareAnimatedVan(13, false);
      this.declareAnimatedVan(14, false);
      this.declareAnimatedVan(15, true);
      this.declareBoxes(13, 12);
    },
    // DONE ajouter le step 13 trello:#48
    () => {
      const road = this.ROADS[16];
      road.isBackward = true;
      const animatedLine = new AnimatedLine(road, 5, this.wheelObservable)
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.begin.isEqual(point)) {
          this.actualPointSubject.next(point);
        } else if (road.isOn(point)) {
          this.actualPointSubject.next({ ...point, isBackward: true });
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point)) {
          this.animatedRoads[15].subscribeSens();
          this.animatedRoads[16].subscribeSens();
        } else if (road.isOn(point) && point.isBackward) {
          this.animatedRoads[15].unsubscribeSens();
          this.animatedRoads[17].unsubscribeSens();
        }
      });
      const road1 = this.ROADS[17];
      road1.isBackward = true;
      const animatedLine1 = new AnimatedLine(road1, 5, this.wheelObservable)
        .draw(this.canvas)
        .animate();
      animatedLine1.subscribe((point) => {
        if (road1.isOn(point) && point.isBackward) {
          this.actualPointSubject.next({ ...point, isBackward: true });
        }
      });
      this.animatedRoads.push(animatedLine1);
      this.actualPointSubject.subscribe((point) => {
        if (road1.begin.isEqual(point) && point.isBackward) {
          this.animatedRoads[16].subscribeSens();
          this.animatedRoads[17].subscribeSens();
          this.animatedRoads[17].resetLength();
        } else if (road1.isOn(point) && point.isBackward) {
          this.animatedRoads[16].unsubscribeSens();
          this.animatedRoads[18].unsubscribeSens();
        }
      });
      const road2 = this.ROADS[18];
      road2.isBackward = true;
      const animatedLine2 = new AnimatedLine(road2, 5, this.wheelObservable)
        .draw(this.canvas)
        .animate();
      animatedLine2.subscribe((point) => {
        if (road2.isOn(point) && point.isBackward) {
          this.actualPointSubject.next({ ...point, isBackward: true });
        }
      });
      this.animatedRoads.push(animatedLine2);
      this.actualPointSubject.subscribe((point) => {
        if (road2.begin.isEqual(point) && point.isBackward) {
          this.animatedRoads[17].subscribeSens();
          this.animatedRoads[18].subscribeSens();
        } else if (road2.isOn(point)) {
          this.animatedRoads[17].unsubscribeSens();
        }
      });
      this.declareCoastlineGenerator(9, 13);
      this.declareAnimatedVan(16, false);
      this.declareAnimatedVan(17, false);
      this.declareAnimatedVan(18, false);
      this.declareBoxes(16, 13);
    }
    // TODO ajouter le step 14 trello:#49
    // TODO ajouter le step 15 trello:#50
    // PLANNING ajouter le step 16 trello:#51
    // PLANNING ajouter le step 17 trello:#52
    // PLANNING ajouter le step 18 trello:#53
    // PLANNING ajouter le step 19 trello:#54
    // PLANNING ajouter le step 20 trello:#55
    // BACKLOG ajouter le step 21 trello:#56
    // BACKLOG ajouter le step 22 trello:#57
    // BACKLOG ajouter le step 23 trello:#58
    // BACKLOG ajouter le step 24 trello:#59
    // BACKLOG ajouter le step 25 trello:#60
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
