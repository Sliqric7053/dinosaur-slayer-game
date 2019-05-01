// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"v8Gh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectCollision = detectCollision;

/**
  Defines the parameter of the canvas in relation to the ball object
 *
 * @param {*} ball
 * @param {*} gameObject
 * @returns {*} boolean
 */
function detectCollision(ball, gameObject) {
  var bottomOfBall = ball.position.y + ball.size;
  var topOfBall = ball.position.y;
  var topOfObject = gameObject.position.y;
  var leftSideOfObject = gameObject.position.x;
  var rightSideOfObject = gameObject.position.x + gameObject.width;
  var bottomOfObject = gameObject.position.y + gameObject.height;

  if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && ball.position.x >= leftSideOfObject && ball.position.x + ball.size <= rightSideOfObject) {
    return true;
  } else {
    return false;
  }
}
},{}],"UD3n":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collisionDetection = require("./collisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball =
/*#__PURE__*/
function () {
  function Ball(game) {
    _classCallCheck(this, Ball);

    this.image = document.getElementById("ball-img");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.resetPositionAndSpeed();
    this.size = 20;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
  }, {
    key: "resetPositionAndSpeed",
    value: function resetPositionAndSpeed() {
      this.position = {
        x: 10,
        y: 400
      };
      this.speed = {
        x: 4,
        y: -2
      };
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y; // avoid ball going through the horizontal walls

      if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
        this.speed.x = -this.speed.x;
      } // top wall


      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      } // bottom wall


      if (this.position.y + this.size > this.gameHeight) {
        this.game.lives--;
        console.log("lives", this.game.lives);
        this.resetPositionAndSpeed();
      }

      if ((0, _collisionDetection.detectCollision)(this, this.game.paddle)) {
        this.speed.y = -this.speed.y;
        this.position.y = this.game.paddle.position.y - this.size;
      }
    }
  }]);

  return Ball;
}();

exports.default = Ball;
},{"./collisionDetection":"v8Gh"}],"qMRA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Paddle =
/*#__PURE__*/
function () {
  function Paddle(game) {
    _classCallCheck(this, Paddle);

    this.gameWidth = game.gameWidth; //   size of paddle

    this.width = 150;
    this.height = 20; // position of paddle

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    }; // velocity of paddle

    this.speed = 0;
    this.maxSpeed = 7;
  } // game controls


  _createClass(Paddle, [{
    key: "moveLeft",
    value: function moveLeft() {
      this.speed = -this.maxSpeed;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speed = this.maxSpeed;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.speed = 0;
    } // draw canvas

  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "goldenrod";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    } // update canvas

  }, {
    key: "update",
    value: function update(deltaTime) {
      // delta-time aka dt is the change in time ie how much time has past
      this.position.x += this.speed;
      this.position.x < 0 ? this.position.x = 0 : this.position.x;
      this.position.x + this.width > this.gameWidth ? this.position.x = this.gameWidth - this.width : this.position.x;
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;
},{}],"gFLk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHanlder = function InputHanlder(paddle, game) {
  _classCallCheck(this, InputHanlder);

  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37:
        paddle.moveLeft();
        break;

      case 39:
        paddle.moveRight();
        break;

      case 27:
        game.togglePause();
        break;

      case 32:
        game.start();
        break;
    }
  });
  document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
      //   move left
      case 37:
        if (paddle.speed < 0) paddle.stop();
        break;
      //  move right

      case 39:
        if (paddle.speed > 0) paddle.stop();
        break;
    }
  });
};

exports.default = InputHanlder;
},{}],"sWst":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collisionDetection = require("./collisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Brick =
/*#__PURE__*/
function () {
  function Brick(game, position) {
    _classCallCheck(this, Brick);

    this.image = document.getElementById("bitcoin-brick");
    this.game = game;
    this.width = 80;
    this.height = 24;
    this.position = position;
    this.markedForDeletions = false;
  }

  _createClass(Brick, [{
    key: "update",
    value: function update() {
      if ((0, _collisionDetection.detectCollision)(this.game.ball, this)) {
        this.game.ball.speed.y = -this.game.ball.speed.y;
        this.markedForDeletions = true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
  }]);

  return Brick;
}();

exports.default = Brick;
},{"./collisionDetection":"v8Gh"}],"2xgv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLevel = buildLevel;
exports.level3 = exports.level2 = exports.level1 = void 0;

var _brick = _interopRequireDefault(require("./brick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var level1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0, 1, 0, 1, 1], [1, 0, 1, 0, 1, 0, 1, 0, 1, 1], [1, 0, 1, 0, 0, 0, 1, 0, 1, 1], [1, 0, 0, 1, 1, 1, 1, 0, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
exports.level1 = level1;
var level2 = [[1, 1, 0, 1, 0, 0, 1, 1, 1, 1], [1, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 0, 1, 0, 1, 0, 1] // [0, 0, 0, 0, 0, 0, 0, 1, 1, 0]
];
exports.level2 = level2;
var level3 = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 1], [0, 1, 1, 1, 1, 1, 1, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 0, 1, 1, 1, 1, 1, 1, 0, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 0, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 0, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 0, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 0, 1] // [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
];
exports.level3 = level3;

function buildLevel(game, level) {
  var bricks = [];
  level.forEach(function (row, rowIndex) {
    row.forEach(function (brick, brickIndex) {
      var position = {
        x: 80 * brickIndex,
        y: 80 + 24 * rowIndex
      };

      if (brick === 1) {
        bricks.push(new _brick.default(game, position));
      }
    });
  });
  return bricks;
}
},{"./brick":"sWst"}],"HPsM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ball = _interopRequireDefault(require("./ball"));

var _paddle = _interopRequireDefault(require("./paddle"));

var _input = _interopRequireDefault(require("./input"));

var _brick = _interopRequireDefault(require("./brick"));

var _levels = require("./levels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GAMESIZE = {
  x: 800,
  y: 600
};
var GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);

    this.gameWidth = GAMESIZE.x;
    this.gameHeight = GAMESIZE.y;
    this.ball = new _ball.default(this);
    this.paddle = new _paddle.default(this);
    new _input.default(this.paddle, this);
    this.setupGame();
  }

  _createClass(Game, [{
    key: "setupGame",
    value: function setupGame() {
      this.gameWidth = this.gameWidth;
      this.gameHeight = this.gameHeight;
      this.gamestate = GAMESTATE.MENU;
      this.gameObjects = [];
      this.lives = 1;
      this.bricks = [];
      this.currentLevel = 0;
      this.levels = [_levels.level1, _levels.level2, _levels.level3];
    }
  }, {
    key: "start",
    value: function start() {
      // Only start game from MENU and NEWLEVEL
      if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;
      this.bricks = (0, _levels.buildLevel)(this, this.levels[this.currentLevel]);
      this.ball.resetPositionAndSpeed();
      this.gameObjects = [this.ball, this.paddle];
      this.gamestate = GAMESTATE.RUNNING;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      if (this.lives === 0) {
        this.gamestate = GAMESTATE.GAMEOVER;
        setTimeout(function () {
          window.location.reload(true);
        }, 2500), console.log('gameover restart game');
        return;
      } // Tell the game to Pause


      if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;
      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (gameObject) {
        gameObject.update(deltaTime);
      });
      this.bricks = this.bricks.filter(function (brick) {
        return !brick.markedForDeletions;
      });

      if (this.bricks.length === 0) {
        if (this.levels.length < 1) return;
        this.currentLevel++;
        this.gamestate = GAMESTATE.NEWLEVEL;
        this.start();
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx, canvas) {
      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (gameObject) {
        gameObject.draw(ctx);
      });

      if (this.gamestate === GAMESTATE.MENU) {
        // draw background
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fill(); // write text

        ctx.font = '50px Helvetica Neue';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Hit SPACEBAR to begin', this.gameWidth / 2, this.gameHeight / 2);
        ctx.font = '20px Helvetica Neue';
        ctx.fillText('Hit ESC to Pause', this.gameWidth / 2, this.gameHeight / 2 + 90);
        ctx.font = '20px Helvetica Neue';
      }

      if (this.gamestate === GAMESTATE.PAUSED) {
        // this.page404(ctx, canvas)
        // draw background
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fill(); // write text

        ctx.font = '50px Helvetica Neue';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Game Paused', this.gameWidth / 2, this.gameHeight / 2 + 90);
      }

      if (this.gamestate === GAMESTATE.GAMEOVER) {
        // draw background
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fill(); // write text

        ctx.font = '50px Helvetica Neue';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', this.gameWidth / 2, this.gameHeight / 2);
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.gamestate === GAMESTATE.PAUSED) {
        // if Paused, then unPause the game
        this.gamestate = GAMESTATE.RUNNING;
      } else {
        // otherwise, Pause the game
        this.gamestate = GAMESTATE.PAUSED;
      }
    }
  }, {
    key: "page404",
    value: function page404(ctx, canvas) {
      // const canvas = document.getElementById('canvas');
      // const context = canvas.getContext('2d');
      var img = new Image();
      var w;
      var h;
      var glitchInterval;
      var offset;

      var init = function init() {
        clearInterval(glitchInterval);
        canvas.width = w = window.innerWidth;
        offset = w * 0.1;
        canvas.height = h = ~~(650 * ((w - offset * 2) / img.width));
        glitchInterval = setInterval(function () {
          clear();
          ctx.drawImage(img, 0, 0, img.width, 750, offset, 0, w - offset * 2, h);
          setTimeout(glitchImg, randInt(250, 1000));
        }, 500);
      };

      var clear = function clear() {
        ctx.rect(0, 0, w, h);
        ctx.fill();
      };

      var glitchImg = function glitchImg() {
        for (var i = 0; i < randInt(1, 13); i++) {
          var x = Math.random() * w;
          var y = Math.random() * h;
          var spliceWidth = w - x;
          var spliceHeight = randInt(5, h / 3);
          ctx.drawImage(canvas, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
          ctx.drawImage(canvas, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
        }
      };

      var randInt = function randInt(a, b) {
        return ~~(Math.random() * (b - a) + a);
      };

      img.onload = function () {
        init();
        window.onresize = init;
      };

      img.src = 'https://singaporefintech.org/wp-content/uploads/2017/11/Luno_Logo_Blue_Large-3.png';
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./ball":"UD3n","./paddle":"qMRA","./input":"gFLk","./brick":"sWst","./levels":"2xgv"}],"H99C":[function(require,module,exports) {
"use strict";

var _game = _interopRequireDefault(require("./game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d"); // gives a rendering context for drawing onto the canvas

var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new _game.default(GAME_WIDTH, GAME_HEIGHT);
var lastTime = 0; // game loop  - runs every frame, updates all objects, redraws them into their new position, move to next frame

function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx, canvas);
  requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
},{"./game":"HPsM"}]},{},["H99C"], null)
//# sourceMappingURL=/src.a5873663.js.map