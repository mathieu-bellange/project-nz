export default class SVGText {
  path;
  position;
  size;
  text;

  constructor(txt, position, size, pixelRatio) {
    this.txt = txt;
    this.position = position;
    this.size = size;
    this.pixelRatio = pixelRatio;
  }

  draw(paper) {
    this.text = paper.text(this.txt)
      .move(this.position.x * this.pixelRatio, this.position.y * this.pixelRatio)
      .font({
        anchor: 'middle',
        size: this.size,
        family: 'Roboto'
      })
      .attr({ opacity: 0 });
    return this;
  }

  animate() {
    this.text.animate(2000, '-').attr({ opacity: 1 });
  }
}
