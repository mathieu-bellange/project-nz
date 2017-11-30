import React from 'react';
import { NavLink } from 'react-router-dom';


import './nav.css';

// BACKLOG remonter tout en haut du DOM le menu de navigation
export default class Nav extends React.Component {
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
                <NavLink exact to="/" activeClassName="selected" onClick={() => this.onMobileMenuClose()}>Accueil</NavLink>
              </span>
              <span>
                <NavLink to="/road-trip" activeClassName="selected" onClick={() => this.onMobileMenuClose()}>Road Trip</NavLink>
              </span>
              <span>
                <NavLink to="/about" activeClassName="selected" onClick={() => this.onMobileMenuClose()}>Sur nous</NavLink>
              </span>
          </div>
          </div>
        </nav>
      </div>
    );
  }
}
