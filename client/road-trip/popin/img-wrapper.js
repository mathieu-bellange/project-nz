import React from 'react';
import PropTypes from 'prop-types';
import loadImage from 'blueimp-load-image';

import './img-wrapper.css';

// DONE ajouter un chargement asynchrone des images
// FIXME corriger l'orientation des images sous firefox trello:#78
export default class ImgWrapper extends React.Component {
  img;
  static propTypes = {
    img: PropTypes.object.isRequired,
    onLoad: PropTypes.func
  };

  componentDidMount() {
    if (this.props.img.turn) {
      loadImage(
        this.props.img.src,
        (img) => {
          if (img.type !== 'error' && document.getElementById(`canvas${this.props.img.id}`)) {
            document.getElementById(`canvas${this.props.img.id}`).appendChild(img);
          }
        },
        {
          orientation: true
        }
      );
    } else {
      this.img.onload = () => {
        if (this.props.onLoad) this.props.onLoad();
      };
      this.img.src = this.props.img.src;
    }
  }

  render() {
    return (
      <div id={`canvas${this.props.img.id}`} className={`img-wrapper ${this.props.img.wide ? 'wide' : ''} `}>
        <img ref={(el) => { this.img = el; }}></img>
      </div>
    );
  }
}
