import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

import './borne-km.css';

export default class BorneKm extends React.Component {
  propagated;
  static propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    loading: PropTypes.bool,
    onComplete: PropTypes.func,
    display: PropTypes.bool,
    componentMountSubject: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
  }

  componentDidMount() {
    this.props.componentMountSubject.next(true);
    this.propagated = true;
  }

  componentWillUnmount() {
    this.props.componentMountSubject.next(false);
    this.propagated = false;
  }

  onComplete() {
    if (this.propagated) this.props.onComplete();
  }

  render() {
    return (
      <div className={`borne-km ${this.props.display ? '' : 'hidden'} ${this.props.loading ? 'loading' : ''}`}>
        <img src="/images/borne-km.svg"></img>
        <CountUp
          className="txt"
          separator=" "
          start={this.props.start}
          end={this.props.end}
          onComplete={this.onComplete}
          duration={7}
        />
      </div>
    );
  }
}
