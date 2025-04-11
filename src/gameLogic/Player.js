import { Gameboard } from "./Gameboard.js";

class Player
{
    #gameboard = null
    #playerNumber = 1
    #isComputer = false

    constructor(playerNumber = 1, isComputer=false, gameboardSize=9)
    {
        this.#playerNumber = playerNumber
        this.#isComputer = isComputer
        this.createGameBoard(gameboardSize)
    }

    createGameBoard(gameboardSize=9)
    {
        this.#gameboard = new Gameboard(gameboardSize)
    }

    receiveAttack(location)
    {
        if (location.length == 2 && this.#gameboard.length > location[0] && location[0] > 0 && this.#gameboard.length > location[1] && location[1] > 0)
        {
            this.#gameboard.receiveAttack(location)
        }
        else
        {
            console.log("Invalid location received: " + location)
        }
    }

    placeShip(shipType, location, orientation)
    {
        let result = this.#gameboard.placeShip(shipType, location, orientation)
        if (result != "")
        {
            console.log(result)
        }
    }   

    getPlayerNumber()
    {
        return this.#playerNumber
    }

    getIsComputer()
    {
        return this.#isComputer
    }
    
    getOwnGameboard()
    {
        /*
        Returns a gameboard that is shown to this player (Shows received hits, all ships)
        */
       return this.#gameboard.getPlayerBoard()
    }

    getEnemyGameboard()
    {
        /*
        Returns a gameboard that is shown to the enemy player (Shows hits, sunk ships)
        */
        return this.#gameboard.getEnemyBoard()
    }
}

export { Player };