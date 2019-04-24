export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;

    //   size of paddle
    this.width = 150;
    this.height = 20;

    // position of paddle
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };

    // velocity of paddle
    this.speed = 0;
    this.maxSpeed = 7;
  }

  // game controls
  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  // draw canvas
  draw(ctx) {
    ctx.fillStyle = "goldenrod";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // update canvas
  update(deltaTime) {
    // delta-time aka dt is the change in time ie how much time has past

    this.position.x += this.speed;

    this.position.x < 0 ? (this.position.x = 0) : this.position.x;
    this.position.x + this.width > this.gameWidth
      ? (this.position.x = this.gameWidth - this.width)
      : this.position.x;
  }
}
