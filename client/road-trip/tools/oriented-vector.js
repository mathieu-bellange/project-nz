import Coordinate from './coordinate';

export default class OrientedVector {
  id;
  begin = {};
  end = {};

  constructor(id, bx, by, ex, ey, pixelRatio) {
    const ratio = pixelRatio || 1;
    this.id = id;
    this.begin = new Coordinate(bx, by, ratio);
    this.end = new Coordinate(ex, ey, ratio);
  }
}
