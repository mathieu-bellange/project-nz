import React from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs/Observable';
import SVG from 'svg.js';

import PrinFlexBox from './prin-flexbox';
import SecondaryFlexBox from './secondary-flexbox';
import * as Boxes from '../boxes';

export default class Popin extends React.Component {
  elem;
  clazz;
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
      end: false,
      fullScreen: false
    };
    switch (props.box.type) {
      case Boxes.Type.Text:
        this.clazz = 'popin-text';
        break;
      case Boxes.Type.Picture:
        this.clazz = 'popin-image';
        break;
      case Boxes.Type.Mixed:
        this.clazz = 'popin-mixed';
        break;
      default:
        this.clazz = '';
    }
    this.openFullScreen = this.openFullScreen.bind(this);
    this.finishAnimation = this.finishAnimation.bind(this);
    this.closeFullScreen = this.closeFullScreen.bind(this);
    this.prinLoaded = this.prinLoaded.bind(this);
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
    const draw = SVG(`close-${this.props.box.id}`).size(29, 29);
    draw.image('/images/close.svg', 29, 29);
  }

  componentWillUnmount() {
    this.wheelSub.unsubscribe();
  }

  prinLoaded() {
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
    if (e.propertyName === 'top' || e.propertyName === 'width') {
      switch (this.state.animationState) {
        case this.animationState.open.begin:
          this.setState({
            style: {},
            end: true,
            animationState: this.animationState.open.end,
            fullScreen: true
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
            animationState: this.animationState.close.end,
            fullScreen: false
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
      <div style={this.props.box.type === Boxes.Type.Mixed ? { width: '100%', height: '100%' } : { width: '100%' }}>
        <div
          ref={(el) => { this.elem = el; }}
          className={`popin ${this.clazz} ${this.state.begin ? 'full-screen' : ''}`}
          onClick={this.openFullScreen}
        >
          <PrinFlexBox
            fullScreen={this.state.fullScreen}
            onLoad={this.prinLoaded}
            box={this.props.box.pictures[0].prin}
          />
          <SecondaryFlexBox images={this.props.box.pictures[0].secondary.sources}/>
        </div>
        <div
          id={this.props.box.id}
          style={this.state.style}
          className={`popin ${this.clazz} doppleganger
            ${this.state.begin ? ' full-screen' : ' '}
            ${this.state.end ? ' end' : ' '}`}
          onTransitionEnd={this.finishAnimation}
          ref={(el) => { this.doppleganger = el; }}
        >
          <div id={`close-${this.props.box.id}`} className={`closed-icon ${this.state.fixedCloseIcon ? 'fixed' : ''}`} onClick={this.closeFullScreen}>
          </div>
          {
            this.props.box.pictures
              .map(picture =>
                  <div key={picture.id} onTransitionEnd={e => e.stopPropagation()}>
                    <PrinFlexBox fullScreen={this.state.fullScreen} box={picture.prin} />
                    <SecondaryFlexBox images={picture.secondary.sources}/>
                  </div>)
          }
        </div>
      </div>
    );
  }
}
