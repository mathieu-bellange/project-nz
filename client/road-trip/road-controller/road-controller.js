import React from 'react';
import PropTypes from 'prop-types';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './road-controller.sss';

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
    fromEvent(window, 'keypress').pipe(
      filter(event => event.keyCode === 13),
      filter(() => this.props.hasNext)
    ).subscribe(() => this.props.hasClickedNext());
    fromEvent(window, 'keydown').pipe(
      filter(event => event.keyCode === 8),
      filter(() => this.props.hasPrevious)
    ).subscribe(() => this.props.hasClickedPrevious());
  }

  componentWillUnmount() {
    this.props.componentMountSubject.next(false);
  }

  render() {
    return (
      <div className={`road-controller ${this.props.loading ? 'loading' : ''}`}>
        <a className={`previous ${this.props.hasPrevious ? '' : 'disabled'}`} onClick={this.props.hasClickedPrevious}>
          <FontAwesomeIcon icon="caret-left"/>
        </a>
        <a className={`next ${this.props.hasNext ? '' : 'disabled'}`} onClick={this.props.hasClickedNext}>
          Etape suivante <FontAwesomeIcon icon="caret-right"/>
        </a>
      </div>
    );
  }
}
