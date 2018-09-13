export default class SVGImage {
  path;

  position;

  size;

  img;

  constructor(path, position, size, pixelRatio) {
    this.path = path;
    this.position = position;
    this.size = size;
    this.pixelRatio = pixelRatio;
  }

  draw(draw) {
    this.img = draw
      .image(this.path, this.size.w, this.size.h)
      .move(
        (this.position.x * this.pixelRatio) - (this.size.w / 2),
        (this.position.y * this.pixelRatio) - (this.size.h / 2)
      );
    this.img.attr({ opacity: 0 });
    return this;
  }

  animate() {
    let index = 0;
    const intervalID = setInterval(() => {
      this.img.attr({ opacity: index += 0.025 });
      if (index >= 1) {
        clearInterval(intervalID);
      }
    }, 100);
  }
}
