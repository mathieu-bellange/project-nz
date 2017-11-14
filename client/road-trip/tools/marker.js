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

  constructor(id, bx, by, ex, ey) {
    this.id = id;
    this.begin = new Coordinate(bx, by);
    this.end = new Coordinate(ex, ey);
    this.alpha = divide(subtract(by, ey), subtract(bx, ex));
    this.k = subtract(by, multiply(this.alpha, bx));
    this.deltaX = bx - ex;
    this.deltaY = by - ey;
  }

  // TODO supprimer le notion de pixelRatio trello:#68
  /**
   * Méthode permettant de savoir si un point est présent sur la droite correspondante
   * Une tolérance de +ou- 1 est ajouté du fait de la trop grande précision des calculs
   * par rapports aux coordonnées affichées
   * @param  {@Coordinate}  point  la coordonnée du point à tester
   * @param  {number}  pixelRatio A supprimer, ratio entre les coordonnées de la carte et l'affichage
   * @return {Boolean}            oui si la route, non en dehors
   */
  isOn(point, pixelRatio) {
    const ratio = pixelRatio || 1;
    const calculY = Math.trunc(add(multiply(this.alpha, point.x / ratio), this.k));
    return this.isBetween(point, pixelRatio) && Math.trunc(point.y / ratio) - 1 <= calculY && calculY <= Math.trunc(point.y / ratio) + 1;
  }

  // DONE ajouter un check que le point se trouve bien dans la zone x-y défini par la droite
  isBetween(point, pixelRatio) {
    const ratio = pixelRatio || 1;
    const deltaX = this.begin.x - (point.x / ratio);
    const deltaY = this.begin.y - (point.y / ratio);
    const isSameSignX = sign(deltaX) === sign(this.deltaX) || sign(deltaX) === 0;
    const isSameSignY = sign(deltaY) === sign(this.deltaY) || sign(deltaY) === 0;
    const isShorterX = Math.abs(deltaX) <= Math.abs(this.deltaX);
    const isShorterY = Math.abs(deltaY) <= Math.abs(this.deltaY);
    return isSameSignX && isSameSignY && isShorterX && isShorterY;
  }
}
