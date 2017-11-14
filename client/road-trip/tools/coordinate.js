export default class Coordinate {
  x;
  y;

  constructor(x, y, pixelRatio) {
    const ratio = pixelRatio || 1;
    this.x = x * ratio;
    this.y = y * ratio;
  }

  // TODO supprimer la notion de pixel ratio trello:#68
  isEqual(point, pixelRatio) {
    const ratio = pixelRatio || 1;
    const calculX = point.x / ratio;
    const calculY = point.y / ratio;
    return (this.x - 1 <= calculX && calculX <= this.x + 1) &&
      (this.y - 1 <= calculY && calculY <= this.y + 1);
  }
}
