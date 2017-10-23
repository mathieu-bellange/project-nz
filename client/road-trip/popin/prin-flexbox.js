import React from 'react';
import PropTypes from 'prop-types';

import ImgWrapper from './img-wrapper';
import './prin-flexbox.css';

export default class PrinFlexBox extends React.Component {
  static propTypes = {
    img: PropTypes.object.isRequired,
    onLoad: PropTypes.func
  };

  render() {
    return (
      <div className="prin">
        <ImgWrapper onLoad={this.props.onLoad} img={this.props.img} />
      </div>
    );
  }
}
