export default class Cloud {
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
    this.svg = canvas.image(`/images/nuage_${cloudIndexImg}.svg`, position.x - this.cloudSize.w, position.y, this.cloudSize.w * sizeRatio, this.cloudSize.h * sizeRatio);
  }

  animate(speedTransition) {
    this.svg.animate({ transform: `t${window.innerWidth + this.cloudSize.w},0` }, speedTransition, () => {
      this.svg.remove();
    });
  }
}
