export default class Coordinate {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isEqual(point, pixelRatio) {
    const ratio = pixelRatio || 1;
    return this.x === point.x / ratio && this.y === point.y / ratio;
  }
}
