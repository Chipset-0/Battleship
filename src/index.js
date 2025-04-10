import "./css/styles.css";
import { createTileButton } from "./websiteLogic/uiFactory.js";

import {Player} from "./gameLogic/Player.js"

let p = Player(3)
let board = document.getElementsByClassName("board")

let b = createTileButton()

board.appendChild(b)

console.log(p.getPlayerNumber())