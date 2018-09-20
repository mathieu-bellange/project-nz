import React from 'react';
import PropTypes from 'prop-types';
import { fromEvent } from 'rxjs';

import './full-screen.sss';

export default class RoadController extends React.Component {
  static propTypes = {
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false
    };
    this.onFullScreenRequest = this.onFullScreenRequest.bind(this);
  }

  componentDidMount() {
    fromEvent(window, 'webkitfullscreenchange')
      .subscribe(() => this.setState({ fullScreen: !this.state.fullScreen }));
  }

  onFullScreenRequest() {
     document.querySelector('body').webkitRequestFullscreen();
  }

  render() {
    return (
      <span className={`screen-full ${this.props.loading ? 'loading' : ''} ${this.state.fullScreen ? 'collapse' : ''}`} onClick={this.onFullScreenRequest}>
      </span>
    );
  }
}
