import React from 'react';
import PropTypes from 'prop-types';

import './tutorial.css';

// DOING ajouter un composant de tutorial trello:#70
export default class Tutorial extends React.Component {
  static propTypes = {
    display: PropTypes.bool,
    title: PropTypes.string,
    txt: PropTypes.string,
    closeTutorial: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.okClicked = this.okClicked.bind(this);
  }

  okClicked() {
    this.props.closeTutorial();
  }

  render() {
    return (
      <div className={`tutorial ${this.props.display ? '' : 'hidden'}`} onClick={e => e.stopPropagation()}>
        <div className='arrow'>
          <div className='arrow-left'></div>
          <div className='arrow-body'></div>
        </div>
        <div className='ui'>
          <div className='txt-wrapper'>
            <h1>{this.props.title}</h1>
            <p>{this.props.txt}</p>
          </div>
          <div className='btn-wrapper'>
            <button onClick={this.okClicked}>ok</button>
          </div>
        </div>
      </div>
    );
  }
}
