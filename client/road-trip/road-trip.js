import React from 'react';
import RoadTripCanvas from './canvas';

export default class RoadTrip extends React.Component {
  width = 1080;
  height = 1120;

  render() {
    return (
      <main id="roadTrip">
        <RoadTripCanvas
          canvasWidth={this.width}
          canvasHeight={this.height}
        ></RoadTripCanvas>
      </main>
    );
  }
}
