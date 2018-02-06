export default class KapitiBoat {
  svg;
  boatPosition;
  boatSize = {
    w: 120,
    h: 62
  };

  draw(canvas, position, revert) {
    if (this.svg) this.svg.remove();
    this.boatPosition = {
      x: position.x - (this.boatSize.w / 2),
      y: position.y - (this.boatSize.h / 2)
    };
    let src = '/images/kapiti-boat.svg';
    if (revert) {
      src = '/images/kapiti-boat-reverse.svg';
    }
    this.svg = canvas.image(src, this.boatSize.w, this.boatSize.h)
      .move(this.boatPosition.x, this.boatPosition.y);
    return this;
  }

  animate() {
    this.svg.animate(200, '-').move(this.boatPosition.x, this.boatPosition.y + 1).loop();
  }

  remove() {
    if (this.svg) this.svg.remove();
  }
}
