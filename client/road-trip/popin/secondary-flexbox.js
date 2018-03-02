import React from 'react';
import PropTypes from 'prop-types';

import ImgWrapper from './img-wrapper';
import './secondary-flexbox.css';

export default class SecondaryFlexBox extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onLoad: PropTypes.func,
    fullScreen: PropTypes.bool,
    break: PropTypes.bool
  };

  render() {
    return (
      <div className="secondary">
        <div className={`up ${this.props.break ? 'break' : ''}`}>
          {
            this.props.images[0]
              .map((upPic, index) => <ImgWrapper className={`up ${index === 1 ? 'last' : ''}`} fullScreen={this.props.fullScreen} key={upPic.id} onLoad={this.props.onLoad} img={upPic} />)
          }
        </div>
        <div className={`dn ${this.props.break ? 'break' : ''}`}>
          {
            this.props.images[1]
              .map((dnPic, index) => <ImgWrapper className={`dn ${index === 1 ? 'last' : ''}`} fullScreen={this.props.fullScreen} key={dnPic.id} onLoad={this.props.onLoad} img={dnPic} />)
          }
        </div>
      </div>
    );
  }
}
