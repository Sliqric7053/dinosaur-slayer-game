import Ball from './ball';
import Paddle from './paddle';
import InputHandler from './input';
import Brick from './brick';
import { level1, level2, level3, buildLevel } from './levels';

const GAMESIZE = {
  x: 800,
  y: 600,
};

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

export default class Game {
  constructor() {
    this.gameWidth = GAMESIZE.x;
    this.gameHeight = GAMESIZE.y;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    new InputHandler(this.paddle, this);
    this.setupGame();
  }

  setupGame() {
    this.gameWidth = this.gameWidth;
    this.gameHeight = this.gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.gameObjects = [];
    this.lives = 3;
    this.bricks = [];
    this.currentLevel = 0;
    this.levels = [level1, level2, level3];
  }

  start() {
    // Only start game from MENU and NEWLEVEL
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.resetPositionAndSpeed();

    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER;
      console.log('gameover restart game');
      setTimeout(() => {
        window.location.reload(true);
      }, 2500);
      return;
    }

    // Tell the game to Pause
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    [...this.gameObjects, ...this.bricks].forEach(gameObject => {
      gameObject.update(deltaTime);
    });

    this.bricks = this.bricks.filter(brick => {
      return !brick.markedForDeletions;
    });

    if (this.bricks.length === 0) {
      if (this.levels.length < 1) return;

      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }
  }

  draw(ctx, canvas) {
    [...this.gameObjects, ...this.bricks].forEach(gameObject => {
      gameObject.draw(ctx);
    });

    if (this.gamestate === GAMESTATE.MENU) {
      // draw background
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fill();

      // write text
      ctx.font = '50px Helvetica Neue';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(
        'Hit SPACEBAR to begin',
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      ctx.font = '20px Helvetica Neue';
      ctx.fillText(
        'Hit ESC to Pause',
        this.gameWidth / 2,
        this.gameHeight / 2 + 90
      );
      ctx.font = '20px Helvetica Neue';
    }

    if (this.gamestate === GAMESTATE.PAUSED) {
      // this.page404(ctx, canvas)
      // draw background
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fill();

      // write text
      ctx.font = '50px Helvetica Neue';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Game Paused', this.gameWidth / 2, this.gameHeight / 2 + 90);
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      // draw background
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fill();

      // write text
      ctx.font = '50px Helvetica Neue';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      // if Paused, then unPause the game
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      // otherwise, Pause the game
      this.gamestate = GAMESTATE.PAUSED;
    }
  }

  page404(ctx, canvas) {
    // const canvas = document.getElementById('canvas');
    // const context = canvas.getContext('2d');
    const img = new Image();
    let w;
    let h;
    let glitchInterval;
    let offset;

    const init = () => {
      clearInterval(glitchInterval);
      canvas.width = w = window.innerWidth;
      offset = w * 0.1;

      canvas.height = h = ~~(650 * ((w - offset * 2) / img.width));

      glitchInterval = setInterval(() => {
        clear();
        ctx.drawImage(img, 0, 0, img.width, 750, offset, 0, w - offset * 2, h);
        setTimeout(glitchImg, randInt(250, 1000));
      }, 500);
    };

    const clear = () => {
      ctx.rect(0, 0, w, h);
      ctx.fill();
    };

    const glitchImg = () => {
      for (let i = 0; i < randInt(1, 13); i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const spliceWidth = w - x;
        const spliceHeight = randInt(5, h / 3);
        ctx.drawImage(
          canvas,
          0,
          y,
          spliceWidth,
          spliceHeight,
          x,
          y,
          spliceWidth,
          spliceHeight
        );
        ctx.drawImage(
          canvas,
          spliceWidth,
          y,
          x,
          spliceHeight,
          0,
          y,
          x,
          spliceHeight
        );
      }
    };

    const randInt = (a, b) => ~~(Math.random() * (b - a) + a);

    img.onload = () => {
      init();
      window.onresize = init;
    };

    img.src =
      'https://singaporefintech.org/wp-content/uploads/2017/11/Luno_Logo_Blue_Large-3.png';
  }
}
