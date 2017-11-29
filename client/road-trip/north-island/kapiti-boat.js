export default class KapitiBoat {
  svg;
  boatSize = {
    w: 120,
    h: 62
  };
  transformInstruction = '';

  draw(canvas, position, revert) {
    if (this.svg) this.svg.remove();
    let src = '/images/kapiti-boat.svg';
    if (revert) {
      src = '/images/kapiti-boat-reverse.svg';
    }
    this.svg = canvas.image(src, position.x - (this.boatSize.w / 2), position.y - (this.boatSize.h / 2), this.boatSize.w, this.boatSize.h);
    return this;
  }

  animate() {
    this.svg.animate({ transform: `${this.transformInstruction}t0,1` }, 100, () => {
      this.svg.animate({ transform: `${this.transformInstruction}t0,0` }, 100, () => this.animate());
    });
  }

  remove() {
    if (this.svg) this.svg.remove();
  }
}
