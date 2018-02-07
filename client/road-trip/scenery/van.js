export default class Van {
  svg;
  vanPosition;
  vanSize = {
    w: 120,
    h: 62
  };

  constructor() {
    if (window.innerWidth < 680) {
      this.vanSize = {
        w: 90,
        h: 46
      };
    }
  }

  draw(canvas, position, reverse) {
    if (this.svg) this.svg.remove();
    this.vanPosition = {
      x: position.x - (this.vanSize.w / 2),
      y: position.y - (this.vanSize.h / 2)
    };
    let srcImage = '/images/van.svg';
    if (reverse) {
      srcImage = '/images/van-reverse.svg';
    }
    this.svg = canvas.image(srcImage, this.vanSize.w, this.vanSize.h)
      .move(this.vanPosition.x, this.vanPosition.y);
    return this;
  }

  animate() {
    this.svg.animate(200, '-').move(this.vanPosition.x, this.vanPosition.y + 1).loop();
  }

  drive() {
    this.svg.stop();
    this.svg.animate(1000, '-').move(this.vanPosition.x + 500, this.vanPosition.y).after(() => {
      this.svg.remove();
    });
  }

  remove() {
    if (this.svg) this.svg.remove();
  }
}
