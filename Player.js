import Gameboard from "./Gameboard"

class Player
{
    #gameboard
    #playerNumber = 1
    #isComputer = false

    constructor(playerNumber = 1, isComputer=false)
    {
        this.#playerNumber = playerNumber
        this.#isComputer = isComputer
    }

    createGameBoard(gameboardSize=9)
    {
        this.#gameboard = new Gameboard(gameboardSize)
    }
    
}