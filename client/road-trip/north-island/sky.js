import Cloud from './cloud';

export default class Sky {
  canvas;
  position;
  continueSpawing;

  randomYPosition = function randomYPosition(positionY) {
    return (positionY - (window.innerHeight / 2)) + (Math.random() * window.innerHeight);
  }
  randomSpeedTransition = function randomSpeedTransition() {
    return (Math.random() * (10000 - 5000)) + 5000;
  }
  randomCloudSize = function randomCloudSize() {
    return (Math.random() * (2 - 1)) + 1;
  }
  randomCloudImg = function randomCloudImg() {
    return Math.floor((Math.random() * (3 - 1)) + 1);
  }
  randomCloudSpawning = function randomCloudSpawning() {
    return Math.floor((Math.random() * (3000 - 1000)) + 1000);
  }

  constructor(canvas, position) {
    this.canvas = canvas;
    this.position = position;
  }

  drawCloud() {
    const cloud = new Cloud();
    cloud.draw(
      this.canvas,
      {
        x: this.position.x - (window.innerWidth / 2),
        y: this.randomYPosition(this.position.y)
      },
      this.randomCloudSize(),
      this.randomCloudImg()
    );
    cloud.animate(this.randomSpeedTransition());
  }

  animate(timeBetweenCloud) {
    setTimeout(() => {
      if (this.continueSpawing) {
        this.drawCloud();
        this.animate(this.randomCloudSpawning());
      }
    }, timeBetweenCloud);
  }

  launch() {
    this.continueSpawing = true;
    this.animate(0);
  }

  stop() {
    this.continueSpawing = false;
  }
}
