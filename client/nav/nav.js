import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './nav.css';
import OutdatedBrowserService from '../outdated-browser.service';

export default class Nav extends React.Component {
  outdatedBrowserService = new OutdatedBrowserService();

  homeLinkActiveEvent = (match, location) => {
    if (!location) {
      return false;
    }
    return location.pathname !== '/journal-de-bord' && location.pathname !== '/sur-nous';
  }

  constructor() {
    super();
    this.state = {
      displayMenu: false
    };
  }

  onMenuOpen() {
    this.setState({
      displayMenu: !this.state.displayMenu
    });
  }

  onMenuClose() {
    this.setState({
      displayMenu: false
    });
  }

  render() {
    return (
      <div id="nav-wrapper" className={ this.state.displayMenu ? 'show' : ''}>
        <nav>
          <div id="menu">
            <div id="int" className={ this.state.displayMenu ? 'show' : ''}>
              <FontAwesomeIcon icon={`${this.state.displayMenu ? 'times' : 'bars'}`} onClick={() => this.onMenuOpen()} />
              <span>
                <NavLink isActive={this.homeLinkActiveEvent} to="/" activeClassName="selected" onClick={() => this.onMenuClose()}>Accueil</NavLink>
              </span>
              <span>
                { this.outdatedBrowserService.isOutdated() ? '' : <NavLink to="/journal-de-bord" activeClassName="selected" onClick={() => this.onMenuClose()}>Journal de bord</NavLink> }
              </span>
              <span>
                <NavLink to="/sur-nous" activeClassName="selected" onClick={() => this.onMenuClose()}>Sur nous</NavLink>
              </span>
          </div>
          </div>
        </nav>
      </div>
    );
  }
}
