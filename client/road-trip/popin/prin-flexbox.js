import React from 'react';
import PropTypes from 'prop-types';

import ImgWrapper from './img-wrapper';
import TextWrapper from './text-wrapper';
import './prin-flexbox.css';

export default class PrinFlexBox extends React.Component {
  static propTypes = {
    box: PropTypes.object.isRequired,
    onLoad: PropTypes.func,
    fullScreen: PropTypes.bool,
    mixed: PropTypes.bool
  };

  render() {
    return (
      <div className="prin">
        {this.props.box.src ? <ImgWrapper fullScreen={this.props.fullScreen} className="prin" onLoad={this.props.onLoad} img={this.props.box} />
                          : <TextWrapper mixed={this.props.mixed} fullScreen={this.props.fullScreen} box={this.props.box} />}
      </div>
    );
  }
}
