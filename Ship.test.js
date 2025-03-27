const {Ship} = require("./Ship");

test("Ship Creates Carrier of Length 5", () => {
    expect(new Ship("Carrier").getLength()).toBe(5)
})

test("Ship throws error on invalid ship type", () => {
    expect(() => new Ship("Not A Ship")).toThrow()
})

test("Ship identifies valid location horizontal", () => {
    expect(new Ship("Tug").isValidLocation([1,1], 9, false)).toBe(true)
})

test("Ship identifies valid location vertical", () => {
    expect(new Ship("Tug").isValidLocation([1,1], 9, true)).toBe(true)
})

test("Ship identifies invalid location vertical", () => {
    expect(new Ship("Carrier").isValidLocation([1,7], 9, true)).toBe(false)
})

test("Ship identifies invalid location horizontal", () => {
    expect(new Ship("Carrier").isValidLocation([6,1], 9, false)).toBe(false)
})


//Test .hit(index) and .isSunk()
let shipToSink = new Ship("Tug")

shipToSink.hit(0)
shipToSink.hit(1)


test("Ship that is not sunk shows that it is not", () => {
    expect(new Ship("Carrier").isSunk()).toBe(false)
})

test("Ship that is sunk shows it is", () => {
    expect(shipToSink.isSunk()).toBe(true)
})

let shipWithLocation = new Ship("Destroyer")
shipWithLocation.setLocation([1,1], true)

test("Ship with location returns correct location", () => {
    expect(shipWithLocation.getLocation()).toEqual([1,1])
    expect(shipWithLocation.getIsVertical()).toBe(true)
})

let newShip = new Ship("Destroyer")
newShip.setLocation([1,1], true)
newShip.clear()

test("Ship with cleared location has cleared the location", () => {
    expect(newShip.getLocation()).not.toEqual([1,1])
    expect(newShip.getIsVertical()).not.toBe(true)
})
    