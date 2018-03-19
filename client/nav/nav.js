import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav.css';
import OutdatedBrowserService from '../outdated-browser.service';
import path from './path';

export default class Nav extends React.Component {
  outdatedBrowserService = new OutdatedBrowserService();
  homeLinkActiveEvent = (match, location) => {
    if (!location) {
      return false;
    }
    return location.pathname !== path.roadTrip && location.pathname !== path.about;
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
              <i className={`fa ${this.state.displayMenu ? 'fa-times' : 'fa-bars'}`} onClick={() => this.onMenuOpen()}></i>
              <span>
                <NavLink isActive={this.homeLinkActiveEvent} to="/" activeClassName="selected" onClick={() => this.onMenuClose()}>Accueil</NavLink>
              </span>
              <span>
                { this.outdatedBrowserService.isOutdated() ? '' : <NavLink to={path.roadTrip} activeClassName="selected" onClick={() => this.onMenuClose()}>Journal de bord</NavLink> }
              </span>
              <span>
                <NavLink to={path.about} activeClassName="selected" onClick={() => this.onMenuClose()}>Sur nous</NavLink>
              </span>
          </div>
          </div>
        </nav>
      </div>
    );
  }
}
