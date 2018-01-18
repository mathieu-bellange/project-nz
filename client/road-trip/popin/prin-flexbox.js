import React from 'react';
import PropTypes from 'prop-types';

import ImgWrapper from './img-wrapper';
import TextWrapper from './text-wrapper';
import './prin-flexbox.css';

export default class PrinFlexBox extends React.Component {
  component
  static propTypes = {
    box: PropTypes.object.isRequired,
    onLoad: PropTypes.func,
    fullScreen: PropTypes.bool
  };

  render() {
    return (
      <div className="prin">
        {this.props.box.src ? <ImgWrapper onLoad={this.props.onLoad} img={this.props.box} />
                          : <TextWrapper fullScreen={this.props.fullScreen} box={this.props.box} />}
      </div>
    );
  }
}
