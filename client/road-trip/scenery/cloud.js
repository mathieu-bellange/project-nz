export default class Cloud {
  cloudPosition;
  cloudSize = {
    w: 167,
    h: 64
  };

  constructor() {
    if (window.innerWidth < 680) {
      this.cloudSize = {
        w: 125,
        h: 48
      };
    }
  }

  draw(canvas, position, sizeRatio, cloudIndexImg) {
    this.cloudPosition = position;
    this.svg = canvas.image(`/images/nuage_${cloudIndexImg}.svg`, this.cloudSize.w * sizeRatio, this.cloudSize.h * sizeRatio)
      .move(position.x - this.cloudSize.w, position.y);
  }

  animate(speedTransition) {
    this.svg.animate(speedTransition, '-').move(this.cloudPosition.x + window.innerWidth + this.cloudSize.w, this.cloudPosition.y).after(() => {
      this.svg.remove();
    });
  }
}
