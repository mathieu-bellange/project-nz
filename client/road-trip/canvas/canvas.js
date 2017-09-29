import React from 'react';
import PropTypes from 'prop-types';
import Raphael from 'raphael';

import * as NorthIsland from '../north-island';

export default class RoadTripCanvas extends React.Component {
  pixelRatio = 1;
  canvasId = 'roadTrip-canvas';

  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired
  };

  componentDidMount() {
    const rsr = Raphael(
      this.canvasId,
      this.props.canvasWidth * this.pixelRatio,
      this.props.canvasHeight * this.pixelRatio
    );
    rsr.setViewBox(
      0,
      0,
      this.props.canvasWidth * this.pixelRatio,
      this.props.canvasHeight * this.pixelRatio
    );
    const niLayer = new NorthIsland.Layer(rsr, this.pixelRatio);
    niLayer.draw();
    const rniLayer = new NorthIsland.RoadLayer(rsr, this.pixelRatio);
    rniLayer.draw();
  }

  render() {
    return (
        <div id={this.canvasId}>
        </div>
    );
  }
}
