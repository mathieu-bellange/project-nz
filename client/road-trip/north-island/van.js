// DONE offrir la posibilité de retourner le van
export default class Van {
  svg;
  vanSize = {
    w: 120,
    h: 62
  };

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

  remove() {
    if (this.svg) this.svg.remove();
  }
}
