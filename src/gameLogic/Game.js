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

    constructor(isPvp=false)
    {
        this.#playerOne = new Player(1, false)
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
}