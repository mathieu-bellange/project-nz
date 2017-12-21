import ScenarioService from './scenario.service';
import FirstMonthScenario from './first-month-scenario';

export default class Scenarios {
  listScenario = [];
  scenarioService;

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject, onRoadAgainSubject, hasPreviousSubject, hasNextSubject) {
    this.scenarioService = new ScenarioService();
    this.listScenario.push(new FirstMonthScenario(canvas, pixelRatio, actualPointSubject, actualBoxesSubject, onRoadAgainSubject, hasPreviousSubject, hasNextSubject));
  }

  // TODO jouer tous les scénario entre l'index 0 du tableau et l'index demandé par l'appelant trello:#73
  // DONE récupérer le point de départ du système de sauvegarde mis en place et l'injecter dans le scenario trello:#73
  // DONE récupérer le bon scenario suivant le point de sauvegarde trello:#73
  launch() {
    this.listScenario[this.scenarioService.getCurrentScenario()].launch();
  }

  nextStep() {
    this.listScenario[this.scenarioService.getCurrentScenario()].nextStep();
  }

  previousStep() {
    this.listScenario[this.scenarioService.getCurrentScenario()].previousStep();
  }
}
