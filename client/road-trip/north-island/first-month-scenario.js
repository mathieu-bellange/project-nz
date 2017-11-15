import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import Airport from './airport';
import Sky from './sky';
import { Marker, Coordinate, Path, AnimatedLine, SVGImage } from '../tools';

// BACKLOG ajouter un système de déplacement automatique trello:#20
// PLANNING Ajouter l'affichage du van lors du déplacement de la route trello:#69
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
    // TODO gestion de la route plus générique entre les steps
    () => {
      const sensObservable = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road = this.ROADS[0];
      const animatedLine = new AnimatedLine(road, 5, sensObservable)
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.isOn(point)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point)) {
          this.actualBoxesSubject.next(4);
          this.animatedRoads[0].subscribeSens();
        } else if (road.end.isEqual(point)) {
          this.nextStepSubject.next(5);
        } else if (road.isOn(point)) {
          this.actualBoxesSubject.next(-1);
          this.animatedRoads[1].unsubscribeSens();
        }
      });
      const sub = this.nextStepSubject.filter(step => step === 4).subscribe(() => {
        // BACKLOG afficher des images unique et non un path
        /* new Path({ fill: 'url(/images/wave.png)', 'stroke-width': 0, opacity: 0 })
          .draw(this.canvas, this.pixelRatio, this.Waves)
          .animate(2000); */
        this.COASTLINES[0].forEach((marker) => {
          const path = this.canvas.path(`M${marker.begin.x} ${marker.begin.y}`);
          path.animate({ path: `M${marker.begin.x} ${marker.begin.y} L${marker.end.x} ${marker.end.y}` }, 2000);
        }, this);
        sub.unsubscribe();
      });
    },
    // fifth step
    // DONE réaliser le step 5 trello:#40
    () => {
      const sensObservable = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road = this.ROADS[1];
      const animatedLine = new AnimatedLine(road, 5, sensObservable)
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.isOn(point)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point)) {
          this.actualBoxesSubject.next(5);
          this.animatedRoads[0].subscribeSens();
          this.animatedRoads[1].subscribeSens();
        } else if (road.end.isEqual(point)) {
          // DONE réaliser la connexion avec le step 6 trello:#41
          this.nextStepSubject.next(6);
        } else if (road.isOn(point)) {
          this.actualBoxesSubject.next(-1);
          this.animatedRoads[0].unsubscribeSens();
          // DONE réaliser la déconnexion avec le step 6 trello:#41
          this.animatedRoads[2].unsubscribeSens();
        }
      });
      const sub = this.nextStepSubject.filter(step => step === 5).subscribe(() => {
        this.COASTLINES[1].forEach((marker) => {
          const path = this.canvas.path(`M${marker.begin.x} ${marker.begin.y}`);
          path.animate({ path: `M${marker.begin.x} ${marker.begin.y} L${marker.end.x} ${marker.end.y}` }, 2000);
        }, this);
        sub.unsubscribe();
      });
    },
    // DONE ajouter la sixième étape trello:#41
    // sixth step
    () => {
      const sensObservable = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road = this.ROADS[2];
      const animatedLine = new AnimatedLine(road, 5, sensObservable)
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.isOn(point)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point)) {
          this.actualBoxesSubject.next(6);
          this.animatedRoads[1].subscribeSens();
          this.animatedRoads[2].subscribeSens();
        } else if (road.end.isEqual(point)) {
          // DONE réaliser la connexion avec le step 7 trello:#42
          this.nextStepSubject.next(7);
        } else if (road.isOn(point)) {
          this.actualBoxesSubject.next(-1);
          this.animatedRoads[1].unsubscribeSens();
          // DONE réaliser la déconnexion avec le step 7 trello:#42
          this.animatedRoads[3].unsubscribeSens();
        }
      });
      const sub = this.nextStepSubject.filter(step => step === 6).subscribe(() => {
        // DONE réaliser les coastlines à afficher trello:#41
        this.COASTLINES[2].forEach((marker) => {
          const path = this.canvas.path(`M${marker.begin.x} ${marker.begin.y}`);
          path.animate({ path: `M${marker.begin.x} ${marker.begin.y} L${marker.end.x} ${marker.end.y}` }, 2000);
        }, this);
        sub.unsubscribe();
      });
    },
    // DONE ajouter la septième étape trello:#42
    // Seventh step
    () => {
      const sensObservable1 = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road1 = this.ROADS[3];
      const animatedLine1 = new AnimatedLine(road1, 5, sensObservable1)
        .draw(this.canvas)
        .animate();
      animatedLine1.subscribe((point) => {
        if (road1.isOn(point)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine1);
      this.actualPointSubject.subscribe((point) => {
        if (road1.begin.isEqual(point)) {
          this.actualBoxesSubject.next(7);
          this.animatedRoads[2].subscribeSens();
          this.animatedRoads[3].subscribeSens();
        } else if (road1.isOn(point)) {
          this.animatedRoads[2].unsubscribeSens();
          this.animatedRoads[4].unsubscribeSens();
        }
      });
      const sensObservable2 = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road2 = this.ROADS[4];
      const animatedLine2 = new AnimatedLine(road2, 5, sensObservable2)
        .draw(this.canvas)
        .animate();
      animatedLine2.subscribe((point) => {
        if (road2.isOn(point)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine2);
      this.actualPointSubject.subscribe((point) => {
        if (road2.begin.isEqual(point)) {
          this.animatedRoads[3].subscribeSens();
          this.animatedRoads[4].subscribeSens();
        } else if (road2.end.isEqual(point)) {
          // DONE réaliser la connexion avec le step 8 trello:#43
          this.nextStepSubject.next(8);
        } else if (road2.isOn(point)) {
          this.actualBoxesSubject.next(7);
          this.animatedRoads[3].unsubscribeSens();
          // DONE réaliser la déconnexion avec le step 8 trello:#43
          this.animatedRoads[5].unsubscribeSens();
        }
      });
      const sub = this.nextStepSubject.filter(step => step === 7).subscribe(() => {
        this.COASTLINES[3].forEach((marker) => {
          const path = this.canvas.path(`M${marker.begin.x} ${marker.begin.y}`);
          path.animate({ path: `M${marker.begin.x} ${marker.begin.y} L${marker.end.x} ${marker.end.y}` }, 2000);
        }, this);
        sub.unsubscribe();
      });
    },
    // DONE ajouter la huitième étape trello:#43
    // Eigth step
    () => {
      const sensObservable1 = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road1 = this.ROADS[5];
      const animatedLine1 = new AnimatedLine(road1, 5, sensObservable1)
        .draw(this.canvas)
        .animate();
      animatedLine1.subscribe((point) => {
        if (road1.isOn(point)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine1);
      this.actualPointSubject.subscribe((point) => {
        if (road1.begin.isEqual(point)) {
          this.actualBoxesSubject.next(8);
          this.animatedRoads[4].subscribeSens();
          this.animatedRoads[5].subscribeSens();
        } else if (road1.isOn(point)) {
          this.actualBoxesSubject.next(-1);
          this.animatedRoads[4].unsubscribeSens();
          this.animatedRoads[6].unsubscribeSens();
        }
      });
      const sensObservable2 = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road2 = this.ROADS[6];
      const animatedLine2 = new AnimatedLine(road2, 5, sensObservable2)
        .draw(this.canvas)
        .animate();
      animatedLine2.subscribe((point) => {
        if (road2.isOn(point)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine2);
      this.actualPointSubject.subscribe((point) => {
        if (road2.begin.isEqual(point)) {
          this.animatedRoads[5].subscribeSens();
          this.animatedRoads[6].subscribeSens();
        } else if (road2.end.isEqual(point)) {
          // TODO réaliser la connexion avec le step 9 trello:#44
        } else if (road2.isOn(point)) {
          this.actualBoxesSubject.next(-1);
          this.animatedRoads[5].unsubscribeSens();
          // TODO réaliser la déconnexion avec le step 9 trello:#44
        }
      });
      const sub = this.nextStepSubject.filter(step => step === 8).subscribe(() => {
        this.COASTLINES[4].forEach((marker) => {
          const path = this.canvas.path(`M${marker.begin.x} ${marker.begin.y}`);
          path.animate({ path: `M${marker.begin.x} ${marker.begin.y} L${marker.end.x} ${marker.end.y}` }, 2000);
        }, this);
        sub.unsubscribe();
      });
    }
    // TODO ajouter la neuvième étape trello:#44
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
    this.buildRoads(pixelRatio);
    this.buildCoastlines(pixelRatio);
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

  buildRoads(pixelRatio) {
    this.ROADS = [
      new Marker('rnh1-rnh2', 708, 502, 705, 485, pixelRatio),
      new Marker('rnh2-rnh3', 705, 485, 743, 548, pixelRatio),
      new Marker('rnh3-rnh4', 743, 548, 752, 592, pixelRatio),
      new Marker('rnh4-rnh5', 752, 592, 759, 622, pixelRatio),
      new Marker('rnh5-rnh6', 759, 622, 797, 660, pixelRatio),
      new Marker('rnh6-rnh7', 797, 660, 819, 661, pixelRatio),
      new Marker('rnh7-rnh8', 819, 661, 827, 699, pixelRatio)
    ];
  }

  buildCoastlines(pixelRatio) {
    this.COASTLINES = [
      [
        new Marker('nh54-nh55', 705, 498, 703, 498, pixelRatio),
        new Marker('nh55-nh56', 703, 498, 706, 504, pixelRatio),
        new Marker('nh56-nh57', 706, 504, 714, 503, pixelRatio)
      ],
      [
        new Marker('nh49-nh50', 648, 441, 681, 506, pixelRatio),
        new Marker('nh50-nh51', 681, 506, 690, 502, pixelRatio),
        new Marker('nh51-nh52', 690, 502, 695, 497, pixelRatio),
        new Marker('nh52-nh53', 695, 497, 705, 495, pixelRatio),
        new Marker('nh53-nh54', 705, 495, 705, 498, pixelRatio),
        new Marker('nh57-nh58', 714, 503, 717, 508, pixelRatio),
        new Marker('nh24-nh25', 701, 455, 714, 478, pixelRatio),
        new Marker('nh25-nh26', 714, 478, 695, 482, pixelRatio),
        new Marker('nh26-nh27', 695, 482, 717, 484, pixelRatio),
        new Marker('nh27-nh28', 717, 484, 755, 499, pixelRatio)
      ],
      [
        new Marker('nh28-nh29', 755, 499, 760, 525, pixelRatio),
        new Marker('nh29-nh30', 760, 525, 771, 524, pixelRatio),
        new Marker('nh58-nh59', 717, 508, 699, 516, pixelRatio),
        new Marker('nh59-nh60', 699, 516, 697, 512, pixelRatio),
        new Marker('nh60-nh61', 697, 512, 695, 504, pixelRatio),
        new Marker('nh61-nh62', 695, 504, 682, 508, pixelRatio),
        new Marker('nh62-nh63', 682, 508, 683, 517, pixelRatio),
        new Marker('nh63-nh90', 683, 517, 709, 589, pixelRatio)
      ],
      [
        new Marker('nh90-nh91', 709, 589, 705, 604, pixelRatio),
        new Marker('nh91-nh92', 705, 604, 705, 625, pixelRatio),
        new Marker('nh92-nh93', 705, 625, 709, 626, pixelRatio),
        new Marker('nh93-nh94', 709, 626, 716, 622, pixelRatio),
        new Marker('nh94-nh95', 716, 622, 720, 627, pixelRatio),
        new Marker('nh95-nh96', 720, 627, 711, 632, pixelRatio),
        new Marker('nh96-nh97', 711, 632, 705, 629, pixelRatio),
        new Marker('nh97-nh98', 705, 629, 698, 629, pixelRatio),
        new Marker('nh98-nh99', 698, 629, 700, 653, pixelRatio),
        new Marker('nh99-nh100', 700, 653, 693, 662, pixelRatio)
      ],
      []
    ];
  }
}
