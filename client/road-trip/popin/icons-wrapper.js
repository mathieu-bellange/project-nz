import React from 'react';
import PropTypes from 'prop-types';

import './icons-wrapper.css';
import IconWrapper from './icon-wrapper';
import PopinMobile from './popin-mobile';

export default class IconsWrapper extends React.Component {
  mapIconsComponents = (box) => {
    if (!box.type) return '';
    return <div key={box.id} className="content" onClick={() => this.iconClicked(box)}>
      <IconWrapper box={box}></IconWrapper>
    </div>;
  };
  static propTypes = {
    popinBoxes: PropTypes.array.isRequired,
    box: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      box: {}
    };
    this.iconClicked = this.iconClicked.bind(this);
    this.popinClosed = this.popinClosed.bind(this);
  }

  iconClicked(box) {
    this.setState({
      box
    });
  }

  popinClosed() {
    this.setState({
      box: {}
    });
  }

  render() {
    return (
      <div className="icons-wrapper">
          {
            this.props.popinBoxes
              .filter(() => window.innerWidth < 1024)
              .map(this.mapIconsComponents)
          }
          <PopinMobile box={this.state.box} popinClosed={this.popinClosed}></PopinMobile>
      </div>
    );
  }
}
