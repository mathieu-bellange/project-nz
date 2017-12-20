export default class ScenarioService {
  CURRENT_SCENARIO_TOKEN = 'currentScenario';
  CURRENT_STEP_TOKEN = 'currentStep';

  saveCurrentScenario(indexScenario) {
    localStorage.setItem(this.CURRENT_SCENARIO_TOKEN, indexScenario);
  }

  getCurrentScenario() {
    return localStorage.getItem(this.CURRENT_SCENARIO_TOKEN) || 0;
  }

  saveCurrentStep(indexStep) {
    localStorage.setItem(this.CURRENT_STEP_TOKEN, indexStep);
  }

  getCurrentStep() {
    return localStorage.getItem(this.CURRENT_STEP_TOKEN) || 0;
  }
}
