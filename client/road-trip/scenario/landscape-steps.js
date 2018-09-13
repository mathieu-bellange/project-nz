import {
  filter
} from 'rxjs/operators';

import landscapeStepsData from './landscape-steps.data.json';
import buildCoastlines from './coastline-markers';
import buildCity from './city-markers';
import buildDecors from './decor-markers';

export default class LandscapeSteps {
  constructor(nextStepSubject, canvas, pixelRatio) {
    this.nextStepSubject = nextStepSubject;
    this.canvas = canvas;
    this.pixelRatio = pixelRatio;
    this.COASTLINES = buildCoastlines(pixelRatio);
    this.CITIES = buildCity(pixelRatio);
    this.DECORS = buildDecors(pixelRatio);
  }

  declareDecorsGenerator = (indexStep, indexDecor) => {
    const sub = this.nextStepSubject.pipe(filter(step => step === indexStep)).subscribe(() => {
      this.DECORS[indexDecor].forEach((decor) => {
        decor.draw(this.canvas).animate();
      }, this);
      sub.unsubscribe();
    });
  };

  declareCoastlineGenerator = (indexStep, indexCoastline) => {
    const sub = this.nextStepSubject.pipe(filter(step => step === indexStep)).subscribe(() => {
      this.COASTLINES[indexCoastline].forEach((coastLine) => {
        coastLine.draw(this.canvas).animate();
      }, this);
      sub.unsubscribe();
    });
  };

  declareCitiesGenerator = (indexStep, indexCities) => {
    const sub = this.nextStepSubject.pipe(filter(step => step === indexStep)).subscribe(() => {
      this.CITIES[indexCities].forEach((city) => {
        city.draw(this.canvas).animate();
      }, this);
      sub.unsubscribe();
    });
  };

  execute(indexStep) {
    const step = landscapeStepsData[indexStep];
    step.cities.forEach(city => this.declareCitiesGenerator(indexStep, city), this);
    step.coastlines.forEach(city => this.declareCoastlineGenerator(indexStep, city), this);
    step.decors.forEach(city => this.declareDecorsGenerator(indexStep, city), this);
  }
}
