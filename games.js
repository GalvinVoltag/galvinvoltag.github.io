import { resources } from './resource.js';
import { AnimationFrames, Sprite, Area, TileMap, Player, GameSystem } from './sprite.js';
import { V2, R } from './sprite.js';


document.querySelectorAll(".tablink").forEach(element => {
  element.addEventListener('click', function () {
    var i, tabcontent, buttons;
    tabcontent = document.getElementsByClassName("tab_container");
    buttons = document.getElementsByClassName("tablink");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.add("hidden")
    }
    for (i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("tablink_active")
    }
    document.getElementById(this.id).classList.add("tablink_active")
    document.getElementById('tab' + this.id).classList.remove("hidden");

    // alert(document.getElementById('tab' + this.id).querySelector(".game-screen").id);
    gameLegend.enabled = false;
    gameBunker.enabled = false;
    canvas = document.getElementById('tab' + this.id).querySelector(".game-screen canvas");
    active = document.getElementById('tab' + this.id).querySelector(".game-screen").id;
    if (active = "game-legend") gameLegend.enabled = true;
    if (active = "game-bunkerss") gameBunker.enabled = true;
    ctx = canvas.getContext("2d");
  }, false);
});



var active;
var canvas = document.querySelector(".game-screen canvas");
var ctx = canvas.getContext("2d");
var gameLegend = new GameSystem(document.querySelector("#game-legend"), document.querySelector("#game-legend canvas").getContext("2d"), "#00FF00FF", 30, new Area(new R(0, 0, 100, -100), new V2(0, 0)));
var gameBunker = new GameSystem(document.querySelector("#game-bunker"), document.querySelector("#game-bunker canvas").getContext("2d"), "#0000BBFF", 30, new Area());

function StartGame() {

  gameLegend.Start();
  gameLegend.fps = 30;
  gameLegend.areas["def"].Register(
    new Sprite({
      resource: resources.images.ph,
      position: new V2(0, 60),
      frameSize: new V2(16, 16),
      scale: new V2(1, 1),
      frames: {
        0: new V2(1, 11),
        1: new V2(18, 11),
        2: new V2(35, 11),
        3: new V2(52, 11),
        4: new V2(69, 11),
        5: new V2(86, 11),
        6: new V2(103, 11),
        7: new V2(120, 11),
      },
      frame: 0,
      animations: {
        "walk_down": new AnimationFrames([0, 1], 0.3),
        "walk_up": new AnimationFrames([2, 3], 0.3),
        "walk_left": new AnimationFrames([4, 5], 0.3),
        "walk_right": new AnimationFrames([6, 7], 0.3),
      },
      currentAnimation: null
  }) );
  gameLegend.Register(
    new TileMap(
      new Sprite({
      resource: resources.images.tennasheet,
      position: new V2(),
      frameSize: new V2(16, 16),
      scale: new V2(1, 1),
      frames: {
        0: new V2(162, 259),
        1: new V2(18, 11),
        2: new V2(35, 11),
        3: new V2(52, 11),
        4: new V2(69, 11),
        5: new V2(86, 11),
        6: new V2(103, 11),
        7: new V2(120, 11),
      },
      frame: 0,
      animations: {
        "walk_down": new AnimationFrames([0, 1], 0.3),
        "walk_up": new AnimationFrames([2, 3], 0.3),
        "walk_left": new AnimationFrames([4, 5], 0.3),
        "walk_right": new AnimationFrames([6, 7], 0.3),
      },
      currentAnimation: null
  }),
      new V2(0, 0),
      [
        [0, 0, 0],
        [3, 3, 3],
        [4, 4, 4, 4]
      ]
    ), 0);
  gameLegend.Register(
    new Player(
      gameLegend,
      new Sprite({
      resource: resources.images.ph,
      position: new V2(),
      frameSize: new V2(16, 16),
      scale: new V2(1, 1),
      frames: {
        0: new V2(1, 11),
        1: new V2(18, 11),
        2: new V2(35, 11),
        3: new V2(52, 11),
        4: new V2(69, 11),
        5: new V2(86, 11),
        6: new V2(103, 11),
        7: new V2(120, 11),
      },
      frame: 0,
      animations: {
        "walk_down": new AnimationFrames([0, 1], 0.3),
        "walk_up": new AnimationFrames([2, 3], 0.3),
        "walk_left": new AnimationFrames([4, 5], 0.3),
        "walk_right": new AnimationFrames([6, 7], 0.3),
      },
      currentAnimation: null
  }),
      4
    ));

  gameBunker.Start();
  gameBunker.enabled = false;
  gameBunker.Register(
    new Player(
      gameBunker,
      new Sprite({
      resource: resources.images.playersheet,
      position: new V2(),
      frameSize: new V2(16, 16),
      scale: new V2(1, 1),
      frames: {
        0: new V2(1, 11),
        1: new V2(18, 11),
        2: new V2(35, 11),
        3: new V2(52, 11),
        4: new V2(69, 11),
        5: new V2(86, 11),
        6: new V2(103, 11),
        7: new V2(120, 11),
        8: new V2(1, 42),
      },
      frame: 0,
      animations: {
        "walk_down": new AnimationFrames([0, 8, 1, 8], 0.3),
        "walk_up": new AnimationFrames([2, 3], 0.3),
        "walk_left": new AnimationFrames([4, 5], 0.3),
        "walk_right": new AnimationFrames([6, 7], 0.3),
      },
      currentAnimation: null
  }),
      4
    ));
}

StartGame();