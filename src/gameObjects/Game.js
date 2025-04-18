const {Player} = require("./Player")

class ComputerPlayer
{
    
    constructor()
    {
    }

    performAttack(enemyBoardState)
    {
        //TODO implement computerAI for targeting

        //Find all successful hit tiles

        let hits = []
        for (let i = 0; i < enemyBoardState.length; i++)
        {
            for (let j = 0; j < enemyBoardState.length; j++)
            {
                if (enemyBoardState[i][j] == 1)
                {
                    hits.push([i,j])
                }
            }
        }

        //Check for unhit tiles near successful hits
        for (let i = 0;i < hits.length; i++)
        {
            let hit = hits[i]
            if (enemyBoardState[hit[0]][hit[1]] == -1)
            {
                return hit
            }
        }

        //If there is no good targets, choose randomly
        while (true)
        {
            let x = Math.floor(9*Math.random())
            let y = Math.floor(9*Math.random())
            if (enemyBoardState[x][y] == -1)
            {
                fired=true
                return [x,y]
            }
        }
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
    

    constructor(isPvp=true)
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

    fireAttack(location)
    {
        let enemy
        if (this.getCurrentPlayerNumber() == 2)
        {
            enemy = this.#playerOne
        }
        else
        {
            enemy = this.#playerTwo
        }

        enemy.receiveAttack(location)
    }

    hasBeenAttacked(location)
    {
        let enemy
        if (this.getCurrentPlayerNumber() == 2)
        {
            enemy = this.#playerOne
        }
        else
        {
            enemy = this.#playerTwo
        }
        return enemy.hasBeenAttacked(location)
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

    placeShip(location)
    {
        let player
        if (this.allShipsPlaced())
        {
            console.log("Attempted to place ship while all ships have been placed")
            return
        }
        let ship = this.getCurrentShip()
        if (this.getCurrentPlayerNumber()==1)
        {
            player = this.#playerOne
        }
        else
        {
            player = this.#playerTwo
        }

        if (this.isValidLocation(location, this.getCurrentShip()[1]))
        {

    
            player.placeShip(ship[0],location, this.#shipPlaceVertical)
        }
        else
        {
            console.log("Did not place ship as location is invalid: " + location + "|" + ship[1])
        }
    }

    getShipStatus()
    {
        let player
        if (this.#currentPlayer == 1)
        {
            player = this.#playerOne
        }
        else
        {
            player = this.#playerTwo
        }

        return player.getShipStatus()
    }

    switchPlayer()
    {
        if (this.#currentPlayer == 1)
        {
            this.#currentPlayer = 2
        }
        else
        {
            this.#currentPlayer = 1
        }
        return this.#currentPlayer
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

    getBoardState()
    {
        //Gets the board state visible to the player with the given player number
        if (this.#currentPlayer==1)
        {
            return this.#playerOne.getOwnGameboard()
        }
        else
        {
            return this.#playerTwo.getOwnGameboard()
        }
    }

    getEnemyBoardState()
    {
        //Gets the board state of the player with the given player number from the enemy point of view
        if (this.#currentPlayer==2)
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
        /*
            Checks if a location is a valid placement for a ship
        */ 
        let player
        if (this.#currentPlayer == 1)
        {
            player = this.#playerOne
        }
        else
        {
            player = this.#playerTwo
        }
        return player.isValidLocation(length, location, this.#shipPlaceVertical)
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

    autoPlaceShips(playerNumber)
    {
        //TODO

        console.log("Auto Placing Ships for player" + playerNumber)
    }

    clearShips(playerNumber)
    {
        if (playerNumber==1)
        {
            this.#playerOne.clearGameboard()
        }
        else
        {
            this.#playerTwo.clearGameboard()
        }
        this.resetCurrShip()
    }

    resetCurrShip()
    {
        this.#currShip = 0
    }
    
}

export {Game, ComputerPlayer}