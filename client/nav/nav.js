import React from 'react';
import { NavLink } from 'react-router-dom';


import './nav.css';

export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMenuOnMobile: false
    };
  }

  onMobileMenuClicked() {
    this.setState({
      displayMenuOnMobile: true
    });
  }

  onMobileMenuClose() {
    this.setState({
      displayMenuOnMobile: false
    });
  }

  render() {
    return (
      <div id="nav-wrapper">
        <i className="fa fa-2x fa-bars" onClick={() => this.onMobileMenuClicked()}></i>
        <div id="nav-displayer" className={ this.state.displayMenuOnMobile ? 'show' : ''}>
          <i className="fa fa-2x fa-times" onClick={() => this.onMobileMenuClose()}></i>
          <nav>
            <ul>
              <li><NavLink exact to="/" activeClassName="selected" onClick={() => this.onMobileMenuClose()}>Accueil</NavLink></li>
              <li><NavLink to="/road-trip" activeClassName="selected" onClick={() => this.onMobileMenuClose()}>Road Trip</NavLink></li>
              <li><NavLink to="/about" activeClassName="selected" onClick={() => this.onMobileMenuClose()}>Sur nous</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
