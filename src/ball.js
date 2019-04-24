import { detectCollision } from "./collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("ball-img");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.resetPositionAndSpeed();
    this.size = 20;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  resetPositionAndSpeed() {
    this.position = {
      x: 10,
      y: 400
    };

    this.speed = {
      x: 4,
      y: -2
    };
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // avoid ball going through the horizontal walls
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // top wall
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // bottom wall
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      console.log("lives", this.game.lives);
      this.resetPositionAndSpeed();
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
