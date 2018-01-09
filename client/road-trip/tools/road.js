import OrientedVector from './oriented-vector';

export default class Road extends OrientedVector {
  km;

  constructor(id, bx, by, ex, ey, pixelRatio, km) {
    super(id, bx, by, ex, ey, pixelRatio);
    this.km = km || 0;
  }
}
