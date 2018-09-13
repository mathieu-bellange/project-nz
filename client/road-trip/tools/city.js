import Coordinate from './coordinate';

export default class City extends Coordinate {
  name;

  namePosition;

  radius;

  centerElement;

  nameElement;

  constructor(x, y, pixelRatio, name) {
    super(x, y, pixelRatio);
    this.pixelRatio = pixelRatio;
    this.name = name;
    this.namePosition = new Coordinate(x + 0.5, y - 0.75, pixelRatio);
    this.radius = 0.35 * pixelRatio;
  }

  draw(draw) {
    this.centerElement = draw.circle(this.radius)
      .attr({
        cx: this.x,
        cy: this.y,
        stroke: '#f3f3f3',
        fill: '#f3f3f3',
        opacity: 0
      });
    this.nameElement = draw.text(this.name)
      .move(this.namePosition.x, this.namePosition.y)
      .font({
        anchor: 'start',
        size: '16',
        family: 'Roboto'
      })
      .attr({ opacity: 0 });
    return this;
  }

  animate(interval) {
    this.nameElement.animate(interval || 2000, '-').attr({ opacity: 1 });
    this.centerElement.animate(interval || 2000, '-').attr({ opacity: 1 });
    return this;
  }
}
