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
    this.text = paper.text(
      this.position.x * this.pixelRatio,
      this.position.y * this.pixelRatio,
      this.txt
    ).attr({
      'text-anchor': 'middle',
      'font-size': this.size,
      opacity: 0,
      'font-family': 'Roboto'
    });
    return this;
  }

  animate() {
    let index = 0;
    const intervalID = setInterval(() => {
      this.text.attr({ opacity: index += 0.025 });
      if (index >= 1) {
        clearInterval(intervalID);
      }
    }, 100);
  }
}
