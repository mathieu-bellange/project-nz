export default class ScenarioService {
  CURRENT_STEP_TOKEN = 'currentStep';

  saveCurrentStep(indexStep) {
    localStorage.setItem(this.CURRENT_STEP_TOKEN, indexStep);
  }

  getCurrentStep() {
    return Number(localStorage.getItem(this.CURRENT_STEP_TOKEN) || 0);
  }
}
