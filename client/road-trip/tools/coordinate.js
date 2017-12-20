export default class Coordinate {
  x;
  y;

  constructor(x, y, pixelRatio) {
    const ratio = pixelRatio || 1;
    this.x = x * ratio;
    this.y = y * ratio;
  }

  /**
   * Méthode de comparaison avec un autre point. Si possible un autre coordinate
   * Il doit au moins avoir une ppt x et y. Une tolérance de + ou - 1 est acceptée
   * du au calcul d'une droite (y = ax + b)
   * @param  {Coordinate}  point le point a comparé
   * @return {Boolean}       vrai si égale, faux sinon
   */
  isEqual(point) {
    return this.x === point.x && this.y === point.y;
  }
}
