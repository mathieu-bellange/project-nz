import { add, divide, subtract, multiply } from 'mathjs';

import Coordinate from './coordinate';

// NOTE refacto le nom de la class
export default class Marker {
  id;
  begin: {};
  end: {};

  constructor(id, bx, by, ex, ey) {
    this.id = id;
    this.begin = new Coordinate(bx, by);
    this.end = new Coordinate(ex, ey);
    this.alpha = divide(subtract(by, ey), subtract(bx, ex));
    this.k = subtract(by, multiply(this.alpha, bx));
  }

  // DONE ajouter une méthode permettant de savoir si un point est sur la route trello:#20
  // TODO ajouter un check que le point se trouve bien dans la zone x-y défini par la droite trello:#20
  isOn(point, pixelRatio) {
    const ratio = pixelRatio || 1;
    return Math.trunc(point.y / ratio) === Math.trunc(add(multiply(this.alpha, point.x / ratio), this.k));
  }
}
