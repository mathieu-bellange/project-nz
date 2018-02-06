// PLANNING accélérer l'animation de l'avion sous basse résolution trello:#79
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

  draw(draw, position) {
    this.flyPosition = {
      x: position.x - (this.airplaneSize.w / 2),
      y: position.y - (this.airplaneSize.h / 2)
    };
    this.svg = draw.image('/images/airplane.svg', this.airplaneSize.w, this.airplaneSize.h)
      .move(this.flyPosition.x, this.flyPosition.y);
  }

  animate() {
    this.svg.animate(1000, '-').move(this.flyPosition.x, this.flyPosition.y + 25).after(() => {
      this.svg.animate(2000, '-').move(this.flyPosition.x, this.flyPosition.y - 25).after(() => {
        this.svg.animate(1000, '-').move(this.flyPosition.x, this.flyPosition.y).after(() => this.animate());
      });
    });
  }

  stopAnimation() {
    this.svg.stop();
  }

  landing(position) {
    this.svg.stop();
    this.svg.animate(4000, '-').move(position.x, position.y - this.airplaneSize.h).after(() => {
      this.landingSubject.next();
      this.svg.animate(3000, '-').move(position.x - (window.innerWidth / 2) - this.airplaneSize.w, position.y - this.airplaneSize.h).after(() => {
        this.svg.remove();
      });
    });
  }
}
