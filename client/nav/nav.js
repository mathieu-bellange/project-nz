import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav.css';
import OutdatedBrowserService from '../outdated-browser.service';

export default class Nav extends React.Component {
  outdatedBrowserService = new OutdatedBrowserService();
  homeLinkActiveEvent = (match, location) => {
    if (!location) {
      return false;
    }
    return location.pathname !== '/road-trip' && location.pathname !== '/about';
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
                { this.outdatedBrowserService.isOutdated() ? '' : <NavLink to="/road-trip" activeClassName="selected" onClick={() => this.onMenuClose()}>Road Trip</NavLink> }
              </span>
              <span>
                <NavLink to="/about" activeClassName="selected" onClick={() => this.onMenuClose()}>Sur nous</NavLink>
              </span>
          </div>
          </div>
        </nav>
      </div>
    );
  }
}
