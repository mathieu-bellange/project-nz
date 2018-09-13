import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'svg.js';

import * as Boxes from '../boxes';
import './popin-mobile.css';
import TextWrapper from './text-wrapper';
import ImgWrapper from './img-wrapper';

export default class PopinMobile extends React.Component {
  component;

  popin;

  static propTypes = {
    box: PropTypes.object,
    popinClosed: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const draw = SVG(`close-${this.props.box.id}`).size(20, 20);
    draw.image('/images/close.svg', 20, 20);
  }

  componentWillUpdate(nextprops) {
    if (!nextprops.box) return;
    switch (nextprops.box.type) {
      case Boxes.Type.Text:
        this.component = <TextWrapper box={nextprops.box}></TextWrapper>;
        break;
      case Boxes.Type.Picture:
      case Boxes.Type.Mixed:
        this.component = nextprops.box.pictures.map((picture) => {
          const sources = [picture.prin];
          picture.secondary.sources.forEach((source) => {
            source.forEach(img => sources.push(img));
          });
          return sources;
        }).reduce((prec, val) => prec.concat(val), [])
          .map((img) => {
            if (img.text) return <TextWrapper key={img.id} box={img}></TextWrapper>;
            return <ImgWrapper key={img.id} img={img} />;
          });
        break;
      default:
        this.component = '';
    }
  }

  close() {
    this.props.popinClosed();
    this.popin.scrollTo(0, 0);
  }

  render() {
    return (
      <div ref={(el) => { this.popin = el; }}
          onWheel={e => e.stopPropagation()}
          className={`popin-mobile ${this.props.box.type === Boxes.Type.Text ? 'txt' : ''} ${this.props.box.type ? 'show' : ''}`}>
          <div id={`close-${this.props.box.id}`} className='closed-icon' onClick={this.close}>
          </div>
        {this.component}
      </div>
    );
  }
}
