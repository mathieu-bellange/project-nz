import React from 'react';
import PropTypes from 'prop-types';

import './popin-text.css';

export default class PopinText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render() {
    return (
        <div className="popin-text">
          <p>{this.props.text}</p>
        </div>
    );
  }
}
