import React from 'react';
import PropTypes from 'prop-types';
import loadImage from 'blueimp-load-image';

import './img-wrapper.css';

export default class ImgWrapper extends React.Component {
  img;
  static propTypes = {
    img: PropTypes.object.isRequired,
    onLoad: PropTypes.func,
    className: PropTypes.string,
    fullScreen: PropTypes.bool
  };

  componentDidMount() {
    if (this.props.img.turn) {
      loadImage(
        this.props.img.src,
        (img) => {
          if (img.type !== 'error' && document.getElementById(`canvas${this.props.img.id}`)) {
            document.getElementById(`canvas${this.props.img.id}`).appendChild(img);
            this.img.remove();
          }
        },
        {
          orientation: true
        }
      );
    } else {
      this.img.onload = () => {
        if (this.props.onLoad) this.props.onLoad();
      };
      this.img.src = this.props.img.src;
    }
  }

  render() {
    return (
      <div id={`canvas${this.props.img.id}`}
          className={`img-wrapper ${this.props.className ? this.props.className : ''} ${this.props.fullScreen ? 'full-screen' : ''} ${this.props.img.wide ? 'wide' : ''}`}>
        <img className={this.props.img.bad ? 'bad' : ''} ref={(el) => { this.img = el; }}></img>
      </div>
    );
  }
}
