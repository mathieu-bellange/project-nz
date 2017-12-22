import React from 'react';
import PropTypes from 'prop-types';

import './point.css';

export default class Point extends React.Component {
  static propTypes = {
    isJumping: PropTypes.bool
  };

  render() {
    return (
        <div className={`point ${this.props.isJumping ? 'jump' : ''}`}>.</div>
    );
  }
}
