export default class Airplane {
  svg;
  landingSubject;
  flyPosition;
  airplaneSize = {
    w: 334,
    h: 128
  };

  constructor(landingSubject) {
    this.landingSubject = landingSubject;
    if (window.innerWidth < 680) {
      this.airplaneSize = {
        w: 250,
        h: 96
      };
    }
  }

  draw(canvas, position) {
    this.flyPosition = position;
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

  landing(position) {
    const landingXBis = position.x - this.flyPosition.x;
    const landingYBis = position.y - this.flyPosition.y - 64;
    this.svg.animate({ transform: `t${landingXBis},${landingYBis}` }, 4000, () => {
      this.landingSubject.next();
      this.svg.animate({ transform: `t${landingXBis - (window.innerWidth / 2)  - this.airplaneSize.w},${landingYBis}` }, 3000, () => {
        this.svg.remove();
      });
    });
  }
}
