import * as NorthIsland from './north-island';

export default class Scenario {
  listScenario = [];

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject, onRoadAgainSubject) {
    this.listScenario.push(new NorthIsland.FirstMonthScenario(canvas, pixelRatio, actualPointSubject, actualBoxesSubject, onRoadAgainSubject));
  }

  // BACKLOG jouer tous les scénario entre l'index 0 du tableau et l'index demandé par l'appelant trello:#73
  launch(step) {
    this.listScenario[0].launch(step);
  }

  nextStep() {
    this.listScenario[0].nextStep();
  }
}
