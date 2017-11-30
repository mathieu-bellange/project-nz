import React from 'react';
import PropTypes from 'prop-types';
import loadImage from 'blueimp-load-image';

import './img-wrapper.css';

// PLANNING ajouter un chargement asynchrone des images
export default class ImgWrapper extends React.Component {
  component;
  static propTypes = {
    img: PropTypes.object.isRequired,
    onLoad: PropTypes.func
  };

  constructor(props) {
    super(props);
    if (!props.img.turn) {
      this.component = <img onLoad={props.onLoad} src={props.img.src}></img>;
    }
    this.onLoad = this.onLoad.bind(this);
  }

  // DONE supprimer les console.log
  // DONE gestion des images alors que le document a été retiré par react
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
    }
  }

  onLoad() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  render() {
    return (
      <div id={`canvas${this.props.img.id}`} className={`img-wrapper ${this.props.img.wide ? 'wide' : ''} `}>
        {this.component}
      </div>
    );
  }
}
