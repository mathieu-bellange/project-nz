import React from 'react';
import PropTypes from 'prop-types';

import './popin-image.css';

export default class PopinImage extends React.Component {
  elem;
  secondUpElem;
  secondDownElem;
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
    this.prinLoaded = this.prinLoaded.bind(this);
  }

  prinLoaded() {
    this.setState({
      offsetLeft: this.elem.offsetLeft,
      offsetTop: this.elem.offsetTop,
      width: `calc(${this.elem.clientWidth}px - 0.6em)`,
      height: `calc(${this.elem.clientHeight}px - 0.4em)`,
      secondUpStyle: {
        minHeight: `calc(${this.secondUpElem.clientHeight}px)`
      },
      secondDownStyle: {
        minHeight: `calc(${this.secondDownElem.clientHeight}px)`
      },
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
          ref={(el) => { this.elem = el; }}
          className={`popin-image ${this.state.begin ? 'full-screen' : ''}`}
          onClick={this.openFullScreen}
        >
          <div className="prin">
            <div className="img-wrapper">
              <img onLoad={this.prinLoaded} src={this.props.box.prin}></img>
            </div>
          </div>
          <div className="secondary">
            <div ref={(el) => { this.secondUpElem = el; }} className="up">
              {
                this.props.box.pictures
                  .filter(picture => picture.up)
                  .map((picture, index) =>
                    <div key={index} className={`img-wrapper ${picture.wide ? 'wide' : ''}`}>
                      <img src={picture.src}></img>
                    </div>)
              }
            </div>
            <div ref={(el) => { this.secondDownElem = el; }} className="down">
              {
                this.props.box.pictures
                  .filter(picture => !picture.up)
                  .map((picture, index) =>
                    <div key={index} className={`img-wrapper ${picture.wide ? 'wide' : ''}`}>
                      <img src={picture.src}></img>
                    </div>)
              }
            </div>
          </div>
        </div>
        <div
          style={this.state.style}
          className={`popin-image doppleganger
            ${this.state.begin ? ' full-screen' : ' '}
            ${this.state.end ? ' end' : ' '}
          `}
          onTransitionEnd={this.finishAnimation}
        >
          <i className="fa fa-times" onClick={this.closeFullScreen}></i>
          <div className="prin-wrapper">
            <div className="prin">
              <div className="img-wrapper">
                <img src={this.props.box.prin}></img>
              </div>
            </div>
            <div className="secondary">
              <div className="up">
                {
                  this.props.box.pictures
                    .filter(picture => picture.up)
                    .map((picture, index) =>
                      <div key={index} className={`img-wrapper ${picture.wide ? 'wide' : ''}`}>
                        <img src={picture.src}></img>
                      </div>)
                }
              </div>
              <div className="down">
                {
                  this.props.box.pictures
                    .filter(picture => !picture.up)
                    .map((picture, index) =>
                      <div key={index} className={`img-wrapper ${picture.wide ? 'wide' : ''}`}>
                        <img src={picture.src}></img>
                      </div>)
                }
              </div>
            </div>
          </div>
          <div>
            <div className="secondary">
              <div style={this.state.secondUpStyle} className="up">
                {
                  this.props.box.pictures
                  .filter(picture => picture.up)
                  .map((picture, index) =>
                  <div key={index} className={`img-wrapper ${picture.wide ? 'wide' : ''}`}>
                    <img src={picture.src}></img>
                  </div>)
                }
              </div>
              <div style={this.state.secondDownStyle} className="down">
                {
                  this.props.box.pictures
                  .filter(picture => !picture.up)
                  .map((picture, index) =>
                  <div key={index} className={`img-wrapper ${picture.wide ? 'wide' : ''}`}>
                    <img src={picture.src}></img>
                  </div>)
                }
              </div>
            </div>
            <div className="prin">
              <div className="img-wrapper">
                <img src={this.props.box.prin}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
