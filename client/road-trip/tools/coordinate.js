export default class Coordinate {
  x;
  y;

  constructor(x, y, pixelRatio) {
    const ratio = pixelRatio || 1;
    this.x = x * ratio;
    this.y = y * ratio;
  }

  // DONE supprimer la notion de pixel ratio trello:#68
  isEqual(point) {
    return (this.x - 1 <= point.x && point.x <= this.x + 1) &&
      (this.y - 1 <= point.y && point.y <= this.y + 1);
  }
}
