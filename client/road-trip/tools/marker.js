import { add, divide, subtract, multiply, sign } from 'mathjs';

import Coordinate from './coordinate';

// NOTE refacto le nom de la class
export default class Marker {
  id;
  begin: {};
  end: {};
  alpha;
  k;
  deltaX;
  deltaY;

  constructor(id, bx, by, ex, ey, pixelRatio) {
    const ratio = pixelRatio || 1;
    this.id = id;
    this.begin = new Coordinate(bx, by, ratio);
    this.end = new Coordinate(ex, ey, ratio);
    this.alpha = divide(subtract(this.begin.y, this.end.y), subtract(this.begin.x, this.end.x));
    this.k = subtract(this.begin.y, multiply(this.alpha, this.begin.x));
    this.deltaX = this.begin.x - this.end.x;
    this.deltaY = this.begin.y - this.end.y;
  }

  // DONE supprimer le notion de pixelRatio trello:#68
  /**
   * Méthode permettant de savoir si un point est présent sur la droite correspondante
   * Une tolérance de +ou- 1 est ajouté du fait de la trop grande précision des calculs
   * par rapports aux coordonnées affichées
   * @param  {@Coordinate}  point  la coordonnée du point à tester
   * @return {Boolean}            oui si la route, non en dehors
   */
  isOn(point) {
    const calculY = Math.trunc(add(multiply(this.alpha, point.x), this.k));
    return this.isBetween(point) && Math.trunc(point.y) - 1 <= calculY && calculY <= Math.trunc(point.y) + 1;
  }

  // DONE ajouter un check que le point se trouve bien dans la zone x-y défini par la droite
  isBetween(point) {
    const deltaX = this.begin.x - point.x;
    const deltaY = this.begin.y - point.y;
    const isSameSignX = sign(deltaX) === sign(this.deltaX) || sign(deltaX) === 0;
    const isSameSignY = sign(deltaY) === sign(this.deltaY) || sign(deltaY) === 0;
    const isShorterX = Math.abs(deltaX) <= Math.abs(this.deltaX);
    const isShorterY = Math.abs(deltaY) <= Math.abs(this.deltaY);
    return isSameSignX && isSameSignY && isShorterX && isShorterY;
  }
}
