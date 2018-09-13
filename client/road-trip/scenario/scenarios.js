import ScenarioService from './scenario.service';
import FirstMonthScenario from './first-month-scenario';

export default class Scenarios {
  listScenario = [];

  scenarioService;

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
    this.scenarioService = new ScenarioService();
    this.listScenario.push(new FirstMonthScenario(
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
    ));
  }

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
