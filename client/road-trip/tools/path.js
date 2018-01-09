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
      .toBack();
    return this;
  }

  animate(theDelay) {
    const delay = theDelay || 1;
    let index = 0;
    const intervalID = setInterval(() => {
      this.element.attr({ opacity: index += 0.1 });
      if (index >= 1) {
        clearInterval(intervalID);
      }
    }, delay / 10);
  }
}
