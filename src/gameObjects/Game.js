const {Player} = require("./Player")

class Game
{
    #playerOne
    #playerTwo
    #isPvp = false
    #availableShips =[
        ["Carrier", 5],
        ["Destroyer", 4],
        ["Sub", 3],
        ["Tug", 2]
    ]
    #currShipFirst = 0;
    #currShipSecond = 0;
    #currentPlayer = 1

    constructor(isPvp=false)
    {
        this.#playerOne = new Player(1, false)
        this.#isPvp = isPvp

        if (isPvp)
        {
            this.#playerTwo = new Player(2, false)
        }
        else
        {
            this.#playerTwo = new Player(2, true)
        }
    }
    
    getCurrentShip(playerNumber)
    {
        if (playerNumber == 1)
        {
            return this.#availableShips[this.#currShipFirst]
        }
        else
        {
            return this.#availableShips[this.#currShipSecond]
        }
    }

    placeShip(playerNumber, location)
    {
        let player
        if (playerNumber = 1)
        {
            player = this.#playerOne
        }
        else
        {
            player = this.#playerTwo
        }

    }

    switchPlayer()
    {
        if (this.#currentPlayer == 1)
        {
            this.#currentPlayer = 2
            return this.#playerTwo
        }
        else
        {
            this.#currentPlayer = 1
            return this.#playerOne
        }
        
    }

    checkIfWon()
    {
        
    }

    getPlayer(playerNumber)
    {
        if (playerNumber == 1)
        {
            return this.#playerOne
        }
        else
        {
            return this.#playerTwo
        }
    }

    getBoardState(playerNumber)
    {
        //Gets the board state visible to the player with the given player number
        if (playerNumber==1)
        {
            return this.#playerOne.getOwnGameboard()
        }
        else
        {
            return this.#playerTwo.getOwnGameboard()
        }
    }

    getEnemyBoardState(playerNumber)
    {
        //Gets the board state of the player with the given player number from the enemy point of view
        if (playerNumber==1)
        {
            return this.#playerOne.getEnemyGameboard()
        }
        else
        {
            return this.#playerTwo.getEnemyGameboard()
        }
    }

    getIsPvp()
    {
        return this.#isPvp
    }

}