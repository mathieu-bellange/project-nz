import React from 'react';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import './full-screen.sss';

export default class RoadController extends React.Component {
  fullscreenEnabled = document.fullscreenEnabled
    || document.webkitFullscreenEnabled || document.mozFullScreenEnabled;

  static propTypes = {
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.onFullScreenRequest = new Subject().pipe(filter(() => this.fullscreenEnabled));
  }

  componentDidMount() {
    this.onFullScreenRequest.pipe(
      filter(() => document.fullscreenElement
        || document.webkitFullscreenElement || document.mozFullScreenElement),
      map(() => document.exitFullscreen || document.msExitFullscreen
        || document.webkitExitFullscreen || document.mozCancelFullScreen)
    ).subscribe(execute => execute.bind(document)());
    this.onFullScreenRequest.pipe(
      filter(() => !document.fullscreenElement
        || !document.webkitFullscreenElement || !document.mozFullScreenElement),
      map(() => document.querySelector('#wrapper')),
      map(root => ({
        root,
        execute: root.requestFullscreen
          || root.webkitRequestFullscreen || root.mozRequestFullScreen
      }))
    ).subscribe(o => o.execute.bind(o.root)());
  }

  render() {
    return (
      <span
        className={`screen-full ${this.props.loading ? 'loading' : ''} ${document.fullscreenElement
          || document.webkitFullscreenElement || document.mozFullScreenElement ? 'collapse' : ''}`}
        onClick={() => this.onFullScreenRequest.next()}>
      </span>
    );
  }
}
