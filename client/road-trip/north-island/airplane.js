export default class Airplane {
  svg;
  landingSubject;
  airplaneSize = {
    w: 334,
    h: 128
  };

  constructor(landingSubject) {
    this.landingSubject = landingSubject;
  }

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
    this.svg.animate({ transform: `t-${window.innerWidth - this.airplaneSize.w},${window.innerHeight - this.airplaneSize.h - 64}` }, 4000, () => {
      this.landingSubject.next();
      this.svg.animate({ transform: `t-${window.innerWidth + this.airplaneSize.w},${window.innerHeight - this.airplaneSize.h - 64}` }, 3000, () => {
        this.svg.remove();
      });
    });
  }
}
