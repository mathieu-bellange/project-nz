import React from 'react';
import PropTypes from 'prop-types';

import './popin-text.css';

export default class PopinText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    display: PropTypes.bool
  };

  render() {
    return (
        <div className={`popin-text ${this.props.display ? 'show' : ''}`}>
          <p>{this.props.text}</p>
        </div>
    );
  }
}
