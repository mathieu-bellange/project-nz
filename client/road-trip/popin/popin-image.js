import React from 'react';
import PropTypes from 'prop-types';

import './popin-image.css';

export default class PopinImage extends React.Component {
  index = 0;
  static propTypes = {
    box: PropTypes.object.isRequired
  };

  render() {
    return (
        <div className="popin-image">
          <div className="prin">
            <div className="img-wrapper">
              <img src={this.props.box.prin}></img>
            </div>
          </div>
          <div className="secondary">
            <div className="up">
              {
                this.props.box.pictures
                  .filter(picture => picture.up)
                  .map((picture, index) =>
                    <div key={index} className={`img-wrapper ${picture.wide ? 'wide' : ''}`}>
                      <img src={picture.src}></img>
                    </div>)
              }
            </div>
            <div className="down">
              {
                this.props.box.pictures
                  .filter(picture => !picture.up)
                  .map((picture, index) =>
                    <div key={index} className={`img-wrapper ${picture.wide ? 'wide' : ''}`}>
                      <img src={picture.src}></img>
                    </div>)
              }
            </div>
          </div>
        </div>
    );
  }
}
