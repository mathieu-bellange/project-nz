import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import ScenarioService from './scenario.service';
import { Airport, Sky, Van, KapitiBoat } from '../scenery';
import { OrientedVector, Coordinate, AnimatedLine } from '../tools';
import buildRoads from './road-markers';
import buildCoastlines from './coastline-markers';
import buildCity from './city-markers';
import buildDecors from './decor-markers';

// DOING ajouter avec les décors avoisinant la route trello:#77
export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  actualBoxesSubject;
  nextStepSubject;
  airport;
  van;
  kapitiBoat;
  initPoint;
  airportPoint;
  landingPoint;
  actualRoadSubject;
  automatedObservable;
  airplaneObservable;
  scenarioService;
  landingFunction = () => {
    this.actualBoxesSubject.next(3);
    this.actualPointSubject.next(this.airportPoint);
  };
  declareAnimatedLine = (indexRoad, showBegin, showEnd, hideRoad) => {
    const road = this.ROADS[indexRoad];
    const observable = this.automatedObservable
      .withLatestFrom(this.actualRoadSubject, this.actualPointSubject)
      .map(values => ({
        sens: values[0].sens,
        interval: values[0].interval,
        roadId: values[1],
        currentPoint: values[2]
      }))
      .filter(o => o.roadId === road.id)
      .do((o) => {
        if (o.sens === 1 && road.begin.isEqual(o.currentPoint)) {
          this.nextKmTraveledSubject.next(road.km);
        }
        if (o.sens === -1 && road.end.isEqual(o.currentPoint)) {
          this.nextKmTraveledSubject.next(-road.km);
        }
        if (o.sens === 1 && road.end.isEqual(o.currentPoint) && indexRoad + 1 < this.ROADS.length) {
          this.actualRoadSubject.next(this.ROADS[indexRoad + 1].id);
        }
        if (o.sens === -1 && road.begin.isEqual(o.currentPoint) && indexRoad > 0) {
          this.actualRoadSubject.next(this.ROADS[indexRoad - 1].id);
          this.actualPointSubject.next(o.currentPoint);
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
      if (this.stoppingStep && this.stoppingStep.isEqual(point)) {
        this.automatedRoadAlwaysOn = false;
        this.isLoadingSubject.next(false);
      }
      if ((road.begin.isEqual(point) && showBegin) || (road.end.isEqual(point) && showEnd)) {
        this.automatedRoadOn = false;
        this.onRoadAgainSubject.next(true);
      }
      this.actualPointSubject.next(point);
    });
  };
  declareSteps = (indexRoad, indexStep, showBegin, showEnd, keepShowing) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject
      .withLatestFrom(this.actualRoadSubject)
      .filter(values => values[1] === road.id)
      .filter(() => !this.automatedRoadAlwaysOn)
      .map(values => values[0])
      .subscribe((point) => {
        if (road.begin.isEqual(point)) {
          if (showBegin) this.actualBoxesSubject.next(indexStep);
          this.nextStepSubject.next(indexStep);
        } else if (road.end.isEqual(point)) {
          if (showEnd) this.actualBoxesSubject.next(indexStep + 1);
          this.nextStepSubject.next(indexStep + 1);
        } else if (keepShowing) {
          this.actualBoxesSubject.next(indexStep);
        } else {
          this.actualBoxesSubject.next(-1);
        }
      });
  };
  declareDecorsGenerator = (indexDecor, indexStep) => {
    const sub = this.nextStepSubject.filter(step => step === indexStep).subscribe(() => {
      this.DECORS[indexDecor].forEach((decor) => {
        decor.draw(this.canvas).animate();
      }, this);
      sub.unsubscribe();
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
  declareCitiesGenerator = (indexCities, indexStep) => {
    const sub = this.nextStepSubject.filter(step => step === indexStep).subscribe(() => {
      this.CITIES[indexCities].forEach((city) => {
        city.draw(this.canvas).animate();
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

  ROADS_BEGIN_BY_STEP = [];

  CITIES = [];

  DECORS = [];

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
              this.nextStep();
              animatedLine.unsubscribe();
              this.landingFunction();
            }
          });
        sub.unsubscribe();
      });
    },
    // fourth step
    () => {
      this.declareAnimatedLine(0, true, true);
      this.declareSteps(0, 4, true, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[0].begin);
      this.declareCoastlineGenerator(0, 4);
      this.declareCitiesGenerator(0, 4);
      this.declareDecorsGenerator(0, 4);
    },
    // fifth step
    () => {
      this.declareAnimatedLine(1, true, true);
      this.declareAnimatedSVG(1, this.van, false, true, true);
      this.declareSteps(1, 5, true, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[1].begin);
      this.declareCoastlineGenerator(1, 5);
      this.declareCitiesGenerator(1, 5);
      this.declareDecorsGenerator(1, 5);
      const sub = this.nextStepSubject.filter(step => step === 5).subscribe(() => {
        this.displayBorneKmSubject.next(true);
        sub.unsubscribe();
      });
    },
    // sixth step
    () => {
      this.declareAnimatedLine(2, true, true);
      this.declareAnimatedSVG(2, this.van, false, true, false);
      this.declareSteps(2, 6, true, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[2].begin);
      this.declareCoastlineGenerator(2, 6);
      this.declareCitiesGenerator(2, 6);
      this.declareDecorsGenerator(2, 6);
    },
    // Seventh step
    () => {
      this.declareAnimatedLine(3, true, false);
      this.declareAnimatedLine(4, false, true);
      this.declareAnimatedSVG(3, this.van, false, false, false);
      this.declareAnimatedSVG(4, this.van, false, false, true);
      this.declareSteps(3, 7, true, false, true);
      this.declareSteps(4, 7, false, true, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[3].begin);
      this.declareCoastlineGenerator(3, 7);
      this.declareCitiesGenerator(3, 7);
      this.declareDecorsGenerator(3, 7);
    },
    // Eigth step
    () => {
      this.declareAnimatedLine(5, true, false);
      this.declareAnimatedLine(6, false, true);
      this.declareAnimatedSVG(5, this.van, false, true, false);
      this.declareAnimatedSVG(6, this.van, false, false, true);
      this.declareSteps(5, 8, true, false);
      this.declareSteps(6, 8, false, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[5].begin);
      this.declareCitiesGenerator(4, 8);
      this.declareDecorsGenerator(4, 8);
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
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[7].begin);
      this.declareCoastlineGenerator(4, 9);
      this.declareCitiesGenerator(5, 9);
      this.declareDecorsGenerator(5, 9);
    },
    // tenth step
    () => {
      this.declareAnimatedLine(10, true, false);
      this.declareAnimatedLine(11, false, true);
      this.declareAnimatedSVG(10, this.van, true, true, false);
      this.declareAnimatedSVG(11, this.van, true, false, true);
      this.declareSteps(10, 10, true, false);
      this.declareSteps(11, 10, false, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[10].begin);
      this.declareCitiesGenerator(6, 10);
      this.declareDecorsGenerator(6, 10);
    },
    // eleventh step
    () => {
      this.declareAnimatedLine(12, true, true);
      this.declareAnimatedSVG(12, this.van, true, true, true);
      this.declareSteps(12, 11, true, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[12].begin);
      this.declareDecorsGenerator(7, 11);
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
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[13].begin);
      this.declareDecorsGenerator(8, 12);
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
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[16].begin);
      this.declareCitiesGenerator(7, 13);
      this.declareDecorsGenerator(9, 13);
    },
    // Fourteenth step
    () => {
      this.declareAnimatedLine(20, true, false);
      this.declareAnimatedLine(21, false, true);
      this.declareAnimatedSVG(20, this.van, true, false, false);
      this.declareAnimatedSVG(21, this.van, true, false, true);
      this.declareSteps(20, 14, true, false, true);
      this.declareSteps(21, 14, false, true, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[20].begin);
      this.declareDecorsGenerator(10, 14);
    },
    // fifteenth step
    () => {
      this.declareAnimatedLine(22, true, false);
      this.declareAnimatedLine(23, false, true);
      this.declareAnimatedSVG(22, this.van, false, true, false);
      this.declareAnimatedSVG(23, this.van, false, false, true);
      this.declareSteps(22, 15, true, false);
      this.declareSteps(23, 15, false, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[22].begin);
      this.declareCoastlineGenerator(5, 15);
      this.declareCitiesGenerator(8, 15);
      this.declareDecorsGenerator(11, 15);
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
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[24].begin);
      this.declareCoastlineGenerator(6, 16);
      this.declareCitiesGenerator(9, 16);
    },
    // seventeenth step
    () => {
      this.declareAnimatedLine(27, true, false);
      this.declareAnimatedLine(28, false, true);
      this.declareAnimatedSVG(27, this.van, false, true, false);
      this.declareAnimatedSVG(28, this.van, true, false, false);
      this.declareSteps(27, 17, true, false);
      this.declareSteps(28, 17, false, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[27].begin);
      this.declareCitiesGenerator(10, 17);
      this.declareDecorsGenerator(12, 17);
    },
    // eighteenth step
    () => {
      this.declareAnimatedLine(29, true, false);
      this.declareAnimatedLine(30, false, true);
      this.declareAnimatedSVG(29, this.van, true, false, false);
      this.declareAnimatedSVG(30, this.van, true, false, true);
      this.declareSteps(29, 18, true, false, true);
      this.declareSteps(30, 18, false, true, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[29].begin);
      this.declareCoastlineGenerator(7, 18);
      this.declareDecorsGenerator(13, 18);
    },
    // nineteenth step
    () => {
      this.declareAnimatedLine(31, true, false);
      this.declareAnimatedLine(32, false, true);
      this.declareAnimatedSVG(31, this.van, true, true, false);
      this.declareAnimatedSVG(32, this.van, true, false, true);
      this.declareSteps(31, 19, true, false);
      this.declareSteps(32, 19, false, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[31].begin);
      this.declareCoastlineGenerator(8, 19);
      this.declareDecorsGenerator(14, 19);
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
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[33].begin);
      this.declareCoastlineGenerator(9, 20);
      this.declareCitiesGenerator(11, 20);
      this.declareDecorsGenerator(15, 20);
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
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[37].begin);
    },
    // twenty second step
    () => {
      this.declareAnimatedLine(40, true, false);
      this.declareAnimatedLine(41, false, true);
      this.declareAnimatedSVG(40, this.van, false, false, false);
      this.declareAnimatedSVG(41, this.van, false, false, true);
      this.declareSteps(40, 22, true, false, true);
      this.declareSteps(41, 22, false, true, true);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[40].begin);
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
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[42].begin);
      this.declareCitiesGenerator(12, 23);
    },
    // twenty fourth step
    () => {
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[45].begin);
    }
  ];

  constructor(
    canvas,
    pixelRatio,
    actualPointSubject,
    actualBoxesSubject,
    onRoadAgainSubject,
    hasPreviousSubject,
    hasNextSubject,
    isLoadingSubject,
    nextKmTraveledSubject,
    displayBorneKmSubject
  ) {
    this.canvas = canvas;
    this.actualPointSubject = actualPointSubject;
    this.actualBoxesSubject = actualBoxesSubject;
    this.onRoadAgainSubject = onRoadAgainSubject;
    this.hasPreviousSubject = hasPreviousSubject;
    this.hasNextSubject = hasNextSubject;
    this.isLoadingSubject = isLoadingSubject;
    this.nextKmTraveledSubject = nextKmTraveledSubject;
    this.displayBorneKmSubject = displayBorneKmSubject;
    this.scenarioService = new ScenarioService();
    this.nextStepSubject = new Subject();
    this.airport = new Airport();
    this.initPoint = new Coordinate(754, 476, pixelRatio);
    this.airportPoint = new Coordinate(708, 502, pixelRatio);
    this.landingPoint = new Coordinate(675, 521, pixelRatio);
    this.van = new Van();
    this.kapitiBoat = new KapitiBoat();
    this.ROADS = buildRoads(pixelRatio);
    this.COASTLINES = buildCoastlines(pixelRatio);
    this.CITIES = buildCity(pixelRatio);
    this.DECORS = buildDecors(pixelRatio);
    this.actualRoadSubject = new BehaviorSubject(this.ROADS[0].id);
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
    ).filter(() => this.automatedRoadOn || this.automatedRoadAlwaysOn)
      .map(values => ({
        sens: values[0].sens,
        interval: values[0].interval
      })).delay(5);
    this.nextStepSubject.subscribe((step) => {
      this.hasPreviousSubject.next(step > 4);
      this.hasNextSubject.next(step < 24);
    });
  }

  launch() {
    const index = this.scenarioService.getCurrentStep();
    this.steps.forEach(step => step());
    if (index === 4) {
      this.landingFunction();
    } else if (index > 4) {
      this.isLoadingSubject.next(true);
      this.automatedRoadAlwaysOn = true;
      this.landingFunction();
      for (let ind = 4; ind <= index; ind += 1) {
        this.nextStepSubject.next(ind);
      }
      this.stoppingStep = this.ROADS_BEGIN_BY_STEP[index - 4];
      this.launchAutomatedSubject.next({ sens: 1, interval: 1 });
    } else {
      this.nextStepSubject.next(0);
      this.nextStepSubject.next(index);
    }
  }

  nextStep() {
    const index = this.scenarioService.getCurrentStep() + 1;
    if (index < 4) {
      this.nextStepSubject.next(index);
    } else if (index > 4) {
      this.automatedRoadOn = true;
      this.launchAutomatedSubject.next({ sens: 1, interval: 320 });
      this.onRoadAgainSubject.next(false);
    }
    this.scenarioService.saveCurrentStep(index);
  }

  previousStep() {
    const index = this.scenarioService.getCurrentStep() - 1;
    if (index > 3) {
      this.automatedRoadOn = true;
      this.launchAutomatedSubject.next({ sens: -1, interval: 320 });
      this.onRoadAgainSubject.next(false);
    }
    this.scenarioService.saveCurrentStep(index);
  }
}
