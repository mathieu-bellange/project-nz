import React from 'react';
import PropTypes from 'prop-types';

import './text-wrapper.css';

export default class TextWrapper extends React.Component {
  txtContainerElem;
  txtWrapperElem;

  static propTypes = {
    box: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool,
    mixed: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.createMarkup = this.createMarkup.bind(this);
  }

  createMarkup() {
    return { __html: this.props.box.text };
  }

  render() {
    return (
      <div id={this.props.box.id} className={`text-wrapper ${this.props.mixed ? 'mixed' : ''} ${this.props.fullScreen ? 'full-screen' : ''}`} ref={(el) => { this.txtWrapperElem = el; }}>
        <span className="date">{this.props.box.date}</span>
        <div
          ref={(el) => { this.txtContainerElem = el; }}
          className={`text-container ${this.props.fullScreen ? 'full-screen' : ''}`}
          dangerouslySetInnerHTML={this.createMarkup()}
        ></div>
        <div className={`ellipsis ${this.props.fullScreen ? 'hidden' : ''}`}>...</div>
      </div>
    );
  }
}
