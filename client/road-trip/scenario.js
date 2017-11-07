import * as NorthIsland from './north-island';

export default class Scenario {
  listScenario = [];

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject) {
    this.listScenario.push(new NorthIsland.FirstMonthScenario(canvas, pixelRatio, actualPointSubject, actualBoxesSubject));
  }

  launch(step) {
    this.listScenario[0].launch(step);
  }
}
