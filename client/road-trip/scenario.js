import * as NorthIsland from './north-island';
import ScenarioService from './scenario.service';

export default class Scenario {
  listScenario = [];
  scenarioService;

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject, onRoadAgainSubject, hasPreviousSubject, hasNextSubject) {
    this.scenarioService = new ScenarioService();
    this.listScenario.push(new NorthIsland.FirstMonthScenario(canvas, pixelRatio, actualPointSubject, actualBoxesSubject, onRoadAgainSubject, hasPreviousSubject, hasNextSubject));
  }

  // TODO jouer tous les scénario entre l'index 0 du tableau et l'index demandé par l'appelant trello:#73
  // DONE récupérer le point de départ du système de sauvegarde mis en place et l'injecter dans le scenario trello:#73
  // DONE récupérer le bon scenario suivant le point de sauvegarde trello:#73
  launch() {
    this.listScenario[this.scenarioService.getCurrentScenario()]
      .launch(this.scenarioService.getCurrentStep());
  }

  // DOING sauvegarde du step courrant trello:#73
  nextStep() {
    const currentStep = this.listScenario[this.scenarioService.getCurrentScenario()].nextStep();
    this.scenarioService.saveCurrentStep(currentStep);
  }

  previousStep() {
    const currentStep = this.listScenario[this.scenarioService.getCurrentScenario()].previousStep();
    this.scenarioService.saveCurrentStep(currentStep);
  }
}
