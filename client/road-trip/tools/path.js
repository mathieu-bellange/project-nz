import Coordinate from './coordinate';

export default class Path {
  options = {};

  element;

  coordinates = [];

  constructor(coordinates, options) {
    this.options = Object.assign({
      opacity: 0
    }, options);
    coordinates.forEach((coordinate) => {
      this.coordinates.push(new Coordinate(coordinate[0], coordinate[1]));
    });
  }

  draw(paper, pixelRatio) {
    const path = [];
    this.coordinates.forEach((coordinate, index) => {
      const action = index === 0 ? 'M' : 'L';
      path.push(action);
      path.push(coordinate.x * pixelRatio);
      path.push(coordinate.y * pixelRatio);
    });
    this.element = paper
      .path(path)
      .attr(this.options)
      .back();
    return this;
  }

  animate(interval) {
    this.element.animate(interval || 2000, '-').attr({ opacity: 1 });
    return this;
  }
}
