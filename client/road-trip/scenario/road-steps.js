import {
  map,
  withLatestFrom,
  filter
} from 'rxjs/operators';

import { Van, KapitiBoat } from '../scenery';
import { AnimatedLine } from '../tools';
import buildRoads from './road-markers';
import roadStepsData from './road-steps.data.json';
import boxStepsData from './box-steps.data.json';
import animationStepsData from './animation-steps.data.json';

export default class RoadSteps {
  automatedRoadOn = false;

  automatedRoadAlwaysOn = false;

  constructor(
    automatedObservable,
    actualRoadSubject,
    actualPointSubject,
    nextKmTraveledSubject,
    isLoadingSubject,
    onRoadAgainSubject,
    actualBoxesSubject,
    nextStepSubject,
    canvas,
    pixelRatio
  ) {
    this.automatedObservable = automatedObservable;
    this.actualRoadSubject = actualRoadSubject;
    this.actualPointSubject = actualPointSubject;
    this.nextKmTraveledSubject = nextKmTraveledSubject;
    this.isLoadingSubject = isLoadingSubject;
    this.onRoadAgainSubject = onRoadAgainSubject;
    this.actualBoxesSubject = actualBoxesSubject;
    this.nextStepSubject = nextStepSubject;
    this.canvas = canvas;
    this.ROADS = buildRoads(pixelRatio);
    this.van = new Van();
    this.kapitiBoat = new KapitiBoat();
  }

  declareAnimatedLine = (indexRoad, showBegin, showEnd, hideRoad) => {
    const road = this.ROADS[indexRoad];
    let animatedLine = new AnimatedLine(road);
    if (!hideRoad) {
      animatedLine = animatedLine.draw(this.canvas);
    }
    this.automatedObservable.pipe(filter(o => o.roadId === road.id))
      .subscribe((o) => {
        if (o.sens === 1 && road.begin.isEqual(o.currentPoint)) {
          this.nextKmTraveledSubject.next(road.km);
        }
        if (o.sens === -1 && road.end.isEqual(o.currentPoint)) {
          this.nextKmTraveledSubject.next(-road.km);
        }
        if (o.sens === 1 && road.end.isEqual(o.currentPoint) && indexRoad + 1 < this.ROADS.length) {
          this.actualRoadSubject.next(this.ROADS[indexRoad + 1].id);
          this.actualPointSubject.next(o.currentPoint);
        }
        if (o.sens === -1 && road.begin.isEqual(o.currentPoint) && indexRoad > 0) {
          this.actualRoadSubject.next(this.ROADS[indexRoad - 1].id);
          this.actualPointSubject.next(o.currentPoint);
        }
        if ((o.sens === 1 && !road.end.isEqual(o.currentPoint))
          || (o.sens === -1 && !road.begin.isEqual(o.currentPoint))) {
          animatedLine.animate(o);
        }
      });
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

  declareAnimatedSVG = (indexRoad, svg, reverse, hideBegin, hideEnd) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject.pipe(
      withLatestFrom(this.actualRoadSubject),
      filter(values => values[1] === road.id),
      map(values => values[0])
    ).subscribe((point) => {
      if ((road.begin.isEqual(point) && hideBegin) || (road.end.isEqual(point) && hideEnd)) {
        svg.remove();
      } else if (road.begin.isEqual(point) || road.end.isEqual(point)) {
        svg.draw(this.canvas, point, reverse).animate();
      } else {
        svg.draw(this.canvas, point, reverse);
      }
    });
  };

  declareSteps = (indexRoad, indexStep, showBegin, showEnd, keepShowing) => {
    const road = this.ROADS[indexRoad];
    this.actualPointSubject.pipe(
      withLatestFrom(this.actualRoadSubject),
      filter(values => values[1] === road.id),
      filter(() => !this.automatedRoadAlwaysOn),
      map(values => values[0])
    ).subscribe((point) => {
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

  execute(indexStep) {
    roadStepsData[indexStep].forEach(
      data => this.declareAnimatedLine(
        data.indexRoad,
        data.showBegin,
        data.showEnd,
        data.hideRoad
      ), this
    );
    boxStepsData[indexStep].forEach(
      data => this.declareSteps(
        data.indexRoad,
        indexStep,
        data.showBegin,
        data.showEnd,
        data.keepShowing
      ), this
    );
    animationStepsData[indexStep].forEach(
      data => this.declareAnimatedSVG(
        data.indexRoad,
        data.svg === 'van' ? this.van : this.kapitiBoat,
        data.reverse,
        data.hideBegin,
        data.hideEnd
      )
    );
  }

  automatedRoadGoesOn() {
    this.automatedRoadOn = true;
  }

  automatedRoadAlwaysGoesOn() {
    this.automatedRoadAlwaysOn = true;
  }

  getAutomatedRoadOn() {
    return this.automatedRoadOn;
  }

  getAutomatedRoadAlwaysOn() {
    return this.automatedRoadAlwaysOn;
  }

  setStoppingStep(stoppingStep) {
    this.stoppingStep = stoppingStep;
  }
}
