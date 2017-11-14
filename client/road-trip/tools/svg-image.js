export default class SVGImage {
  path;
  position;
  size;

  constructor(path, position, size) {
    this.path = path;
    this.position = position;
    this.size = size;
  }

  draw(paper) {
    return paper
      .image(this.path, this.position.x, this.position.y, this.size.w, this.size.h);
  }
}
