const {Player} = require("./Player")

class ComputerPlayer
{
    #difficulty = 1
    #hits = []
    
    constructor(difficulty=1)
    {
        this.#difficulty = 1
    }

    performAttack(enemyBoardState)
    {
        //TODO implement computerAI for targetting
    }
};

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
    #currShip=0
    #currentPlayer = 1
    #computerPlayer
    #shipPlaceVertical = false
    

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
            this.#computerPlayer = new ComputerPlayer(1)
        }
    }
    
    getCurrentShip()
    {
        if (this.allShipsPlaced())
        {
            console.log("All placed")
            return ["None", 0];
        }
        return this.#availableShips[this.#currShip]
    }

    incShip()
    {
        this.#currShip++;
    }

    resetCurrShip()
    {
        this.#currShip = 0
    }

    allShipsPlaced()
    {
        if (this.#currShip >= this.#availableShips.length)
        {
            return true;
        }
        return false;
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
        if (this.#playerOne.hasLost())
        {
            return 2
        }
        if (this.#playerTwo.hasLost())
        {
            return 1
        }
        
        return 0
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

    getCurrentPlayerNumber()
    {
        return this.#currentPlayer
    }

    isValidLocation(location=[0,0], length=0)
    {
        //If negative coords or coords exceed length, fail
        if ((location[0] < 0 || location[1] < 0) || (location[0] > 9 ||location[1] > 9))
        {
            return false
        }
        //If placing horizontal, check if longest part of ship is within bounds
        if (!this.#shipPlaceVertical && location[0]+length-1 < 9)
        {
            return true
        }
        //If placing vertical, check if longest part of ship is within bounds
        if (this.#shipPlaceVertical && location[1]+length-1 < 9)
        {
            return true
        }

        //If failed both previous checks, return false
        return false
    }

    setShipPlaceVertical(newVerticalBool)
    {
        this.#shipPlaceVertical = newVerticalBool
    }
    switchShipPlaceVertical()
    {
        this.#shipPlaceVertical = !this.#shipPlaceVertical
    }

    getIsVerticalRotation()
    {
        return this.#shipPlaceVertical
    }
}

export {Game}