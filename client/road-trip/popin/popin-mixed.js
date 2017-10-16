import React from 'react';
import PropTypes from 'prop-types';

import './popin-mixed.css';

export default class PopinMixed extends React.Component {
  index = 0;
  static propTypes = {
    box: PropTypes.object.isRequired
  };

  render() {
    return (
        <div className="popin-mixed">
          <div className="prin">
            <h2>{this.props.box.title}</h2>
            <p>{this.props.box.text}</p>
          </div>
          <div className="secondary">
            <div className="up">
              {
                this.props.box.pictures
                  .filter(picture => picture.up)
                  .map((picture, index) =>
                    <div key={index} className="img-wrapper">
                      <img src={picture.src}></img>
                    </div>)
              }
            </div>
            <div className="down">
              {
                this.props.box.pictures
                  .filter(picture => !picture.up)
                  .map((picture, index) =>
                    <div key={index} className="img-wrapper">
                      <img src={picture.src}></img>
                    </div>)
              }
            </div>
          </div>
        </div>
    );
  }
}
