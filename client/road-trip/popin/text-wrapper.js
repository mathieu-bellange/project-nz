import React from 'react';
import PropTypes from 'prop-types';

export default class ImgWrapper extends React.Component {
  static propTypes = {
    box: PropTypes.object.isRequired
  };


  render() {
    return (
      <div className="text-wrapper">
        <h2>{this.props.box.title}</h2>
        <p>{this.props.box.text}</p>
      </div>
    );
  }
}
