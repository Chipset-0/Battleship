import "./css/styles.css";
import { createTileButton } from "./websiteLogic/uiFactory.js";
import {Player} from "./gameLogic/Player.js"


let p = new Player(3)


let board = document.getElementsByClassName("board")[0]
p.receiveAttack([2,1])
let boardState = p.getOwnGameboard()

for (let i = 0; i < 9; i++)
{
    for (let j = 0; j < 9; j++)
    {
        board.appendChild(createTileButton(p, [i,j], boardState[i][j]))
    }
}

console.log(p.getPlayerNumber())