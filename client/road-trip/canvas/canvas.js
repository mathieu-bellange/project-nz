import React from 'react';
import PropTypes from 'prop-types';

import './canvas.sss';

export default class RoadTripCanvas extends React.Component {
  static propTypes = {
    canvasId: PropTypes.string.isRequired,
    canvasCenter: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    componentMountSubject: PropTypes.object
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

  componentDidMount() {
    this.props.componentMountSubject.next(true);
  }

  componentWillUnmount() {
    this.props.componentMountSubject.next(false);
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
        <div id="viewport" className={`${this.props.loading ? 'loading' : ''}`}>
          <div id={this.props.canvasId} style={this.state.canvasStyle}>

          </div>
        </div>
    );
  }
}
