const { Gameboard } = require("./Gameboard.js");

class Player
{
    #gameboard = new Gameboard()
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
        if (this.isValidLocation(0,location,false))
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
    

    isValidLocation(length, location, isVertical=false)
    {
        return this.#gameboard.isValidLocation(location,length,isVertical)
    }

    getPlayerNumber()
    {
        return this.#playerNumber
    }

    getShipStatus()
    {
        return this.#gameboard.getShipStatus()
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

    hasBeenAttacked(location)
    {
        return this.#gameboard.hasBeenAttacked(location)
    }

    hasLost()
    {
        return this.#gameboard.allShipsSunk()
    }

    clearGameboard()
    {
        this.#gameboard.reset()
    }
}

module.exports = { Player };