class Ship
{
    #name
    #length
    #isVertical
    #boardLocation
    #hitSections

    constructor(shipType)
    {
        switch (shipType.toUpperCase())
        {
            case "TUG":
                this.#name = "Tug"
                this.#length = 2
                break;

            case "SUB":
                this.#name = "Submarine"
                this.#length = 3
                break;

            case "DESTROYER":
                this.#name = "Destroyer"
                this.#length = 4
                break;

            case "CARRIER":
                this.#name = "Carrier"
                this.#length = 5
                break;

            default:
                throw new Error("Incorrect ship type, expect 'Tug', 'Sub', 'Destroyer' or 'Carrier'. Got " + shipType + " instead.")
                break;
        }

        this.#hitSections = Array(this.#length).fill(false)
        this.#isVertical = false
    }

    isValidLocation(coordinates, boardSize, isVertical=false)
    {
        let x = coordinates[0]
        let y = coordinates[1]
        if (isVertical)
        {
            if (y+this.#length >= boardSize || y < 0 || x >= boardSize || x < 0)
            {
                return false
            }
        }
        else
        {
            if (x+this.#length >= boardSize || x < 0 || y >= boardSize || y < 0)
            {
                return false
            }
        }

        return true
    }

    isSunk()
    {
        for (let i = 0; i < this.#hitSections.length; i++)
        {
            if (this.#hitSections[i] != true)
            {
                return false
            }
        }

        return true
    }

    hit(index)
    {
        if (index >= 0 && index < this.#hitSections.length)
        {
            this.#hitSections[index] = true
        }
    }

    setLocation(coordinates, isVertical)
    {
        this.#boardLocation = coordinates
        this.#isVertical = isVertical
    }

    clear()
    {
        this.#hitSections = Array(this.#length).fill(false)
        this.#isVertical = false
        this.#boardLocation = null
    }

    getName()
    {
        return this.#name
    }

    getLength()
    {
        return this.#length
    }

    getIsVertical()
    {
        return this.#isVertical
    }

    getHitSections()
    {
        return this.#hitSections
    }

    getLocation()
    {
        return this.#boardLocation
    }

}

module.exports = { Ship }