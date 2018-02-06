import OrientedVector from './oriented-vector';

export default class SVGLine extends OrientedVector {
  element;

  draw(draw) {
    this.element = draw.line(
      this.begin.x,
      this.begin.y,
      this.begin.x,
      this.begin.y
    ).stroke({ color: '#000', width: 1 });
    return this;
  }

  animate() {
    this.element.animate(2000, '-').plot(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }
}
