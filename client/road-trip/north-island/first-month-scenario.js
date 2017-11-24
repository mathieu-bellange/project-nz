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
// DOING Refactorer le système d'actualPointSubject pour quelque chose de plus ramifié trello:#71
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

  COASTLINES = [];

  ROADS = [];

  animatedRoads = [];

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
              this.nextStepSubject.next(4);
              animatedLine.unsubscribe();
            }
          });
        this.actualBoxesSubject.next(3);
        sub.unsubscribe();
      });
    },
    // fourth step
    () => {
      const road = this.ROADS[0];
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
            this.actualRoadSubject.next(this.ROADS[1].id);
          }
          if (o.sens === -1 && road.begin.isEqual(o.currentPoint)) {
            // do nothing
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
      this.declareCoastlineGenerator(0, 4);
      this.declareBoxes(0, 4);
    },
    // fifth step
    () => {
      const road = this.ROADS[1];
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
            this.actualRoadSubject.next(this.ROADS[2].id);
          }
          if (o.sens === -1 && road.begin.isEqual(o.currentPoint)) {
            this.actualRoadSubject.next(this.ROADS[0].id);
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
      this.declareCoastlineGenerator(1, 5);
      this.declareAnimatedVan(1, true);
      this.declareBoxes(1, 5);
    },
    // sixth step
    () => {
      this.declareAnimatedRoad(2, 6, true);
      this.declareCoastlineGenerator(2, 6);
      this.declareAnimatedVan(2, false);
      this.declareBoxes(2, 6);
    },
    // Seventh step
    () => {
      this.declareAnimatedRoad(3, 7);
      this.declareAnimatedRoad(4, 7, true);
      this.declareCoastlineGenerator(3, 7);
      this.declareAnimatedVan(3, false);
      this.declareAnimatedVan(4, true);
      this.declareBoxes(3, 7, true);
    },
    // Eigth step
    () => {
      this.declareAnimatedRoad(5, 8);
      this.declareAnimatedRoad(6, 8, true);
      this.declareCoastlineGenerator(4, 8);
      this.declareAnimatedVan(5, false);
      this.declareAnimatedVan(6, true);
      this.declareBoxes(5, 8);
    },
    // ninth step
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
    // tenth step
    () => {
      this.declareAnimatedRoad(10, 10);
      this.declareAnimatedRoad(11, 10, true);
      this.declareCoastlineGenerator(6, 10);
      this.declareAnimatedVan(10, false);
      this.declareAnimatedVan(11, true);
      this.declareBoxes(10, 10);
    },
    // eleventh step
    () => {
      this.declareAnimatedRoad(12, 11, true);
      this.declareCoastlineGenerator(7, 11);
      this.declareAnimatedVan(12, true);
      this.declareBoxes(12, 11);
    },
    // twelveth step
    () => {
      this.declareAnimatedRoad(13, 12);
      this.declareAnimatedRoad(14, 12);
      this.declareAnimatedRoad(15, 12, true);
      this.declareCoastlineGenerator(8, 12);
      this.declareAnimatedVan(13, false);
      this.declareAnimatedVan(14, false);
      this.declareAnimatedVan(15, true);
      this.declareBoxes(13, 12);
    },
    // Backlog refacto pour rendre générique les retour
    // voir avec la refacto possible du actualPointSubject
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
          this.animatedRoads[19].unsubscribeSens();
        }
      });
      this.declareCoastlineGenerator(9, 13);
      this.declareAnimatedVan(16, false);
      this.declareAnimatedVan(17, false);
      this.declareAnimatedVan(18, false);
      this.declareBoxes(16, 13);
    },
    // DONE ajouter le step 14 trello:#49
    () => {
      const road = this.ROADS[19];
      road.isBackward = true;
      const animatedLine = new AnimatedLine(road, 5, this.wheelObservable)
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.begin.isEqual(point)) {
          this.actualPointSubject.next({ ...point, isBackward: true });
        } else if (road.isOn(point)) {
          this.actualPointSubject.next({ ...point, isBackward: false });
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point)) {
          this.animatedRoads[18].subscribeSens();
          this.animatedRoads[19].subscribeSens();
        } else if (road.isOn(point)) {
          this.animatedRoads[18].unsubscribeSens();
          this.animatedRoads[20].unsubscribeSens();
        }
      });
      this.declareAnimatedRoad(20, 14);
      this.declareAnimatedRoad(21, 14, true);
      this.declareCoastlineGenerator(10, 14);
      this.declareAnimatedVan(19, false);
      this.declareAnimatedVan(20, false);
      this.declareAnimatedVan(21, true);
      this.declareBoxes(20, 14);
    },
    // DONE ajouter le step 15 trello:#50
    () => {
      this.declareAnimatedRoad(22, 15);
      this.declareAnimatedRoad(23, 15, true);
      this.declareCoastlineGenerator(11, 15);
      this.declareAnimatedVan(22, false);
      this.declareAnimatedVan(23, true);
      this.declareBoxes(22, 15);
    },
    // DONE ajouter le step 16 trello:#51
    () => {
      this.declareAnimatedRoad(24, 16);
      this.declareAnimatedRoad(25, 16);
      this.declareAnimatedRoad(26, 16, true);
      this.declareCoastlineGenerator(12, 16);
      this.declareAnimatedVan(24, false);
      this.declareAnimatedVan(25, false);
      this.declareAnimatedVan(26, true);
      this.declareBoxes(24, 16);
    },
    // DONE ajouter le step 17 trello:#52
    () => {
      const road = this.ROADS[27];
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
          this.animatedRoads[26].subscribeSens();
          this.animatedRoads[27].subscribeSens();
        } else if (road.isOn(point) && point.isBackward) {
          this.animatedRoads[26].unsubscribeSens();
          this.animatedRoads[28].unsubscribeSens();
        }
      });
      const road2 = this.ROADS[28];
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
          this.animatedRoads[27].subscribeSens();
          this.animatedRoads[28].subscribeSens();
        } else if (road2.end.isEqual(point)) {
          this.nextStepSubject.next(18);
        } else if (road2.isOn(point)) {
          this.animatedRoads[27].unsubscribeSens();
          this.animatedRoads[29].unsubscribeSens();
        }
      });
      this.declareAnimatedVan(27, false);
      this.declareAnimatedVan(28, false);
      this.declareCoastlineGenerator(13, 17);
      this.declareBoxes(27, 17);
    },
    // DONE ajouter le step 18 trello:#53
    () => {
      const road = this.ROADS[29];
      road.isBackward = true;
      const animatedLine = new AnimatedLine(road, 5, this.wheelObservable)
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.begin.isEqual(point)) {
          this.actualPointSubject.next({ ...point, isBackward: true });
        } else if (road.isOn(point)) {
          this.actualPointSubject.next({ ...point, isBackward: false });
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point)) {
          this.animatedRoads[28].subscribeSens();
          this.animatedRoads[29].subscribeSens();
        } else if (road.isOn(point)) {
          this.animatedRoads[28].unsubscribeSens();
          this.animatedRoads[30].unsubscribeSens();
        }
      });
      this.declareAnimatedRoad(30, 18, true);
      this.declareCoastlineGenerator(14, 18);
      this.declareAnimatedVan(29, false);
      this.declareAnimatedVan(30, true);
      this.declareBoxes(29, 18);
    }
    // TODO ajouter le step 19 trello:#54
    // TODO ajouter le step 20 trello:#55
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
