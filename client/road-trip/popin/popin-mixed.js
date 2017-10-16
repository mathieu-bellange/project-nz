import React from 'react';
import PropTypes from 'prop-types';

import './popin-mixed.css';

export default class PopinMixed extends React.Component {
  index = 0;
  static propTypes = {
    pictures: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  };

  render() {
    return (
        <div className="popin-mixed">
          <div className="prin">
            <h2>{this.props.title}</h2>
            <p>{this.props.text}</p>
          </div>
          <div className="secondary">
            <div className="up">
              {
                this.props.pictures
                  .filter(picture => picture.up)
                  .map((picture, index) =>
                    <div key={index} className="img-wrapper">
                      <img src={picture.src}></img>
                    </div>)
              }
            </div>
            <div className="down">
              {
                this.props.pictures
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
