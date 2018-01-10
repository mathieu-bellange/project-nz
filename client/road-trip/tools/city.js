import Coordinate from './coordinate';

export default class City extends Coordinate {
  name;
  namePosition;
  pixelRatio;
  centerElement;
  nameElement;

  constructor(x, y, pixelRatio, name) {
    super(x, y, pixelRatio);
    this.pixelRatio = pixelRatio;
    this.name = name;
    this.namePosition = new Coordinate(x + 0.5, y - 0.75, pixelRatio);
  }

  draw(paper) {
    this.centerElement = paper.circle(this.x, this.y, 0.35 * this.pixelRatio)
      .attr({
        stroke: '#f3f3f3',
        fill: '#f3f3f3',
        opacity: 0
      });
    this.nameElement = paper.text(this.namePosition.x, this.namePosition.y, this.name)
      .attr({
        'text-anchor': 'start',
        'font-size': '16',
        opacity: 0
      });
    return this;
  }

  animate() {
    let index = 0;
    const intervalID = setInterval(() => {
      this.centerElement.attr({ opacity: index += 0.025 });
      this.nameElement.attr({ opacity: index += 0.025 });
      if (index >= 1) {
        clearInterval(intervalID);
      }
    }, 100);
  }
}
