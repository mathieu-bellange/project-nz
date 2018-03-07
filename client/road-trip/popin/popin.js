import React from 'react';
import PropTypes from 'prop-types';

import './popin.css';
import PopinOverview from './popin-overview';
import PopinDoppleganger from './popin-doppleganger';
import { Type } from '../boxes';

export default class Popin extends React.Component {
  animationState = {
    open: {
      begin: 'openBegin',
      end: 'openEnd'
    },
    close: {
      begin: 'closeBegin',
      end: 'closeEnd'
    }
  };

  static propTypes = {
    box: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      begin: false,
      end: false,
      fullScreen: false,
      dopplegangerStyle: {}
    };
    this.openFullScreen = this.openFullScreen.bind(this);
    this.closeFullScreen = this.closeFullScreen.bind(this);
    this.overviewLoaded = this.overviewLoaded.bind(this);
    this.finishAnimation = this.finishAnimation.bind(this);
  }

  openFullScreen() {
    const isEdge = !!window.StyleMedia;
    if (isEdge) {
      this.setState({
        fullScreen: true,
        positioned: true,
        scaled: true,
        fixedCloseIcon: true,
        dopplegangerStyle: {}
      });
    } else {
      this.setState({
        dopplegangerStyle: {
          width: this.state.width,
          height: this.state.height
        },
        fullScreen: true,
        positioned: true,
        animationState: this.animationState.open.begin
      });
    }
  }

  closeFullScreen() {
    const isEdge = !!window.StyleMedia;
    if (isEdge) {
      this.setState({
        fullScreen: false,
        positioned: false,
        scaled: false,
        fixedCloseIcon: false,
        dopplegangerStyle: {
          width: this.state.width,
          height: this.state.height,
          top: this.state.offsetTop,
          left: this.state.offsetLeft
        }
      });
    } else {
      this.setState({
        dopplegangerStyle: {
          width: this.state.width,
          height: this.state.height
        },
        animationState: this.animationState.close.begin,
        fixedCloseIcon: false,
        scaled: false
      });
    }
  }

  overviewLoaded(styleInfo) {
    this.setState({
      offsetLeft: styleInfo.offsetLeft,
      offsetTop: styleInfo.offsetTop,
      width: styleInfo.width,
      height: styleInfo.height,
      dopplegangerStyle: {
        width: styleInfo.width,
        height: styleInfo.height,
        top: styleInfo.offsetTop,
        left: styleInfo.offsetLeft
      }
    });
  }

  finishAnimation(e) {
    if (e.propertyName === 'top' || e.propertyName === 'width') {
      switch (this.state.animationState) {
        case this.animationState.open.begin:
          this.setState({
            dopplegangerStyle: {},
            animationState: this.animationState.open.end,
            scaled: true
          });
          break;
        case this.animationState.open.end:
          this.setState({
            fixedCloseIcon: true
          });
          break;
        case this.animationState.close.begin:
          this.setState({
            dopplegangerStyle: {
              width: this.state.width,
              height: this.state.height,
              top: this.state.offsetTop,
              left: this.state.offsetLeft
            },
            animationState: this.animationState.close.end,
            positioned: false
          });
          break;
        case this.animationState.close.end:
          this.setState({
            fullScreen: false
          });
          break;
        default:
          break;
      }
    }
  }

  render() {
    return (
      <div className={`popin-manager ${this.props.box.type === Type.Picture ? '' : 'text'} ${this.props.box.position !== undefined ? '' : 'alone'}`}>
        <PopinOverview
          className={`popin ${this.props.box.type === Type.Text ? 'text' : ''}`}
          fullScreen={this.state.fullScreen}
          box={this.props.box}
          overviewLoaded={this.overviewLoaded}
          openFullScreen={this.openFullScreen}
        />
        <PopinDoppleganger
          className={`popin ${this.props.box.type === Type.Text ? 'text' : ''}`}
          positioned={this.state.positioned}
          scaled={this.state.scaled}
          fullScreen={this.state.fullScreen}
          fixedCloseIcon={this.state.fixedCloseIcon}
          box={this.props.box}
          closeFullScreen={this.closeFullScreen}
          style={this.state.dopplegangerStyle}
          onTransitionEnd={this.finishAnimation}
        />
      </div>
    );
  }
}
