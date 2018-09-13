import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'svg.js';

import PrinFlexBox from './prin-flexbox';
import SecondaryFlexBox from './secondary-flexbox';
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

  componentDidUpdate(prevProps) {
    if (prevProps.fullScreen !== this.props.fullScreen && this.props.fullScreen) {
      this.elem.focus();
    }
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
        tabIndex="0"
        id={this.props.box.id}
        className={`${this.props.className} doppleganger ${this.props.fullScreen ? 'show' : ''} ${this.props.positioned ? 'full-screen' : ''} ${this.props.scaled ? 'end' : ''}`}
        style={this.props.style}
        onTransitionEnd={this.props.onTransitionEnd}
        ref={(el) => { this.elem = el; }}
      >
        <div id={`close-${this.props.box.id}`} className={`closed-icon ${this.props.fixedCloseIcon ? 'fixed' : ''}`} onClick={this.closeFullScreen}>
        </div>
        {
          this.props.box.pictures ? this.props.box.pictures.map(picture => <div className="row" key={picture.id} onTransitionEnd={e => e.stopPropagation()}>
                <PrinFlexBox
                  mixed={!!picture.prin.text}
                  fullScreen={this.props.scaled}
                  box={picture.prin}
                />
                <SecondaryFlexBox
                  break={this.props.box.break}
                  fullScreen={this.props.scaled}
                  images={picture.secondary.sources}
                />
              </div>)
            : <PrinFlexBox
              fullScreen={this.props.scaled}
              box={this.props.box}
              onTransitionEnd={e => e.stopPropagation()}
            />
        }
      </div>
    );
  }
}
