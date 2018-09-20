import React from 'react';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import './full-screen.sss';

export default class RoadController extends React.Component {
  static propTypes = {
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.onFullScreenRequest = new Subject().pipe(filter(() => document.webkitFullscreenEnabled));
  }

  componentDidMount() {
    this.onFullScreenRequest
      .pipe(filter(() => document.webkitFullscreenElement))
      .subscribe(() => document.webkitExitFullscreen());
    this.onFullScreenRequest
      .pipe(filter(() => !document.webkitFullscreenElement))
      .subscribe(() => document.querySelector('#wrapper').webkitRequestFullscreen());
  }

  render() {
    return (
      <span
        className={`screen-full ${this.props.loading ? 'loading' : ''} ${document.webkitFullscreenElement ? 'collapse' : ''}`}
        onClick={() => this.onFullScreenRequest.next()}>
      </span>
    );
  }
}
