import React from 'react';
import PropTypes from 'prop-types';

import './icon-wrapper.css';
import * as Boxes from '../boxes';

export default class IconWrapper extends React.Component {
  static propTypes = {
    box: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    switch (props.box.type) {
      case Boxes.Type.Text:
        this.src = '/images/icon-txt.png';
        break;
      case Boxes.Type.Picture:
      case Boxes.Type.Mixed:
        this.src = '/images/icon-img.png';
        break;
      default:
        this.src = '';
    }
  }

  render() {
    return (
      <div className="icon-wrapper">
        <img src={this.src}></img>
        <div className="title">{this.props.box.title}</div>
      </div>
    );
  }
}
