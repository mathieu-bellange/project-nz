import {
  Subject,
  BehaviorSubject,
  combineLatest,
  of
} from 'rxjs';
import {
  delay,
  map,
  withLatestFrom,
  filter
} from 'rxjs/operators';

import ScenarioService from './scenario.service';
import { Airport, Sky } from '../scenery';
import { OrientedVector, Coordinate, AnimatedLine } from '../tools';
import buildRoads from './road-markers';
import LandscapeSteps from './landscape-steps';
import RoadSteps from './road-steps';

// PLANNING refacto le système de route trello:#83
// DONE refacto la class pour supprimer la notion de scenario trello:#126
export default class Scenario {
  canvas;

  actualPointSubject;

  actualBoxesSubject;

  nextStepSubject;

  airport;

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
    this.hasNextSubject.next(true);
  };

  ROADS = [];

  ROADS_BEGIN_BY_STEP = [];

  intervalMap = new Map();

  // DOING externalise les étapes dans un autre fichier trello:#126
  steps = [
    // launch step
    () => {
      const sub = this.nextStepSubject.pipe(filter(step => step === 0)).subscribe(() => {
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
      const sub = this.nextStepSubject.pipe(filter(step => step === 1)).subscribe(() => {
        this.actualBoxesSubject.next(1);
        sub.unsubscribe();
      });
    },
    // second step
    () => {
      const sub = this.nextStepSubject.pipe(filter(step => step === 2)).subscribe(() => {
        this.actualBoxesSubject.next(2);
        sub.unsubscribe();
      });
    },
    // third step
    () => {
      const animatedLine = new AnimatedLine(new OrientedVector('airplaneLine', this.initPoint.x, this.initPoint.y, this.airportPoint.x, this.airportPoint.y));
      const sub = this.nextStepSubject.pipe(filter(step => step === 3)).subscribe(() => {
        this.hasNextSubject.next(false);
        this.sky.stop();
        this.airport.landing(this.canvas, this.landingPoint);
        this.airplaneObservable.subscribe(o => animatedLine.animate(o));
        animatedLine.subscribe((point) => {
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
      this.intervalMap.set(this.ROADS[0].id, 160);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[0].begin);
      this.roadSteps.execute(4);
      this.landscapeSteps.execute(4);
    },
    // fifth step
    () => {
      this.intervalMap.set(this.ROADS[1].id, 160);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[1].begin);
      this.roadSteps.execute(5);
      this.landscapeSteps.execute(5);
      const sub = this.nextStepSubject.pipe(filter(step => step === 5)).subscribe(() => {
        this.displayBorneKmSubject.next(true);
        sub.unsubscribe();
      });
    },
    // sixth step
    () => {
      this.intervalMap.set(this.ROADS[2].id, 160);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[2].begin);
      this.roadSteps.execute(6);
      this.landscapeSteps.execute(6);
    },
    // Seventh step
    () => {
      this.intervalMap.set(this.ROADS[3].id, 160);
      this.intervalMap.set(this.ROADS[4].id, 160);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[3].begin);
      this.roadSteps.execute(7);
      this.landscapeSteps.execute(7);
    },
    // Eigth step
    () => {
      this.intervalMap.set(this.ROADS[5].id, 80);
      this.intervalMap.set(this.ROADS[6].id, 160);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[5].begin);
      this.roadSteps.execute(8);
      this.landscapeSteps.execute(8);
    },
    // ninth step
    () => {
      this.intervalMap.set(this.ROADS[7].id, 40);
      this.intervalMap.set(this.ROADS[8].id, 160);
      this.intervalMap.set(this.ROADS[9].id, 80);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[7].begin);
      this.roadSteps.execute(9);
      this.landscapeSteps.execute(9);
    },
    // tenth step
    () => {
      this.intervalMap.set(this.ROADS[10].id, 80);
      this.intervalMap.set(this.ROADS[11].id, 80);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[10].begin);
      this.roadSteps.execute(10);
      this.landscapeSteps.execute(10);
    },
    // eleventh step
    () => {
      this.intervalMap.set(this.ROADS[12].id, 80);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[12].begin);
      this.roadSteps.execute(11);
      this.landscapeSteps.execute(11);
    },
    // twelveth step
    () => {
      this.intervalMap.set(this.ROADS[13].id, 80);
      this.intervalMap.set(this.ROADS[14].id, 80);
      this.intervalMap.set(this.ROADS[15].id, 80);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[13].begin);
      this.roadSteps.execute(12);
      this.landscapeSteps.execute(12);
    },
    // Thirteenth step
    () => {
      this.intervalMap.set(this.ROADS[16].id, 80);
      this.intervalMap.set(this.ROADS[17].id, 80);
      this.intervalMap.set(this.ROADS[18].id, 40);
      this.intervalMap.set(this.ROADS[19].id, 40);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[16].begin);
      this.roadSteps.execute(13);
      this.landscapeSteps.execute(13);
    },
    // Fourteenth step
    () => {
      this.intervalMap.set(this.ROADS[20].id, 160);
      this.intervalMap.set(this.ROADS[21].id, 160);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[20].begin);
      this.roadSteps.execute(14);
      this.landscapeSteps.execute(14);
    },
    // fifteenth step
    () => {
      this.intervalMap.set(this.ROADS[22].id, 160);
      this.intervalMap.set(this.ROADS[23].id, 80);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[22].begin);
      this.roadSteps.execute(15);
      this.landscapeSteps.execute(15);
    },
    // sixteenth step
    () => {
      this.intervalMap.set(this.ROADS[24].id, 80);
      this.intervalMap.set(this.ROADS[25].id, 80);
      this.intervalMap.set(this.ROADS[26].id, 40);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[24].begin);
      this.roadSteps.execute(16);
      this.landscapeSteps.execute(16);
    },
    // seventeenth step
    () => {
      this.intervalMap.set(this.ROADS[27].id, 40);
      this.intervalMap.set(this.ROADS[28].id, 160);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[27].begin);
      this.roadSteps.execute(17);
      this.landscapeSteps.execute(17);
    },
    // eighteenth step
    () => {
      this.intervalMap.set(this.ROADS[29].id, 80);
      this.intervalMap.set(this.ROADS[30].id, 80);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[29].begin);
      this.roadSteps.execute(18);
      this.landscapeSteps.execute(18);
    },
    // nineteenth step
    () => {
      this.intervalMap.set(this.ROADS[31].id, 40);
      this.intervalMap.set(this.ROADS[32].id, 160);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[31].begin);
      this.roadSteps.execute(19);
      this.landscapeSteps.execute(19);
    },
    // twentieth step
    () => {
      this.intervalMap.set(this.ROADS[33].id, 160);
      this.intervalMap.set(this.ROADS[34].id, 40);
      this.intervalMap.set(this.ROADS[35].id, 80);
      this.intervalMap.set(this.ROADS[36].id, 80);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[33].begin);
      this.roadSteps.execute(20);
      this.landscapeSteps.execute(20);
    },
    // twenty first step
    () => {
      this.intervalMap.set(this.ROADS[37].id, 80);
      this.intervalMap.set(this.ROADS[38].id, 80);
      this.intervalMap.set(this.ROADS[39].id, 80);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[37].begin);
      this.roadSteps.execute(21);
    },
    // twenty second step
    () => {
      this.intervalMap.set(this.ROADS[40].id, 80);
      this.intervalMap.set(this.ROADS[41].id, 40);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[40].begin);
      this.roadSteps.execute(22);
      this.landscapeSteps.execute(22);
    },
    // twenty third step
    () => {
      this.intervalMap.set(this.ROADS[42].id, 40);
      this.intervalMap.set(this.ROADS[43].id, 160);
      this.intervalMap.set(this.ROADS[44].id, 40);
      this.ROADS_BEGIN_BY_STEP.push(this.ROADS[42].begin);
      this.roadSteps.execute(23);
      this.landscapeSteps.execute(23);
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
    this.landscapeSteps = new LandscapeSteps(this.nextStepSubject, canvas, pixelRatio);
    this.airport = new Airport();
    this.initPoint = new Coordinate(754, 476, pixelRatio);
    this.airportPoint = new Coordinate(708, 502, pixelRatio);
    this.landingPoint = new Coordinate(670, 526, pixelRatio);
    this.ROADS = buildRoads(pixelRatio);
    this.actualRoadSubject = new BehaviorSubject(this.ROADS[0].id);
    this.airplaneObservable = combineLatest(
      of({ sens: 1, interval: 320 }),
      this.actualPointSubject
    ).pipe(
      map(values => ({
        sens: values[0].sens,
        currentPoint: values[1],
        interval: values[0].interval
      })),
      delay(10)
    );
    this.launchAutomatedSubject = new Subject();
    const theDelay = !!document.documentMode || !!window.StyleMedia ? 60 : 20;
    this.automatedObservable = combineLatest(
      this.launchAutomatedSubject,
      this.actualPointSubject
    ).pipe(
      withLatestFrom(this.actualRoadSubject),
      filter(() => this.roadSteps.getAutomatedRoadOn()
        || this.roadSteps.getAutomatedRoadAlwaysOn()),
      map(values => ({
        sens: values[0][0].sens,
        interval: values[0][0].interval || this.intervalMap.get(values[1]),
        roadId: values[1],
        currentPoint: values[0][1]
      })),
      delay(theDelay)
    );
    this.nextStepSubject.subscribe((step) => {
      if (step < 5) {
        this.hasPreviousSubject.next(false);
      }
      if (step > 23) {
        this.hasNextSubject.next(false);
      }
    });
    this.roadSteps = new RoadSteps(this.automatedObservable,
      this.actualRoadSubject,
      actualPointSubject,
      nextKmTraveledSubject,
      isLoadingSubject,
      onRoadAgainSubject,
      actualBoxesSubject,
      this.nextStepSubject,
      canvas,
      pixelRatio);
  }

  launch() {
    this.isLoadingSubject.next(true);
    const index = this.scenarioService.getCurrentStep();
    this.steps.forEach(step => step());
    if (index === 4) {
      this.landingFunction();
      this.isLoadingSubject.next(false);
    } else if (index > 4) {
      this.roadSteps.automatedRoadAlwaysGoesOn();
      this.landingFunction();
      for (let ind = 4; ind <= index; ind += 1) {
        this.nextStepSubject.next(ind);
      }
      this.roadSteps.setStoppingStep(this.ROADS_BEGIN_BY_STEP[index - 4]);
      this.launchAutomatedSubject.next({ sens: 1, interval: 1 });
    } else {
      this.nextStepSubject.next(0);
      this.nextStepSubject.next(index);
      this.isLoadingSubject.next(false);
    }
  }

  nextStep() {
    const index = this.scenarioService.getCurrentStep() + 1;
    if (index <= 4) {
      this.nextStepSubject.next(index);
    } else if (index > 4) {
      this.roadSteps.automatedRoadGoesOn();
      const interval = !!document.documentMode || !!window.StyleMedia ? 20 : null;
      this.launchAutomatedSubject.next({ sens: 1, interval });
      this.onRoadAgainSubject.next(false);
    }
    this.scenarioService.saveCurrentStep(index);
  }

  previousStep() {
    const index = this.scenarioService.getCurrentStep() - 1;
    if (index > 3) {
      this.roadSteps.automatedRoadGoesOn();
      const interval = !!document.documentMode || !!window.StyleMedia ? 20 : null;
      this.launchAutomatedSubject.next({ sens: -1, interval });
      this.onRoadAgainSubject.next(false);
    }
    this.scenarioService.saveCurrentStep(index);
  }
}
