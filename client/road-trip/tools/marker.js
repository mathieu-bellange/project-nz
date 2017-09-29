import Coordinate from './coordinate';

export default class Marker {
  id;
  begin: {};
  end: {};

  constructor(id, bx, by, ex, ey) {
    this.id = id;
    this.begin = new Coordinate(bx, by);
    this.end = new Coordinate(ex, ey);
  }
}
