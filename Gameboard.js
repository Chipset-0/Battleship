import Ship from "./Ship"

class Gameboard
{
    #ships = []
    #board = [[]]
    #size = 9

    #DEFAULT_BOARD_SPACE = {ship:null,hit:false,index:-1}

    constructor(size=9)
    {
        this.#board = Array(size).fill(Array(size).fill(this.#DEFAULT_BOARD_SPACE))
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
                let tile = this.#board[location[0]][location[1]+i]
                tile.ship = ship
                tile.index = i
                tile.hit = false
            }
            else
            {
                let tile = this.#board[location[0]+i][location[1]]
                tile.ship = ship
                tile.index = i
                tile.hit = false
            }
        }

        this.#ships.push(ship)
    }

    receiveAttack(location)
    {
        let hitTile = this.#board[location[0]][location[1]]

        tile.hit = true
        if (hitTile.ship == null)
        {
            return "Miss at " + location
        }
        else
        {
            hitTile.ship.hit(hitTile.index)
            if (hitTile.ship.isSunk())
            {
                return "Hit and sunk a " + hitTile.ship.getName() + " at " + location + "!"
            }
            return "Hit a " + hitTile.ship.getName() + " at " + location
        }
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
        this.#board = Array(size).fill(Array(size).fill(this.#DEFAULT_BOARD_SPACE))
    }
}