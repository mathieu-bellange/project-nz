// DONE refacto la class pour supprimer la notion de scenario, on ne conserve que l'étape trello:#126
export default class ScenarioService {
  CURRENT_STEP_TOKEN = 'currentStep';

  saveCurrentStep(indexStep) {
    localStorage.setItem(this.CURRENT_STEP_TOKEN, indexStep);
  }

  getCurrentStep() {
    return Number(localStorage.getItem(this.CURRENT_STEP_TOKEN) || 0);
  }
}
