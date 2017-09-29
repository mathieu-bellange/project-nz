import { Layer } from '../tools';
import Markers from './coastline-markers';

export default class NorthIslandLayer {
  id = 'north-island';
  layer;
  paper;
  size;

  constructor(paper, size) {
    this.paper = paper;
    this.size = size;
    this.layer = new Layer(this.id, paper.set());
  }

  draw() {
    this.layer.draw(this.paper, this.size, Markers);
  }
}
