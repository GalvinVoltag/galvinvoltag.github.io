
function start() {
}
window.onload = start;

function openTab(id) {
  var i, tabcontent, buttons;
  tabcontent = document.getElementsByClassName("tab_container");
  buttons = document.getElementsByClassName("tablink");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.add("hidden")
  }
  for (i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("tablink_active")
  }
  document.getElementById('btn' + id).classList.add("tablink_active")
  document.getElementById('tab' + id).classList.remove("hidden");
  window.scrollTo(0, 0)
}


const keys = {};
const game_data = {
  "game-legend":{
    "player": {"pos": [300,300], "speed": 8},
    "world": {"pos": [0,0]},
    "rounding": 4
  },
  "game-bunker": {
    "player": {"pos": [0,0], "speed": 8},
    "world": {"pos": [0,0]},
    "rounding": 4
  },
  "game-victim": {
    "player": {"pos": [0,0], "speed": 8},
    "world": {"pos": [0,0]},
    "rounding": 4
  }
}
var active;

document.addEventListener('keydown', (e) => {
  if (document.activeElement == document.getElementById(active)) {
    e.preventDefault();
    keys[e.key] = true;
  }
});
document.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

function PlayerCollision() {
  var bools = false;
  var els = document.getElementsByClassName("collider");
  Array.from(els).forEach(element => {
    var prect = document.getElementById(active).querySelector("#player").getBoundingClientRect();
    var erect = element.getBoundingClientRect();
    if (prect.right > erect.left && prect.left < erect.right && prect.top < erect.bottom && prect.bottom > erect.top) {
      bools = true;
    }
  });
  return bools;
}

function UpdateTriggers() {
  var els = document.getElementsByClassName("trigger");
  Array.from(els).forEach(element => {
    var prect = document.getElementById(active).querySelector("#player").getBoundingClientRect();
    var erect = element.getBoundingClientRect();
    if (prect.right > erect.left && prect.left < erect.right && prect.top < erect.bottom && prect.bottom > erect.top) {
      eval(element.dataset.func);
      if (element.dataset.onetime == 1) element.style.display = "none";
    }
  });
}

function DoIt() {
  // alert("done");
  game_data[active]["world"]["pos"] = [100,100];
}

function GetAxis(x, y) {
  if (x&y) {
    return 0;
  } else if (y) {
    return -1;
  } else if (x) {
    return 1;
  } else {
    return 0;
  }
}

function PlayerUpdate(deltaTime) {
  var gm = game_data[active];
  gm["player"]["pos"][0] +=
  deltaTime*gm["player"]["speed"]*GetAxis(keys["ArrowRight"], keys["ArrowLeft"]);
  document.getElementById(active).querySelector("#player").style.transform = `translate(${Math.round(game_data[active]["player"]["pos"][0]/game_data[active]["rounding"])*game_data[active]["rounding"]}px, ${Math.round(game_data[active]["player"]["pos"][1]/game_data[active]["rounding"])*game_data[active]["rounding"]}px)`;
  if (PlayerCollision()) {
    gm["player"]["pos"][0] -=
    deltaTime*gm["player"]["speed"]*GetAxis(keys["ArrowRight"], keys["ArrowLeft"]);
  }
  gm["player"]["pos"][1] +=
  deltaTime*gm["player"]["speed"]*GetAxis(keys["ArrowDown"], keys["ArrowUp"]);
  document.getElementById(active).querySelector("#player").style.transform = `translate(${Math.round(game_data[active]["player"]["pos"][0]/game_data[active]["rounding"])*game_data[active]["rounding"]}px, ${Math.round(game_data[active]["player"]["pos"][1]/game_data[active]["rounding"])*game_data[active]["rounding"]}px)`;
  if (PlayerCollision()) {
    gm["player"]["pos"][1] -=
    deltaTime*gm["player"]["speed"]*GetAxis(keys["ArrowDown"], keys["ArrowUp"]);
  }
  document.getElementById(active).querySelector("#player").style.transform = `translate(${Math.round(game_data[active]["player"]["pos"][0]/game_data[active]["rounding"])*game_data[active]["rounding"]}px, ${Math.round(game_data[active]["player"]["pos"][1]/game_data[active]["rounding"])*game_data[active]["rounding"]}px)`;
  document.getElementById(active).querySelector(".world").style.transform = `translate(${Math.round(game_data[active]["world"]["pos"][0])}px, ${Math.round(game_data[active]["world"]["pos"][1])}px)`;
  UpdateTriggers();
}

var lastUpdate = Date.now();

function MainLoop() {
  var now = Date.now();
  var deltaTime = (now - lastUpdate) / 100;
  lastUpdate = now;
  PlayerUpdate(deltaTime);
  requestAnimationFrame(MainLoop)
}

function StartGame(ts) {
  ts.focus();
  active = ts.id;
  MainLoop();
}

function Awake() {
  document.getElementById(active).querySelector("#player").style.transform = `translate(${Math.round(game_data[active]["player"]["pos"][0]/game_data[active]["rounding"])*game_data[active]["rounding"]}px, ${Math.round(game_data[active]["player"]["pos"][1]/game_data[active]["rounding"])*game_data[active]["rounding"]}px)`;
  document.getElementById(active).querySelector(".world").style.transform = `translate(${Math.round(game_data[active]["world"]["pos"][0])}px, ${Math.round(game_data[active]["world"]["pos"][1])}px)`;
}

Awake();