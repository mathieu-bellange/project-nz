import Path from './path';
import Coordinate from './coordinate';

export default class Metropolis extends Path {
  name;

  namePosition;

  nameElement;

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
    this.nameElement = paper.text(this.name)
      .move(this.namePosition.x, this.namePosition.y)
      .font({
        size: '32',
        family: 'Roboto'
      })
      .attr({ opacity: 0 });
    return this;
  }

  animate(interval) {
    super.animate(interval);
    this.nameElement.animate(interval || 2000, '-').attr({ opacity: 1 });
    return this;
  }
}
