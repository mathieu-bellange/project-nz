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

  draw(paper, size, marker) {
    return paper
      .path(['M', marker.begin.x * size, marker.begin.y * size, 'L', marker.end.x * size, marker.end.y * size])
      .attr(this.options);
  }
}
