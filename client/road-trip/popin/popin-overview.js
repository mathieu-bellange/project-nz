import React from 'react';
import PropTypes from 'prop-types';

import PrinFlexBox from './prin-flexbox';
import SecondaryFlexBox from './secondary-flexbox';
import './popin-overview.sss';

export default class Popin extends React.Component {
  elem;

  onLoad = () => {
    this.props.overviewLoaded({
      offsetLeft: this.elem.offsetLeft,
      offsetTop: this.elem.offsetTop,
      width: `${this.elem.clientWidth}px`,
      height: `${this.elem.clientHeight}px`
    });
  }

  static propTypes = {
    box: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool,
    className: PropTypes.string,
    overviewLoaded: PropTypes.func,
    openFullScreen: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.overviewLoaded({
      offsetLeft: this.elem.offsetLeft,
      offsetTop: this.elem.offsetTop,
      width: `${this.elem.clientWidth}px`,
      height: `${this.elem.clientHeight}px`
    });
  }

  render() {
    return (
        <div
          ref={(el) => { this.elem = el; }}
          onClick={this.props.openFullScreen}
          className={`${this.props.className} popin-overview ${this.props.fullScreen ? 'full-screen' : ''}`}
        >
          {
            this.props.box.pictures ? <PrinFlexBox mixed={true}
                box={this.props.box.pictures[0].prin}
                onLoad={this.onLoad}
              />
              : <PrinFlexBox box={this.props.box} />
          }
          {
            this.props.box.pictures ? <SecondaryFlexBox break={this.props.box.break} onLoad={this.onLoad} images={this.props.box.pictures[0].secondary.sources}/> : ''
          }
        </div>
    );
  }
}
