export default class Airport {
  svg;
  runwaySize = {
    w: 668,
    h: 128
  };

  draw(canvas, position) {
    this.svg = canvas.image('/images/runway.svg', position.x - this.runwaySize.w / 6, position.y - this.runwaySize.h, this.runwaySize.w, this.runwaySize.h);
  }
}
