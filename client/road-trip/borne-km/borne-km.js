import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

import './borne-km.css';

export default class BorneKm extends React.Component {
  static propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    loading: PropTypes.bool,
    onComplete: PropTypes.func,
    display: PropTypes.bool
  };

  render() {
    return (
      <div className={`borne-km ${this.props.display ? '' : 'hidden'} ${this.props.loading ? 'loading' : ''}`}>
        <img src="/images/borne-km.svg"></img>
        <CountUp
          className="txt"
          separator=" "
          start={this.props.start}
          end={this.props.end}
          onComplete={this.props.onComplete}
          duration={7}
        />
      </div>
    );
  }
}