import React from 'react';

import './outdatedBrowsers-info.sss';
import OutdatedBrowserService from '../outdated-browser.service';

export default class OutdatedBrowserInfo extends React.Component {
  outdatedBrowserService = new OutdatedBrowserService();

  constructor(props) {
    super(props);
    this.state = {
      closed: false
    };
    this.onClosed = this.onClosed.bind(this);
  }

  onClosed() {
    this.setState({ closed: true });
  }

  render() {
    return (
      <div className={`outdated-browsers-info ${this.state.closed ? 'closed' : ''} ${this.outdatedBrowserService.isOutdated() ? '' : 'hidden'}`}>
        <i className={`fa fa-times ${this.state.closed ? 'closed' : ''}`} onClick={() => this.onClosed()}></i>
        <div className={`content ${this.state.closed ? 'closed' : ''}`}>
          <div className="info-wrapper">
            <h1>Navigateur obsolète</h1>
            <p>Votre navigateur est obsolète et ne permet pas la consultation complète du site. La principale fonctionnalité demande un navigateur moderne, vous pouvez installer un navigateur plus récent comme <a href="https://www.mozilla.org/fr/firefox/new/">Mozilla Firefox</a> ou <a href="https://www.brave.com/download/">Brave</a></p>
          </div>
        </div>
      </div>
    );
  }
}
