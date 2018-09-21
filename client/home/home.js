import React from 'react';
import { Link } from 'react-router-dom';

import { ScenarioService } from '../road-trip';
import './home.sss';
import home from './home.md';
import OutdatedBrowserInfo from './outdatedBrowsers-info';
import OutdatedBrowserService from '../outdated-browser.service';

export default class Home extends React.Component {
  scenarioService = new ScenarioService();

  outdatedBrowserService = new OutdatedBrowserService();

  createMarkup = () => ({ __html: home });

  constructor(props) {
    super(props);
    this.createMarkup = this.createMarkup.bind(this);
    this.alreadyOnTheRoad = this.scenarioService.getCurrentStep() > 0;
  }

  render() {
    return (
      <div id="home">
        <div className="home-wrapper">
          <header dangerouslySetInnerHTML={this.createMarkup()}></header>
          <OutdatedBrowserInfo></OutdatedBrowserInfo>
          <div id="content">
            { this.outdatedBrowserService.isOutdated() ? '' : <Link to="/journal-de-bord">{this.alreadyOnTheRoad ? 'Continuer' : 'Commencer'} le voyage</Link> }
          </div>
        </div>
      </div>
    );
  }
}
