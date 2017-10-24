import React from 'react';
import PropTypes from 'prop-types';

import ImgWrapper from './img-wrapper';
import TextWrapper from './text-wrapper';
import './prin-flexbox.css';

export default class PrinFlexBox extends React.Component {
  component
  static propTypes = {
    box: PropTypes.object.isRequired,
    onLoad: PropTypes.func
  };

  constructor(props) {
    super(props);
    if (props.box.src) {
      this.component = <ImgWrapper onLoad={props.onLoad} img={props.box} />;
    } else {
      this.component = <TextWrapper box={props.box} />;
    }
  }

  render() {
    return (
      <div className="prin">
        {this.component}
      </div>
    );
  }
}
