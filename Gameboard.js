const {Ship} = require("./Ship");

class BoardTile
{
    #ship = null
    #hit = false
    #index = -1

    constructor(ship=null,hit=false,index=-1)
    {
        this.#ship = ship
        this.#hit=hit
        this.#index = index
    }

    updateWithShip(ship, index)
    {
        this.#ship = ship
        this.#index = index
    }

    isHit()
    {
        return this.#hit
    }

    hasShip()
    {
        return !(this.#ship == null)
    }


    hitTile()
    {
        this.#hit = true
        if (!this.hasShip())
        {
            return 0
        }

        this.#ship.hit(this.#index)

        if (!this.#ship.isSunk())
        {
            return 1
        }

        return 2
    }
}

class Gameboard
{
    #ships = []
    #board = []
    #size = 9

    #DEFAULT_BOARD_SPACE = {ship:null,hit:false,index:-1}

    constructor(size=9)
    {
        if (size < 2) { throw new Error("Invalid Size. Size cannot be less than 2") }
        for (let i = 0; i < size; i++)
        {
            let temp = []
            for (let j = 0; j < size; j++)
            {
                temp[j] = new BoardTile();
            }
            this.#board.push(temp)
        }
        this.#size = size
    }

    placeShip(shipType, location, isVertical=false)
    {
        let ship
        try
        {
            ship = new Ship(shipType)
        }
        catch (e) {
            return "Could not create ship with invalid ship type. " + e
        }
        if (!ship.isValidLocation(location, this.#size, isVertical))
        {
            return "Could not create ship at invalid location"
        }
        ship.setLocation(location, isVertical)
        for (let i = 0; i < ship.getLength(); i++)
        {
            if (isVertical)
            {
                this.#board[location[0]][location[1]+i].updateWithShip(ship, i)
            }
            else
            {
                this.#board[location[0]+i][location[1]].updateWithShip(ship, i)
            }
        }

        this.#ships.push(ship)
    }

    receiveAttack(location)
    {
        /*
        Function that takes a board location and checks if it was a miss, if it was a hit or if it was a hit that sunk a ship.
        It returns a number with 0 being miss, 1 being hit and 2 being a sinking hit.
        */
        return this.#board[location[0]][location[1]].hitTile()

    }

    allShipsSunk()
    {
        for (let i = 0; i < this.#ships.length; i++)
        {
            if (!this.#ships[i].isSunk())
            {
                return false
            }
        }

        return true
    }

    reset()
    {
        for (let i = 0; i < size; i++)
        {
            let temp = []
            for (let j = 0; j < size; j++)
            {
                temp[j] = new BoardTile();
            }
            this.#board.push(temp)
        }
    }

    getSize()
    {
        return this.#size
    }

    getShips()
    {
        return this.#ships
    }

    getBoard()
    {
        return this.#board
    }
};

module.exports = { Gameboard };