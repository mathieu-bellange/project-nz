export default class Airplane {
  svg;
  airplaneSize = {
    w: 334,
    h: 128
  };

  draw(canvas, position) {
    this.svg = canvas.image('/images/airplane.svg', position.x - (this.airplaneSize.w / 2), position.y - (this.airplaneSize.h / 2), this.airplaneSize.w, this.airplaneSize.h);
  }

  animate() {
    this.svg.animate({ transform: 't0,25' }, 1000, () => {
      this.svg.animate({ transform: 't0,-25' }, 2000, () => {
        this.svg.animate({ transform: 't0,0' }, 1000, () => this.animate());
      });
    });
  }

  stopAnimation() {
    this.svg.stop();
  }

  landing() {
    this.svg.animate({ transform: 't-300,300' }, 2000, () => {
      this.svg.animate({ transform: 't-10000,0' }, 50000);
    });
  }
}
