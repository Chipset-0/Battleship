const {Gameboard} = require("./Gameboard");

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
        this.#gameboard.receiveAttack(location)
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

let p = new Player(1,false,4)
p.placeShip("Tug", [1,1], false)
p.receiveAttack([1,1])
console.log(p.getEnemyGameboard())
console.log(p.getOwnGameboard())