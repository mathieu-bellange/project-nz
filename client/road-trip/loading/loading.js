import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'svg.js';
import { timer } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Van } from '../scenery';
import Point from './point';
import './loading.css';

export default class LoadingComponent extends React.Component {
  van;

  subs = [];

  static propTypes = {
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.van = new Van();
    this.state = {
      pointOneJumped: false,
      pointTwoJumped: false,
      pointThreeJumped: false,
      hidden: false
    };
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
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
    const canvas = SVG('van', 1000, canvasY);
    this.van.draw(canvas, { x: vanX, y: vanY }).animate();
    const sub1 = timer(0, 900)
      .pipe(filter(() => this.props.loading))
      .subscribe(() => {
        this.setState({ pointOneJumped: !this.state.pointOneJumped });
      });
    const sub2 = timer(300, 900)
      .pipe(filter(() => this.props.loading))
      .subscribe(() => {
        this.setState({ pointTwoJumped: !this.state.pointTwoJumped });
      });
    const sub3 = timer(600, 900)
      .pipe(filter(() => this.props.loading))
      .subscribe(() => {
        this.setState({ pointThreeJumped: !this.state.pointThreeJumped });
      });
    this.subs.push(sub1, sub2, sub3);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.loading !== this.props.loading && !nextProps.loading) {
      this.van.drive();
    }
  }

  onTransitionEnd(e) {
    if (e.propertyName === 'opacity' && !this.props.loading) {
      this.setState({ hidden: true });
    }
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  render() {
    return (
      <div className={`loading-component ${this.props.loading ? 'loading' : ''} ${this.state.hidden ? 'hidden' : ''}`} onTransitionEnd={this.onTransitionEnd}>
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
