import Path from './path';

export default class Metropolis extends Path {
  name;

  constructor(coordinates, pixelRatio, name) {
    super(coordinates, {
      stroke: '#f3f3f3',
      fill: '#f3f3f3'
    });
    this.name = name;
    this.pixelRatio = pixelRatio;
  }

  draw(paper) {
    super.draw(paper, this.pixelRatio);
    return this;
  }
}
