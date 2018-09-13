export default class ScenarioService {
  CURRENT_SCENARIO_TOKEN = 'currentScenario';

  CURRENT_STEP_TOKEN = 'currentStep';

  saveCurrentScenario(indexScenario) {
    localStorage.setItem(this.CURRENT_SCENARIO_TOKEN, indexScenario);
  }

  getCurrentScenario() {
    const indexScenario = localStorage.getItem(this.CURRENT_SCENARIO_TOKEN) || 0;
    return Number(indexScenario);
  }

  saveCurrentStep(indexStep) {
    localStorage.setItem(this.CURRENT_STEP_TOKEN, indexStep);
  }

  getCurrentStep() {
    const indexStep = localStorage.getItem(this.CURRENT_STEP_TOKEN) || 0;
    return Number(indexStep);
  }
}
