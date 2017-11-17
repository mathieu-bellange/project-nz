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
    },
    // fifth step
    // DONE réaliser le step 5 trello:#40
    () => {
      this.declareAnimatedRoad(1, 5, true);
      this.declareCoastlineGenerator(1, 5);
      this.declareAnimatedVan(1, true);
    },
    // DONE ajouter la sixième étape trello:#41
    // sixth step
    () => {
      this.declareAnimatedRoad(2, 6, true);
      this.declareCoastlineGenerator(2, 6);
      this.declareAnimatedVan(2, false);
    },
    // DONE ajouter la septième étape trello:#42
    // Seventh step
    () => {
      this.declareAnimatedRoad(3, 7, false, false, true);
      this.declareAnimatedRoad(4, 7, true, false, true);
      this.declareCoastlineGenerator(3, 7);
      this.declareAnimatedVan(3, false);
      this.declareAnimatedVan(4, true);
    },
    // DONE ajouter la huitième étape trello:#43
    // Eigth step
    () => {
      this.declareAnimatedRoad(5, 8, false);
      this.declareAnimatedRoad(6, 8, true, true);
      this.declareCoastlineGenerator(4, 8);
      this.declareAnimatedVan(5, false);
      this.declareAnimatedVan(6, true);
    },
    // DONE ajouter la neuvième étape trello:#44
    () => {
      this.declareAnimatedRoad(7, 9, false);
      this.declareAnimatedRoad(8, 9, false, true);
      this.declareAnimatedRoad(9, 9, true, true);
      this.declareCoastlineGenerator(5, 9);
      this.declareAnimatedVan(7, false);
      this.declareAnimatedVan(8, false);
      this.declareAnimatedVan(9, true);
    },
    // DONE ajouter le step 10 trello:#45
    () => {
      this.declareAnimatedRoad(10, 10, false);
      this.declareAnimatedRoad(11, 10, true, true);
      this.declareCoastlineGenerator(6, 10);
      this.declareAnimatedVan(10, false);
      this.declareAnimatedVan(11, true);
    },
    // DONE ajouter le step 11 trello:#46
    () => {
      this.declareAnimatedRoad(12, 11, false);
      this.declareCoastlineGenerator(7, 11);
      this.declareAnimatedVan(12, true);
    }
    // TODO ajouter le step 12 trello:#47
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
