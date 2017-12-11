import React from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs/Observable';

import PrinFlexBox from './prin-flexbox';

// PLANNING modifier l'affichage d'une popin sous mobile trello:#34
export default class PopinText extends React.Component {
  elem;
  doppleganger;
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
    this.wheelSub = Observable.fromEvent(document.getElementById(this.props.box.id), 'wheel').subscribe((event) => {
      event.stopPropagation();
    });
  }

  componentWillUnmount() {
    this.wheelSub.unsubscribe();
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
    if (e.propertyName === 'top' || e.propertyName === 'width') {
      switch (this.state.animationState) {
        case this.animationState.open.begin:
          this.setState({
            style: {},
            end: true,
            animationState: this.animationState.open.end
          });
          break;
        case this.animationState.open.end:
          this.setState({
            fixedCloseIcon: true
          });
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
          this.setState({
            begin: false
          });
          break;
        default:
          break;
      }
    }
  }

  closeFullScreen() {
    this.setState({
      style: {
        width: this.state.width,
        height: this.state.height
      },
      animationState: this.animationState.close.begin,
      end: false,
      fixedCloseIcon: false
    });
    // FIXME corriger le smooth scroll sous firefox trello:#78
    if (this.doppleganger.scroll) {
      this.doppleganger.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
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
          id={this.props.box.id}
          style={this.state.style}
          className={`popin popin-text doppleganger
            ${this.state.begin ? 'full-screen' : ''}
            ${this.state.end ? ' end' : ' '}`}
          onTransitionEnd={this.finishAnimation}
          ref={(el) => { this.doppleganger = el; }}
        >
          <i className={`fa fa-times ${this.state.fixedCloseIcon ? 'fixed' : ''}`} onClick={this.closeFullScreen}></i>
          <PrinFlexBox box={this.props.box} onTransitionEnd={e => e.stopPropagation()}/>
        </div>
      </div>
    );
  }
}
