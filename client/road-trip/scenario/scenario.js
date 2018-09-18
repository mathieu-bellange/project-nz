import {
  Subject,
  BehaviorSubject,
  combineLatest,
  of
} from 'rxjs';
import {
  delay,
  map,
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

  airplaneObservable;

  scenarioService;

  landingFunction = () => {
    this.actualBoxesSubject.next(3);
    this.actualPointSubject.next(this.airportPoint);
    this.hasNextSubject.next(true);
  };

  ROADS = [];

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
      this.roadSteps.execute(4);
      this.landscapeSteps.execute(4);
    },
    // fifth step
    () => {
      this.roadSteps.execute(5);
      this.landscapeSteps.execute(5);
      const sub = this.nextStepSubject.pipe(filter(step => step === 5)).subscribe(() => {
        this.displayBorneKmSubject.next(true);
        sub.unsubscribe();
      });
    },
    // sixth step
    () => {
      this.roadSteps.execute(6);
      this.landscapeSteps.execute(6);
    },
    // Seventh step
    () => {
      this.roadSteps.execute(7);
      this.landscapeSteps.execute(7);
    },
    // Eigth step
    () => {
      this.roadSteps.execute(8);
      this.landscapeSteps.execute(8);
    },
    // ninth step
    () => {
      this.roadSteps.execute(9);
      this.landscapeSteps.execute(9);
    },
    // tenth step
    () => {
      this.roadSteps.execute(10);
      this.landscapeSteps.execute(10);
    },
    // eleventh step
    () => {
      this.roadSteps.execute(11);
      this.landscapeSteps.execute(11);
    },
    // twelveth step
    () => {
      this.roadSteps.execute(12);
      this.landscapeSteps.execute(12);
    },
    // Thirteenth step
    () => {
      this.roadSteps.execute(13);
      this.landscapeSteps.execute(13);
    },
    // Fourteenth step
    () => {
      this.roadSteps.execute(14);
      this.landscapeSteps.execute(14);
    },
    // fifteenth step
    () => {
      this.roadSteps.execute(15);
      this.landscapeSteps.execute(15);
    },
    // sixteenth step
    () => {
      this.roadSteps.execute(16);
      this.landscapeSteps.execute(16);
    },
    // seventeenth step
    () => {
      this.roadSteps.execute(17);
      this.landscapeSteps.execute(17);
    },
    // eighteenth step
    () => {
      this.roadSteps.execute(18);
      this.landscapeSteps.execute(18);
    },
    // nineteenth step
    () => {
      this.roadSteps.execute(19);
      this.landscapeSteps.execute(19);
    },
    // twentieth step
    () => {
      this.roadSteps.execute(20);
      this.landscapeSteps.execute(20);
    },
    // twenty first step
    () => {
      this.roadSteps.execute(21);
    },
    // twenty second step
    () => {
      this.roadSteps.execute(22);
      this.landscapeSteps.execute(22);
    },
    // twenty third step
    () => {
      this.roadSteps.execute(23);
      this.landscapeSteps.execute(23);
    },
    // twenty fourth step
    () => {
      this.roadSteps.execute(24);
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
    this.nextStepSubject.subscribe((step) => {
      if (step < 5) {
        this.hasPreviousSubject.next(false);
      }
      if (step > 23) {
        this.hasNextSubject.next(false);
      }
    });
    this.roadSteps = new RoadSteps(this.actualRoadSubject,
      actualPointSubject,
      nextKmTraveledSubject,
      isLoadingSubject,
      onRoadAgainSubject,
      actualBoxesSubject,
      this.nextStepSubject,
      this.launchAutomatedSubject,
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
      this.roadSteps.setStoppingStep(index - 4);
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
