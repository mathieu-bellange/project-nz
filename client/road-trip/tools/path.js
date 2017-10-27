export default class Path {
  options = {};
  element;

  constructor(options) {
    this.options = Object.assign({
      opacity: 0
    }, options);
  }

  draw(paper, size, coordinates) {
    const path = [];
    coordinates.forEach((coordinate, index) => {
      const action = index === 0 ? 'M' : 'L';
      path.push(action);
      path.push(coordinate.x * size);
      path.push(coordinate.y * size);
    });
    this.element = paper
      .path(path)
      .attr(this.options);
    return this;
  }

  animate(delay) {
    let index = 0;
    const intervalID = setInterval(() => {
      this.element.attr({ opacity: index += 0.1 });
      if (index === 1) {
        clearInterval(intervalID);
      }
    }, delay / 10);
  }
}
