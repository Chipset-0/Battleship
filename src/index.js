import "./css/styles.css";
const {createTileButton, createGamemodeSelect, createTurnCover} = require("./websiteLogic/uiFactory.js");
const {Player} = require("./gameLogic/Player.js")


let p = new Player(3)


let board = document.getElementById("main-board")
let cover = document.getElementsByClassName("screen-cover")[0]


console.log(p.getPlayerNumber())

