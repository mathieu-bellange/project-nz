import React from 'react';
import PropTypes from 'prop-types';

import './popin-overview.css';

export default class Popin extends React.Component {
  elem;
  static propTypes = {
    box: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool,
    className: PropTypes.string,
    overviewLoaded: PropTypes.func,
    openFullScreen: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.overviewLoaded({
      offsetLeft: this.elem.offsetLeft,
      offsetTop: this.elem.offsetTop,
      width: `calc(${this.elem.clientWidth}px - 0.6em)`,
      height: `calc(${this.elem.clientHeight}px - 0.4em)`
    });
  }

  render() {
    return (
        <div
          ref={(el) => { this.elem = el; }}
          onClick={this.props.openFullScreen}
          className={`${this.props.className} popin-overview ${this.props.fullScreen ? 'full-screen' : ''}`}
        >
        </div>
    );
  }
}
