import React from 'react';

import './about.css';

export default class About extends React.Component {
  render() {
    return (
      <main id="about">
          <div className="container">
            <div className="inner-container">
              <h1>Notre voyage</h1>
              <p>Une explication de notre votyage quoi. Les détails, pourquoi, comment....</p>
            </div>
            <div className="inner-container">
              <img src="images/our-trip.jpg"></img>
            </div>
          </div>
          <div className="container">
            <div className="inner-container">
              <h1>Sur nous</h1>
              <p>Qui nous sommes, description de notre petite famille</p>
            </div>
            <div className="inner-container about-us">
              <img src="images/about-us.jpg"></img>
            </div>
          </div>
          <div className="container clear-fix">
            <div className="inner-container">
              <h1>Sur le site</h1>
              <p>Qui l'a fait comment, mise à jour....</p>
            </div>
            <div className="inner-container">
              <img src="images/about-website.jpg"></img>
            </div>
          </div>
      </main>
    );
  }
}
