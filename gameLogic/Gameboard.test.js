import {Gameboard} from "./Gameboard.js";

//Test constructor
test("Gameboard with length less than 2 will be rejected", () =>
{
    expect(() => new Gameboard(1)).toThrow()
})
test("Gameboard with valid length will be accepted", () =>
{
    expect(new Gameboard(7).getSize()).toBe(7)
})

//Test placeShip

test("Gameboard will add ship of correct type, orientation and location given valid parameters", () =>
{
    let x = new Gameboard(7)
    x.placeShip("Carrier", [1,4], false)
    expect(x.getShips()[0].getName()).toBe("Carrier")

})

test("Gameboard will not add ship of incorrect type even if other parameters are valid", () =>
{
    let x = new Gameboard(7)
    x.placeShip("Missile Cruiser", [1,4], false)
    expect(x.getShips().length).toBe(0)
})

test("Gameboard will not add ship of incorrect position even if other parameters are valid", () =>
    {
        let x = new Gameboard(7)
        x.placeShip("Carrier", [6,1], false)
        expect(x.getShips().length).toBe(0)
    })

test("Gameboard will not add vertical ship of incorrect position even if other parameters are valid", () =>
    {
        let x = new Gameboard(7)
        x.placeShip("Carrier", [1,6], true)
        expect(x.getShips().length).toBe(0)
    })
//Test Receive Attack
test("Gameboard will receive a missing attack and return 0 indicating a miss", () =>
{
    let x = new Gameboard(5)
    expect(x.receiveAttack([1,1])).toBe(0)
})

test("Gameboard will receive a hitting attack and return 1 indicating a hit", () =>
    {
        let x = new Gameboard(5)
        x.placeShip("Tug", [1,1], true)
        expect(x.receiveAttack([1,1])).toBe(1)
    })

test("Gameboard will receive a sinking attack and return 2 indicating a hit", () =>
    {
        let x = new Gameboard(5)
        x.placeShip("Tug", [1,1], true)
        x.receiveAttack([1,2])
        expect(x.receiveAttack([1,1])).toBe(2)
    })


//Test All Ships Sunk
test("Gameboard will indicate all ships are sunk when the number of ships is 0", () =>
{
    let x = new Gameboard(4)
    expect(x.allShipsSunk()).toBe(true)
})


test("Gameboard will indicate all ships are sunk when all ships are sunk", () =>
    {
        let x = new Gameboard(4)
        x.placeShip("Tug", [1,1], false)
        x.receiveAttack([1,1])
        x.receiveAttack([2,1])
        expect(x.allShipsSunk()).toBe(true)
    })

test("Gameboard will indicate not all ships are sunk when only one hit", () =>
    {
        let x = new Gameboard(4)
        x.placeShip("Tug", [1,1], false)
        x.receiveAttack([1,1])
        expect(x.allShipsSunk()).toBe(false)
    })
    
// Test Reset()

test("Gameboard will properly reset", () =>
    {
        let x = new Gameboard(4)
        x.placeShip("Tug", [1,1], false)
        x.receiveAttack([1,1])
        expect(x.allShipsSunk()).toBe(false)
    })