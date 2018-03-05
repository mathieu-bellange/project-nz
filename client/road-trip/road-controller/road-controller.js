import React from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs/Observable';

import './road-controller.css';

export default class RoadController extends React.Component {
  static propTypes = {
    hasPrevious: PropTypes.bool,
    hasNext: PropTypes.bool,
    hasClickedNext: PropTypes.func.isRequired,
    hasClickedPrevious: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    componentMountSubject: PropTypes.object
  };

  componentDidMount() {
    this.props.componentMountSubject.next(true);
    Observable.fromEvent(window, 'keypress')
      .filter(event => event.keyCode === 13)
      .filter(() => this.props.hasNext)
      .subscribe(() => this.props.hasClickedNext());
    Observable.fromEvent(window, 'keydown')
      .filter(event => event.keyCode === 8)
      .filter(() => this.props.hasPrevious)
      .subscribe(() => this.props.hasClickedPrevious());
  }

  componentWillUnmount() {
    this.props.componentMountSubject.next(false);
  }

  render() {
    return (
      <div className={`road-controller ${this.props.loading ? 'loading' : ''}`}>
        <a className={`previous ${this.props.hasPrevious ? '' : 'disabled'}`} onClick={this.props.hasClickedPrevious}>
          <i className="fa fa-caret-left" aria-hidden="true"></i>
        </a>
        <a className={`next ${this.props.hasNext ? '' : 'disabled'}`} onClick={this.props.hasClickedNext}>
          Etape suivante <i className="fa fa-caret-right" aria-hidden="true"></i>
        </a>
      </div>
    );
  }
}
