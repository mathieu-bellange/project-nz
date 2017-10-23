import React from 'react';
import PropTypes from 'prop-types';

import ImgWrapper from './img-wrapper';
import './secondary-flexbox.css';

export default class SecondaryFlexBox extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="secondary">
        <div className="up">
          {
            this.props.images[0]
              .map(upPic => <ImgWrapper key={upPic.id} img={upPic} />)
          }
        </div>
        <div className="down">
          {
            this.props.images[1]
              .map(dnPic => <ImgWrapper key={dnPic.id} img={dnPic} />)
          }
        </div>
      </div>
    );
  }
}
