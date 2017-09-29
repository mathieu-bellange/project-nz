import { Line } from '../tools';

export default class Layer {
  layer;
  id;

  constructor(id, rapahelLayer) {
    this.id = id;
    this.layer = rapahelLayer;
    this.attr({ id: this.id, name: this.id });
  }

  attr(options) {
    this.layer.attr(options);
  }

  draw(paper, size, markers) {
    markers.forEach((marker) => {
      this.layer.push(new Line(this.id, marker.id).draw(paper, size, marker));
    }, this);
  }
}
