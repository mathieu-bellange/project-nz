import Coordinate from './coordinate';

export default class City extends Coordinate {
  name;
  pixelRatio;

  constructor(x, y, pixelRatio, name) {
    super(x, y, pixelRatio);
    this.pixelRatio = pixelRatio;
    this.name = name;
  }

  draw(paper) {
    paper.circle(this.x, this.y, 0.35 * this.pixelRatio)
      .attr({
        stroke: '#f3f3f3',
        fill: '#f3f3f3'
      });
    return this;
  }
}
