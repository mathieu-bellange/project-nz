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
    this.nameElement = paper.text(this.namePosition.x, this.namePosition.y, this.name)
      .attr({
        'font-size': '32',
        opacity: '0',
        'font-family': 'Roboto'
      });
    return this;
  }

  animate() {
    super.animate(0.025);
    let index = 0;
    const intervalID = setInterval(() => {
      this.nameElement.attr({ opacity: index += 0.025 });
      if (index >= 1) {
        clearInterval(intervalID);
      }
    }, 100);
  }
}
