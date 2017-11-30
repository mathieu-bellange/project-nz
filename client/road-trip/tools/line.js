export default class Line {
  options = {};

  constructor(parent, id) {
    this.options = {
      id,
      parent,
      stroke: '#000000',
      'stroke-width': '1'
    };
  }

  draw(paper, size, orientedVector) {
    return paper
      .path(['M', orientedVector.begin.x * size, orientedVector.begin.y * size, 'L', orientedVector.end.x * size, orientedVector.end.y * size])
      .attr(this.options);
  }
}
