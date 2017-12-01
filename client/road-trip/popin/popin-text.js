import React from 'react';
import PropTypes from 'prop-types';

import PrinFlexBox from './prin-flexbox';

// PLANNING reproduire les modifs de popin
export default class PopinText extends React.Component {
  elem;
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
      end: false
    };
    this.openFullScreen = this.openFullScreen.bind(this);
    this.finishAnimation = this.finishAnimation.bind(this);
    this.closeFullScreen = this.closeFullScreen.bind(this);
  }

  componentDidMount() {
    this.setState({
      offsetLeft: this.elem.offsetLeft,
      offsetTop: this.elem.offsetTop,
      width: `calc(${this.elem.clientWidth}px - 0.6em)`,
      height: `calc(${this.elem.clientHeight}px - 0.4em)`,
      style: {
        width: `calc(${this.elem.clientWidth}px - 0.6em)`,
        height: `calc(${this.elem.clientHeight}px - 0.4em)`,
        top: `calc(${this.elem.offsetTop}px)`,
        left: `calc(${this.elem.offsetLeft}px)`
      }
    });
  }

  openFullScreen() {
    this.setState({
      style: {
        width: this.state.width,
        height: this.state.height
      },
      begin: true,
      animationState: this.animationState.open.begin
    });
  }

  finishAnimation(e) {
    switch (this.state.animationState) {
      case this.animationState.open.begin:
        this.setState({
          style: {},
          end: true,
          animationState: this.animationState.open.end
        });
        break;
      case this.animationState.open.end:
        break;
      case this.animationState.close.begin:
        this.setState({
          style: {
            width: this.state.width,
            height: this.state.height,
            top: this.state.offsetTop,
            left: this.state.offsetLeft
          },
          animationState: this.animationState.close.end
        });
        break;
      case this.animationState.close.end:
        if (e.propertyName === 'top') {
          this.setState({
            begin: false
          });
        }
        break;
      default:
        break;
    }
  }

  closeFullScreen() {
    this.setState({
      style: {
        width: this.state.width,
        height: this.state.height
      },
      animationState: this.animationState.close.begin,
      end: false
    });
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <div
          className={`popin popin-text ${this.state.begin ? 'full-screen' : ''}`}
          ref={(el) => { this.elem = el; }}
          onClick={this.openFullScreen}
        >
          <PrinFlexBox box={this.props.box} />
        </div>
        <div
          style={this.state.style}
          className={`popin popin-text doppleganger ${this.state.begin ? 'full-screen' : ''} ${this.state.end ? ' end' : ' '}`}
          onTransitionEnd={this.finishAnimation}
        >
          <i className="fa fa-times" onClick={this.closeFullScreen}></i>
          <PrinFlexBox box={this.props.box} />
        </div>
      </div>
    );
  }
}
