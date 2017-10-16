import React from 'react';
import PropTypes from 'prop-types';

import './popin-text.css';

export default class PopinText extends React.Component {
  static propTypes = {
    box: PropTypes.object.isRequired
  };

  render() {
    return (
        <div className="popin-text">
          <p>{this.props.box.text}</p>
        </div>
    );
  }
}
