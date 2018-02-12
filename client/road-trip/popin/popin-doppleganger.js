import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'svg.js';

import './popin-doppleganger.css';

export default class PopinDoppleganger extends React.Component {
  static propTypes = {
    box: PropTypes.object.isRequired,
    positioned: PropTypes.bool,
    scaled: PropTypes.bool,
    fullScreen: PropTypes.bool,
    fixedCloseIcon: PropTypes.bool,
    closeFullScreen: PropTypes.func.isRequired,
    onTransitionEnd: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.closeFullScreen = this.closeFullScreen.bind(this);
  }

  componentDidMount() {
    const draw = SVG(`close-${this.props.box.id}`).size(29, 29);
    draw.image('/images/close.svg', 29, 29);
  }

  closeFullScreen() {
    this.props.closeFullScreen();
    if (this.elem.scroll) {
      this.elem.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }


  render() {
    return (
      <div
        id={this.props.box.id}
        className={`${this.props.className} doppleganger ${this.props.fullScreen ? 'show' : ''} ${this.props.positioned ? 'full-screen' : ''} ${this.props.scaled ? 'end' : ''}`}
        style={this.props.style}
        onTransitionEnd={this.props.onTransitionEnd}
        ref={(el) => { this.elem = el; }}
      >
        <div id={`close-${this.props.box.id}`} className={`closed-icon ${this.props.fixedCloseIcon ? 'fixed' : ''}`} onClick={this.closeFullScreen}>
        </div>
      </div>
    );
  }
}
