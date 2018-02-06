export default class Van {
  svg;
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
    let srcImage = '/images/van.svg';
    if (reverse) {
      srcImage = '/images/van-reverse.svg';
    }
    this.svg = canvas.image(srcImage, position.x - (this.vanSize.w / 2), position.y - (this.vanSize.h / 2), this.vanSize.w, this.vanSize.h);
    return this;
  }

  animate() {
    this.svg.animate({ transform: 't0,1' }, 100, () => {
      this.svg.animate({ transform: 't0,0' }, 100, () => this.animate());
    });
  }

  drive() {
    this.svg.stop();
    this.svg.animate({ transform: 't500,0' }, 1000, () => {
      this.svg.remove();
    });
  }

  remove() {
    if (this.svg) this.svg.remove();
  }
}
