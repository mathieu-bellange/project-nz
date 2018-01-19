import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

import home from './home.md';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.createMarkup = this.createMarkup.bind(this);
  }

  createMarkup() {
    return { __html: home };
  }

  render() {
    return (
      <main id="home">
        <header dangerouslySetInnerHTML={this.createMarkup()}></header>
        <div id="content">
          <img src="images/home_1920.jpg"></img>
          <Link to="/road-trip">Commencer le voyage</Link>
        </div>
      </main>
    );
  }
}
