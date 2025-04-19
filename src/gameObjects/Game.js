const {Player} = require("./Player")

class ComputerPlayer
{
    #attackTarget
    
    getNextAttack()
    {

    }

    performAttack(enemyBoardState)
    {
        let hits = []
        let size = enemyBoardState.length
        for (let i = 0; i < size; i++)
        {
            for (let j = 0; j < size; j++)
            {
                if (enemyBoardState[i][j] === 1)
                {
                    hits.push([i,j])
                }
            }
        }

        //Check for unhit tiles near successful hits
        for (const hit of hits)
        {
            const [row, col] = hit
            //Check UP
            if (row-1 >= 0 && enemyBoardState[row-1][col]===-1)
            {
                return [row-1,col]
            }
            //Check DOWN

            if (row+1 < size && enemyBoardState[row+1][col]===-1)
            {
                return [row+1,col]
            }
            //Check LEFT
            if (col-1 >= 0 && enemyBoardState[row][col-1]===-1)
            {
                return [row,col-1]
            }
            //Check RIGHT
            if (col+1 < size && enemyBoardState[row][col+1]===-1)
            {
                return [row,col+1]
            }
        }

        //If there is no good targets, choose randomly
        
        let viableCells = []
        for (let i = 0; i < size; i++)
        {
            for (let j = 0; j < size; j++)
            {
                if (enemyBoardState[i][j] === -1)
                {
                    viableCells.push([i,j])
                }
            }
        }
        if (viableCells.length === 0)
        {
            console.log("No viable cell found")
            return null
        }

        let index = Math.round(Math.random()*viableCells.length)
        return viableCells[index]
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

    fireAttackComputer(location)
    {
        if (this.#isPvp)
        {
            return
        }
        this.#playerOne.receiveAttack(location)
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

    placeShip(location, playerNumber=0)
    {
        let player
        if (this.allShipsPlaced())
        {
            console.log("Attempted to place ship while all ships have been placed")
            return
        }

        if (playerNumber === 0 )
        {
            playerNumber = this.getCurrentPlayerNumber()
        }

        let ship = this.getCurrentShip()
        if (playerNumber === 1)
        {
            player = this.#playerOne
        }
        else
        {
            player = this.#playerTwo
        }

        if (this.isValidLocation(location, this.getCurrentShip()[1], playerNumber))
        {
            player.placeShip(ship[0],location, this.#shipPlaceVertical)
        }
        else
        {
            console.log("Did not place ship as location is invalid: " + location + "|" + ship[1])
        }
    }

    placeShipCurrent(location)
    {
        this.placeShip(location, this.getCurrentPlayerNumber())
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

    getComputerEnemyBoardState()
    {
        if (this.#isPvp)
        {
            return
        }
        return this.#playerTwo.getEnemyGameboard()
    }


    getPlayerEnemyBoardState()
    {
        return this.#playerOne.getEnemyGameboard()
    }

    getIsPvp()
    {
        return this.#isPvp
    }

    getCurrentPlayerNumber()
    {
        return this.#currentPlayer
    }

    isValidLocation(location=[0,0], length=0, playerNumber)
    {
        /*
            Checks if a location is a valid placement for a ship
        */ 
        let player
        if (playerNumber == 1)
        {
            player = this.#playerOne
        }
        else
        {
            player = this.#playerTwo
        }
        return player.isValidLocation(length, location, this.#shipPlaceVertical)
    }

    isValidLocationCurrent(location, length)
    {
        return this.isValidLocation(location, length, this.getCurrentPlayerNumber())
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

    autoPlaceShipsCurrent()
    {
        let origRotation = this.getIsVerticalRotation()
        while (!this.allShipsPlaced())
        {
            let ship = this.getCurrentShip()
            this.setShipPlaceVertical(Math.round(Math.random()))
            let row = Math.round(Math.random() * 8)
            let column = Math.round(Math.random() * 8)
    
            while (!this.isValidLocationCurrent([row,column], ship[1]))
            {
                row += 1
                if (row >= 9)
                {
                    row = 0
                    column += 1
                    if (column >= 9)
                    {
                        column = 0
                    }
                }
            }
            this.placeShipCurrent([row,column])
            this.incShip()
        }
        this.setShipPlaceVertical(origRotation)
    }

    autoPlaceShips(playerNumber)
    {
        let origRotation = this.getIsVerticalRotation()
        while (!this.allShipsPlaced())
        {
            let ship = this.getCurrentShip()
            this.setShipPlaceVertical(Math.round(Math.random()))
            let row = Math.round(Math.random() * 8)
            let column = Math.round(Math.random() * 8)
    
            while (!this.isValidLocation([row,column], ship[1], playerNumber))
            {
                row += 1
                if (row >= 9)
                {
                    row = 0
                    column += 1
                    if (column >= 9)
                    {
                        column = 0
                    }
                }
            }
            this.placeShip([row,column], playerNumber)
            this.incShip()
        }
        this.setShipPlaceVertical(origRotation)
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