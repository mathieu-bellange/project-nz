import { Layer } from '../tools';
import Markers from './road-markers';

export default class RoadLayer {
  id = 'north-island-road';
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
