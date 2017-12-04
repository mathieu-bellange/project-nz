import React from 'react';
import PropTypes from 'prop-types';

import './canvas.css';

export default class RoadTripCanvas extends React.Component {
  static propTypes = {
    canvasId: PropTypes.string.isRequired,
    canvasCenter: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      canvasStyle: {}
    };
    this.defineCanvasStyle = this.defineCanvasStyle.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.canvasCenter !== this.props.canvasCenter) {
      this.defineCanvasStyle();
    }
  }

  defineCanvasStyle() {
    this.setState({
      canvasStyle: {
        left: this.props.canvasCenter.x,
        top: this.props.canvasCenter.y
      }
    });
  }

  render() {
    return (
        <div id="viewport">
          <div id={this.props.canvasId} style={this.state.canvasStyle}>

          </div>
        </div>
    );
  }
}
