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
  wheelObservable = Observable.fromEvent(window, 'wheel')
    .map(event => event.deltaY / Math.abs(event.deltaY));
  // DOING gestion de la route plus générique entre les steps
  declareAnimatedRoad = (indexRoad, indexStep, launchNextStep, hideBoxes, keepBoxes) => {
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
      if (road.begin.isEqual(point)) {
        if (!hideBoxes) this.actualBoxesSubject.next(indexStep);
        if (indexRoad > 0) this.animatedRoads[indexRoad - 1].subscribeSens();
        this.animatedRoads[indexRoad].subscribeSens();
      } else if (road.end.isEqual(point)) {
        if (launchNextStep) this.nextStepSubject.next(indexStep + 1);
      } else if (road.isOn(point)) {
        if (keepBoxes) {
          this.actualBoxesSubject.next(indexStep);
        } else {
          this.actualBoxesSubject.next(-1);
        }
        if (indexRoad > 0) this.animatedRoads[indexRoad - 1].unsubscribeSens();
        this.animatedRoads[indexRoad + 1].unsubscribeSens();
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
    },
    // fifth step
    // DONE réaliser le step 5 trello:#40
    () => {
      this.declareAnimatedRoad(1, 5, true);
      this.declareCoastlineGenerator(1, 5);
    },
    // DONE ajouter la sixième étape trello:#41
    // sixth step
    () => {
      this.declareAnimatedRoad(2, 6, true);
      this.declareCoastlineGenerator(2, 6);
    },
    // DONE ajouter la septième étape trello:#42
    // Seventh step
    () => {
      this.declareAnimatedRoad(3, 7, false, false, true);
      this.declareAnimatedRoad(4, 7, true, false, true);
      this.declareCoastlineGenerator(3, 7);
    },
    // DONE ajouter la huitième étape trello:#43
    // Eigth step
    () => {
      this.declareAnimatedRoad(5, 8, false);
      this.declareAnimatedRoad(6, 8, true, true);
      this.declareCoastlineGenerator(4, 8);
    },
    // DONE ajouter la neuvième étape trello:#44
    () => {
      this.declareAnimatedRoad(7, 9, false);
      this.declareAnimatedRoad(8, 9, false, true);
      const road3 = this.ROADS[9];
      const animatedLine3 = new AnimatedLine(road3, 5, this.wheelObservable)
        .draw(this.canvas)
        .animate();
      animatedLine3.subscribe((point) => {
        if (road3.isOn(point)) {
          this.actualPointSubject.next(point);
        }
      });
      this.animatedRoads.push(animatedLine3);
      this.actualPointSubject.subscribe((point) => {
        if (road3.begin.isEqual(point)) {
          this.animatedRoads[8].subscribeSens();
          this.animatedRoads[9].subscribeSens();
        } else if (road3.end.isEqual(point)) {
          // BACKLOG réaliser la connexion avec le step 10 trello:#45
        } else if (road3.isOn(point)) {
          this.animatedRoads[8].unsubscribeSens();
          // BACKLOG réaliser la déconnexion avec le step 10 trello:#45
        }
      });
      this.declareCoastlineGenerator(5, 9);
    }
    // BACKLOG ajouter le step 10 trello:#45
    // BACKLOG ajouter le step 11 trello:#46
    // BACKLOG ajouter le step 12 trello:#47
    // BACKLOG ajouter le step 13 trello:#48
    // BACKLOG ajouter le step 14 trello:#49
    // BACKLOG ajouter le step 15 trello:#50
    // BACKLOG ajouter le step 16 trello:#51
    // BACKLOG ajouter le step 17 trello:#52
    // BACKLOG ajouter le step 18 trello:#53
    // BACKLOG ajouter le step 19 trello:#54
    // BACKLOG ajouter le step 20 trello:#55
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
      new Marker('rnh7-rnh8', 819, 661, 827, 699, pixelRatio),
      new Marker('rnh8-rnh9', 827, 699, 827, 708, pixelRatio),
      new Marker('rnh9-rnh10', 827, 708, 802, 731, pixelRatio),
      new Marker('rnh10-rnh11', 802, 731, 802, 747, pixelRatio)
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
      [],
      [
        new Marker('lt1-lt2', 799, 696, 824, 698, pixelRatio),
        new Marker('lt2-lt3', 824, 698, 824, 708, pixelRatio),
        new Marker('lt3-lt4', 824, 708, 800, 728, pixelRatio),
        new Marker('lt4-lt1', 800, 728, 799, 696, pixelRatio)
      ]
    ];
  }
}
