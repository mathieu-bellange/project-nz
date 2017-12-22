import React from 'react';
import PropTypes from 'prop-types';
import Raphael from 'raphael';
import { Observable } from 'rxjs/Observable';

import { Van } from '../scenery';
import Point from './point';
import './loading.css';

export default class LoadingComponent extends React.Component {
  van;

  static propTypes = {
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.van = new Van();
    this.state = {
      pointOneJumped: false,
      pointTwoJumped: false,
      pointThreeJumped: false
    };
  }

  componentDidMount() {
    let vanX = 100;
    let vanY = 60;
    let canvasY = 100;
    if (window.innerWidth < 560) {
      vanX = 60;
      canvasY = 65;
      vanY = 40;
    }
    const canvas = Raphael('van', 1000, canvasY);
    this.van.draw(canvas, { x: vanX, y: vanY }).animate();
    Observable.timer(0, 900)
      .filter(() => this.props.loading)
      .subscribe(() => {
        this.setState({ pointOneJumped: !this.state.pointOneJumped });
      });
    Observable.timer(300, 900)
      .filter(() => this.props.loading)
      .subscribe(() => {
        this.setState({ pointTwoJumped: !this.state.pointTwoJumped });
      });
    Observable.timer(600, 900)
      .filter(() => this.props.loading)
      .subscribe(() => {
        this.setState({ pointThreeJumped: !this.state.pointThreeJumped });
      });
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.loading) {
      this.van.drive();
    }
  }

  render() {
    return (
      <div className={`loading-component ${this.props.loading ? 'loading' : ''}`}>
        <div className="txt-wrapper">
          <div className="txt">Chargement</div>
          <Point isJumping={this.state.pointOneJumped}></Point>
          <Point isJumping={this.state.pointTwoJumped}></Point>
          <Point isJumping={this.state.pointThreeJumped}></Point>
        </div>
        <div id="van"></div>
      </div>
    );
  }
}
