import React from 'react';

import './about.css';
import ourTrip from './our-trip.md';
import us from './us.md';
import webSite from './web-site.md';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.createMarkup = this.createOurTripMarkup.bind(this);
    this.createMarkup = this.createUsMarkup.bind(this);
    this.createMarkup = this.createWebSiteMarkup.bind(this);
  }

  createOurTripMarkup() {
    return { __html: ourTrip };
  }

  createUsMarkup() {
    return { __html: us };
  }

  createWebSiteMarkup() {
    return { __html: webSite };
  }

  render() {
    return (
      <div id="about">
          <div className="container">
            <div className="inner-container" dangerouslySetInnerHTML={this.createOurTripMarkup()}>
            </div>
            <div className="inner-container">
              <img src="images/our-trip.jpg"></img>
            </div>
          </div>
          <div className="container">
            <div className="inner-container" dangerouslySetInnerHTML={this.createUsMarkup()}>
            </div>
            <div className="inner-container about-us">
              <img src="images/about-us.jpg"></img>
            </div>
          </div>
          <div className="container clear-fix">
            <div className="inner-container" dangerouslySetInnerHTML={this.createWebSiteMarkup()}>
            </div>
            <div className="inner-container">
              <img src="images/about-website.jpg"></img>
            </div>
          </div>
      </div>
    );
  }
}
