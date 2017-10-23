import React from 'react';
import PropTypes from 'prop-types';

import './img-wrapper.css';

export default class ImgWrapper extends React.Component {
  static propTypes = {
    img: PropTypes.object.isRequired,
    onLoad: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  render() {
    return (
      <div className={`img-wrapper ${this.props.img.wide ? 'wide' : ''}`}>
        <img onLoad={this.onLoad} src={this.props.img.src}></img>
      </div>
    );
  }
}
