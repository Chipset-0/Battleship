import "./css/styles.css";
const { createTileButton } = require("./websiteLogic/uiFactory.js");
const {Player} = require("./gameLogic/Player.js")


let p = new Player(3)


let board = document.getElementById("main-board")
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