import React from 'react';
import { Link } from 'react-router-dom';

import { ScenarioService } from '../road-trip';
import './home.css';
import home from './home.md';

export default class Home extends React.Component {
  scenarioService = new ScenarioService();
  isIE = !!document.documentMode;

  constructor(props) {
    super(props);
    this.createMarkup = this.createMarkup.bind(this);
    this.alreadyOnTheRoad = this.scenarioService.getCurrentStep() > 0 || this.scenarioService.getCurrentScenario() > 0;
  }

  createMarkup() {
    return { __html: home };
  }

  render() {
    return (
      <div id="home">
        <div className="home-wrapper">
          <header dangerouslySetInnerHTML={this.createMarkup()}></header>
          <div id="content">
            { this.isIE ? '' : <Link to="/road-trip">{this.alreadyOnTheRoad ? 'Continuer' : 'Commencer'} le voyage</Link> }
          </div>
        </div>
      </div>
    );
  }
}
