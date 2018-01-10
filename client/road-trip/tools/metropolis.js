import Path from './path';
import Coordinate from './coordinate';

export default class Metropolis extends Path {
  name;
  namePosition;

  constructor(coordinates, pixelRatio, name, x, y) {
    super(coordinates, {
      stroke: '#f3f3f3',
      fill: '#f3f3f3'
    });
    this.name = name;
    this.namePosition = new Coordinate(x, y, pixelRatio);
    this.pixelRatio = pixelRatio;
  }

  draw(paper) {
    super.draw(paper, this.pixelRatio);
    paper.text(this.namePosition.x, this.namePosition.y, this.name)
      .attr({
        'font-size': '32'
      });
    return this;
  }
}
