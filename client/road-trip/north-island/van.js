export default class Van {
  svg;
  vanSize = {
    w: 120,
    h: 62
  };

  draw(canvas, position) {
    if (this.svg) this.svg.remove();
    this.svg = canvas.image('/images/van.svg', position.x, position.y - (this.vanSize.h / 2), this.vanSize.w, this.vanSize.h);
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
