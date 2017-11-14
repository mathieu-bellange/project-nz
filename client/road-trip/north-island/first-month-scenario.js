import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import Airport from './airport';
import Sky from './sky';
import { Marker, Coordinate, Path, AnimatedLine, SVGImage } from '../tools';

// BACKLOG ajouter un système de déplacement automatique trello:#20
// PLANNING Ajouter l'affichage du van lors du déplacement de la route trello:#69
// TODO réflexion sur le stockage du pixel ratio trello:68
export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  actualBoxesSubject;
  nextStepSubject;
  pixelRatio;
  airport;
  index;
  initPoint;

  // FIXME changer le nom de la variable pour être moins générique
  COASTLINES = [
    [
      new Marker('nh54-nh55', 705, 498, 703, 498),
      new Marker('nh55-nh56', 703, 498, 706, 504),
      new Marker('nh56-nh57', 706, 504, 714, 503)
    ],
    [
      new Marker('nh49-nh50', 648, 441, 681, 506),
      new Marker('nh50-nh51', 681, 506, 690, 502),
      new Marker('nh51-nh52', 690, 502, 695, 497),
      new Marker('nh52-nh53', 695, 497, 705, 495),
      new Marker('nh53-nh54', 705, 495, 705, 498),
      new Marker('nh57-nh58', 714, 503, 717, 508),
      new Marker('nh24-nh25', 701, 455, 714, 478),
      new Marker('nh25-nh26', 714, 478, 695, 482),
      new Marker('nh26-nh27', 695, 482, 717, 484),
      new Marker('nh27-nh28', 717, 484, 755, 499)
    ],
    [
      new Marker('nh28-nh29', 755, 499, 760, 525),
      new Marker('nh29-nh30', 760, 525, 771, 524),
      new Marker('nh58-nh59', 717, 508, 699, 516),
      new Marker('nh59-nh60', 699, 516, 697, 512),
      new Marker('nh60-nh61', 697, 512, 695, 504),
      new Marker('nh61-nh62', 695, 504, 682, 508),
      new Marker('nh62-nh63', 682, 508, 683, 517),
      new Marker('nh63-nh90', 683, 517, 709, 589)
    ],
    [
      new Marker('nh90-nh91', 709, 589, 705, 604),
      new Marker('nh91-nh92', 705, 604, 705, 625),
      new Marker('nh92-nh93', 705, 625, 709, 626),
      new Marker('nh93-nh94', 709, 626, 716, 622),
      new Marker('nh94-nh95', 716, 622, 720, 627),
      new Marker('nh95-nh96', 720, 627, 711, 632),
      new Marker('nh96-nh97', 711, 632, 705, 629),
      new Marker('nh97-nh98', 705, 629, 698, 629),
      new Marker('nh98-nh99', 698, 629, 700, 653),
      new Marker('nh99-nh100', 700, 653, 693, 662)
    ]
  ];

  Roads = [
    new Marker('rnh1-rnh2', 708, 502, 705, 485),
    new Marker('rnh2-rnh3', 705, 485, 743, 548),
    new Marker('rnh3-rnh4', 743, 548, 752, 592),
    new Marker('rnh4-rnh5', 752, 592, 759, 622)
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

  animatedRoads = [];

  // TODO limiter l'usage du pixel ratio aux constructeurs de point, ligne... trello:#68
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
      const endPoint = new Coordinate(708 * this.pixelRatio, 502 * this.pixelRatio);
      const sensObservable = Observable.timer(0, 5).filter(value => value < 400).map(() => 1);
      const animatedLine = new AnimatedLine(
        new Marker('airplaneLine', this.initPoint.x, this.initPoint.y, 708 * this.pixelRatio, 502 * this.pixelRatio),
        400, sensObservable, true
      );
      const sub = this.nextStepSubject.filter(step => step === 3).subscribe(() => {
        this.sky.stop();
        this.airport.landing(this.canvas, {
          x: endPoint.x - (window.innerWidth / 2),
          y: endPoint.y + (window.innerHeight / 2)
        });
        animatedLine
          .animate(true)
          .subscribe((point) => {
            this.actualPointSubject.next(point);
            if (endPoint.isEqual(point)) {
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
      const road = this.Roads[0];
      const animatedLine = new AnimatedLine(
        new Marker('road1', road.begin.x * this.pixelRatio, road.begin.y * this.pixelRatio, road.end.x * this.pixelRatio, road.end.y * this.pixelRatio),
        5, sensObservable
      )
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.isOn(point, this.pixelRatio)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(4);
          this.animatedRoads[0].subscribeSens();
        } else if (road.end.isEqual(point, this.pixelRatio)) {
          this.nextStepSubject.next(5);
        } else if (road.isOn(point, this.pixelRatio)) {
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
          const path = this.canvas.path(`M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio}`);
          path.animate({ path: `M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio} L${marker.end.x * this.pixelRatio} ${marker.end.y * this.pixelRatio}` }, 2000);
        }, this);
        sub.unsubscribe();
      });
    },
    // fifth step
    // DONE réaliser le step 5 trello:#40
    () => {
      const sensObservable = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road = this.Roads[1];
      const animatedLine = new AnimatedLine(
        new Marker('road2', road.begin.x * this.pixelRatio, road.begin.y * this.pixelRatio, road.end.x * this.pixelRatio, road.end.y * this.pixelRatio),
        5, sensObservable
      )
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.isOn(point, this.pixelRatio)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(5);
          this.animatedRoads[0].subscribeSens();
          this.animatedRoads[1].subscribeSens();
        } else if (road.end.isEqual(point, this.pixelRatio)) {
          // DONE réaliser la connexion avec le step 6 trello:#41
          this.nextStepSubject.next(6);
        } else if (road.isOn(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(-1);
          this.animatedRoads[0].unsubscribeSens();
          // DONE réaliser la déconnexion avec le step 6 trello:#41
          this.animatedRoads[2].unsubscribeSens();
        }
      });
      const sub = this.nextStepSubject.filter(step => step === 5).subscribe(() => {
        this.COASTLINES[1].forEach((marker) => {
          const path = this.canvas.path(`M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio}`);
          path.animate({ path: `M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio} L${marker.end.x * this.pixelRatio} ${marker.end.y * this.pixelRatio}` }, 2000);
        }, this);
        sub.unsubscribe();
      });
    },
    // DONE ajouter la sixième étape trello:#41
    // sixth step
    () => {
      const sensObservable = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road = this.Roads[2];
      const animatedLine = new AnimatedLine(
        new Marker(road.id, road.begin.x * this.pixelRatio, road.begin.y * this.pixelRatio, road.end.x * this.pixelRatio, road.end.y * this.pixelRatio),
        5, sensObservable
      )
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.isOn(point, this.pixelRatio)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(6);
          this.animatedRoads[1].subscribeSens();
          this.animatedRoads[2].subscribeSens();
        } else if (road.end.isEqual(point, this.pixelRatio)) {
          // DONE réaliser la connexion avec le step 7 trello:#42
          this.nextStepSubject.next(7);
        } else if (road.isOn(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(-1);
          this.animatedRoads[1].unsubscribeSens();
          // DONE réaliser la déconnexion avec le step 7 trello:#42
          this.animatedRoads[3].unsubscribeSens();
        }
      });
      const sub = this.nextStepSubject.filter(step => step === 6).subscribe(() => {
        // DONE réaliser les coastlines à afficher trello:#41
        this.COASTLINES[2].forEach((marker) => {
          const path = this.canvas.path(`M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio}`);
          path.animate({ path: `M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio} L${marker.end.x * this.pixelRatio} ${marker.end.y * this.pixelRatio}` }, 2000);
        }, this);
        sub.unsubscribe();
      });
    },
    // DONE ajouter la septième étape trello:#42
    // Seventh step
    () => {
      const sensObservable = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road = this.Roads[3];
      const animatedLine = new AnimatedLine(
        new Marker(road.id, road.begin.x * this.pixelRatio, road.begin.y * this.pixelRatio, road.end.x * this.pixelRatio, road.end.y * this.pixelRatio),
        5, sensObservable
      )
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.isOn(point, this.pixelRatio)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine);
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(7);
          this.animatedRoads[2].subscribeSens();
          this.animatedRoads[3].subscribeSens();
        } else if (road.end.isEqual(point, this.pixelRatio)) {
          // PLANNING réaliser la connexion avec le step 8 trello:#43
        } else if (road.isOn(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(-1);
          this.animatedRoads[2].unsubscribeSens();
          // PLANNING réaliser la déconnexion avec le step 8 trello:#43
        }
      });
      const sub = this.nextStepSubject.filter(step => step === 7).subscribe(() => {
        this.COASTLINES[3].forEach((marker) => {
          const path = this.canvas.path(`M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio}`);
          path.animate({ path: `M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio} L${marker.end.x * this.pixelRatio} ${marker.end.y * this.pixelRatio}` }, 2000);
        }, this);
        sub.unsubscribe();
      });
    }
    // PLANNING ajouter la huitième étape trello:#43
    // PLANNING ajouter la neuvième étape trello:#44
  ];

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject) {
    this.canvas = canvas;
    this.pixelRatio = pixelRatio;
    this.actualPointSubject = actualPointSubject;
    this.actualBoxesSubject = actualBoxesSubject;
    this.nextStepSubject = new Subject();
    this.airport = new Airport();
    this.initPoint = {
      x: (708 * pixelRatio) + (window.innerWidth / 2),
      y: (502 * pixelRatio) - (window.innerHeight / 2)
    };
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
