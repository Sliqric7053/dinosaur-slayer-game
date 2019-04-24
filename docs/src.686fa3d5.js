parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"v8Gh":[function(require,module,exports) {
"use strict";function i(i,o){var t=i.position.y+i.size,e=i.position.y,s=o.position.y,n=o.position.x,p=o.position.x+o.width,r=o.position.y+o.height;return t>=s&&e<=r&&i.position.x>=n&&i.position.x+i.size<=p}Object.defineProperty(exports,"__esModule",{value:!0}),exports.detectCollision=i;
},{}],"UD3n":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./collisionDetection");function i(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function t(e,i){for(var t=0;t<i.length;t++){var s=i[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function s(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}var o=function(){function t(e){i(this,t),this.image=document.getElementById("ball-img"),this.gameWidth=e.gameWidth,this.gameHeight=e.gameHeight,this.game=e,this.resetPositionAndSpeed(),this.size=20}return s(t,[{key:"draw",value:function(e){e.drawImage(this.image,this.position.x,this.position.y,this.size,this.size)}},{key:"resetPositionAndSpeed",value:function(){this.position={x:10,y:400},this.speed={x:4,y:-2}}},{key:"update",value:function(i){this.position.x+=this.speed.x,this.position.y+=this.speed.y,(this.position.x+this.size>this.gameWidth||this.position.x<0)&&(this.speed.x=-this.speed.x),this.position.y<0&&(this.speed.y=-this.speed.y),this.position.y+this.size>this.gameHeight&&(this.game.lives--,console.log("lives",this.game.lives),this.resetPositionAndSpeed()),(0,e.detectCollision)(this,this.game.paddle)&&(this.speed.y=-this.speed.y,this.position.y=this.game.paddle.position.y-this.size)}}]),t}();exports.default=o;
},{"./collisionDetection":"v8Gh"}],"qMRA":[function(require,module,exports) {
"use strict";function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function e(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var s=function(){function i(e){t(this,i),this.gameWidth=e.gameWidth,this.width=150,this.height=20,this.position={x:e.gameWidth/2-this.width/2,y:e.gameHeight-this.height-10},this.speed=0,this.maxSpeed=7}return e(i,[{key:"moveLeft",value:function(){this.speed=-this.maxSpeed}},{key:"moveRight",value:function(){this.speed=this.maxSpeed}},{key:"stop",value:function(){this.speed=0}},{key:"draw",value:function(t){t.fillStyle="goldenrod",t.fillRect(this.position.x,this.position.y,this.width,this.height)}},{key:"update",value:function(t){this.position.x+=this.speed,this.position.x<0?this.position.x=0:this.position.x,this.position.x+this.width>this.gameWidth?this.position.x=this.gameWidth-this.width:this.position.x}}]),i}();exports.default=s;
},{}],"gFLk":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=function t(s,a){e(this,t),document.addEventListener("keydown",function(e){switch(e.keyCode){case 37:s.moveLeft();break;case 39:s.moveRight();break;case 27:a.togglePause();break;case 32:a.start()}}),document.addEventListener("keyup",function(e){switch(e.keyCode){case 37:s.speed<0&&s.stop();break;case 39:s.speed>0&&s.stop()}})};exports.default=t;
},{}],"sWst":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./collisionDetection");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}var o=function(){function i(e,n){t(this,i),this.image=document.getElementById("bitcoin-brick"),this.game=e,this.width=80,this.height=24,this.position=n,this.markedForDeletions=!1}return n(i,[{key:"update",value:function(){(0,e.detectCollision)(this.game.ball,this)&&(this.game.ball.speed.y=-this.game.ball.speed.y,this.markedForDeletions=!0)}},{key:"draw",value:function(e){e.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)}}]),i}();exports.default=o;
},{"./collisionDetection":"v8Gh"}],"2xgv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildLevel=u,exports.level3=exports.level2=exports.level1=void 0;var e=r(require("./brick"));function r(e){return e&&e.__esModule?e:{default:e}}var t=[[1,1,1,1,1,1,1,1,1,1],[1,0,1,0,1,0,1,0,1,1],[1,0,1,0,1,0,1,0,1,1],[1,0,1,0,0,0,1,0,1,1],[1,0,0,1,1,1,1,0,0,1],[1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1]];exports.level1=t;var l=[[1,1,0,1,0,0,1,1,1,1],[1,1,0,1,0,1,0,1,0,1],[1,1,1,1,1,1,1,1,1,1],[1,1,0,1,1,1,0,1,0,1],[1,1,1,1,1,1,1,1,1,1],[1,1,0,1,1,1,0,1,0,1],[1,1,1,1,1,1,1,1,1,1],[1,1,0,1,0,1,0,1,0,1]];exports.level2=l;var o=[[0,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,1],[0,0,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,1],[0,1,1,1,1,1,1,0,1,1],[0,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,0,1,1],[1,0,1,1,1,1,1,1,0,1],[0,1,0,1,1,1,1,1,1,0],[1,1,1,0,1,1,1,1,0,1],[1,1,1,1,0,1,1,0,1,1],[1,1,1,1,1,0,0,1,1,1],[1,1,1,1,0,1,1,0,1,1],[1,1,1,0,1,1,1,1,0,1]];function u(r,t){var l=[];return t.forEach(function(t,o){t.forEach(function(t,u){var v={x:80*u,y:80+24*o};1===t&&l.push(new e.default(r,v))})}),l}exports.level3=o;
},{"./brick":"sWst"}],"HPsM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=n(require("./ball")),e=n(require("./paddle")),i=n(require("./input")),a=n(require("./brick")),s=require("./levels");function n(t){return t&&t.__esModule?t:{default:t}}function r(t){return o(t)||h(t)||l()}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function h(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function o(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function g(t,e,i){return e&&c(t.prototype,e),i&&c(t,i),t}var f,m={PAUSED:0,RUNNING:1,MENU:2,GAMEOVER:3,NEWLEVEL:4};fetch("https://api.mybitx.com/api/1/ticker?pair=XBTZAR").then(function(t){200===t.status?t.json().then(function(t){f=t.last_trade?t.last_trade:"Bullocks - Not available at the moment :("}):console.log("Error, Status Code: "+t.status)}).catch(function(t){console.log("Fetch Error: ",t)});var d=function(){function a(s,n){u(this,a),this.ball=new t.default(this),this.paddle=new e.default(this),new i.default(this.paddle,this),this.setupGame()}return g(a,[{key:"setupGame",value:function(){this.gameWidth=this.gameWidth,this.gameHeight=this.gameHeight,this.gamestate=m.MENU,this.gameObjects=[],this.lives=3,this.bricks=[],this.currentLevel=0,this.levels=[s.level1,s.level2,s.level3]}},{key:"start",value:function(){this.gamestate!==m.MENU&&this.gamestate!==m.NEWLEVEL||(this.bricks=(0,s.buildLevel)(this,this.levels[this.currentLevel]),this.ball.resetPositionAndSpeed(),this.gameObjects=[this.ball,this.paddle],this.gamestate=m.RUNNING)}},{key:"update",value:function(t){if(0===this.lives)return this.gamestate=m.GAMEOVER,void console.log("gameover restart game");if(this.gamestate!==m.PAUSED&&this.gamestate!==m.MENU&&this.gamestate!==m.GAMEOVER&&([].concat(r(this.gameObjects),r(this.bricks)).forEach(function(e){e.update(t)}),this.bricks=this.bricks.filter(function(t){return!t.markedForDeletions}),0===this.bricks.length)){if(this.levels.length<1)return;this.currentLevel++,this.gamestate=m.NEWLEVEL,this.start()}}},{key:"draw",value:function(t,e){[].concat(r(this.gameObjects),r(this.bricks)).forEach(function(e){e.draw(t)}),this.gamestate===m.MENU&&(t.rect(0,0,this.gameWidth,this.gameHeight),t.fillStyle="rgba(0, 0, 0, 1)",t.fill(),t.font="50px Helvetica Neue",t.fillStyle="white",t.textAlign="center",t.fillText("Hit SPACEBAR to begin",this.gameWidth/2,this.gameHeight/2),t.font="20px Helvetica Neue",t.fillText("Hit ESC to Pause",this.gameWidth/2,this.gameHeight/2+90),t.font="20px Helvetica Neue",t.fillText("Bitcoin to ZAR: "+f,this.gameWidth/2,this.gameHeight/2-250)),this.gamestate===m.PAUSED&&(t.rect(0,0,this.gameWidth,this.gameHeight),t.fillStyle="rgba(0, 0, 0, 0.5)",t.fill(),t.font="50px Helvetica Neue",t.fillStyle="white",t.textAlign="center",t.fillText("Game Paused",this.gameWidth/2,this.gameHeight/2+90)),this.gamestate===m.GAMEOVER&&(t.rect(0,0,this.gameWidth,this.gameHeight),t.fillStyle="rgba(0, 0, 0, 1)",t.fill(),t.font="50px Helvetica Neue",t.fillStyle="white",t.textAlign="center",t.fillText("Game Over",this.gameWidth/2,this.gameHeight/2))}},{key:"togglePause",value:function(){this.gamestate===m.PAUSED?this.gamestate=m.RUNNING:this.gamestate=m.PAUSED}},{key:"page404",value:function(t,e){var i,a,s,n,r=new Image,l=function(){clearInterval(s),e.width=i=window.innerWidth,n=.1*i,e.height=a=~~((i-2*n)/r.width*650),s=setInterval(function(){h(),t.drawImage(r,0,0,r.width,750,n,0,i-2*n,a),setTimeout(o,u(250,1e3))},500)},h=function(){t.rect(0,0,i,a),t.fill()},o=function(){for(var s=0;s<u(1,13);s++){var n=Math.random()*i,r=Math.random()*a,l=i-n,h=u(5,a/3);t.drawImage(e,0,r,l,h,n,r,l,h),t.drawImage(e,l,r,n,h,0,r,n,h)}},u=function(t,e){return~~(Math.random()*(e-t)+t)};r.onload=function(){l(),window.onresize=l},r.src="https://singaporefintech.org/wp-content/uploads/2017/11/Luno_Logo_Blue_Large-3.png"}}]),a}();exports.default=d;
},{"./ball":"UD3n","./paddle":"qMRA","./input":"gFLk","./brick":"sWst","./levels":"2xgv"}],"H99C":[function(require,module,exports) {
"use strict";var e=t(require("./game"));function t(e){return e&&e.__esModule?e:{default:e}}var n=document.getElementById("gameScreen"),r=n.getContext("2d"),a=800,u=600,d=new e.default(a,u),i=0;function m(e){var t=e-i;i=e,r.clearRect(0,0,a,u),d.update(t),d.draw(r,n),requestAnimationFrame(m)}window.requestAnimationFrame(m);
},{"./game":"HPsM"}]},{},["H99C"], null)
//# sourceMappingURL=/src.686fa3d5.js.map