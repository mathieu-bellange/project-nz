import React from 'react';
import PropTypes from 'prop-types';

import './full-screen.sss';

export default class RoadController extends React.Component {
  static propTypes = {
    loading: PropTypes.bool
  };

  render() {
    return (
      <span className={`full-screen ${this.props.loading ? 'loading' : ''}`}>
      </span>
    );
  }
}
