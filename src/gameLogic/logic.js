import {initialiseGamemodeSelect, initialiseShipPlacementElements, updateHighlight,
    nextShip, clearShipPlacement, initialisePlayerSwitch, initialiseGameElements,
    initialiseEndScreen
} from "../websiteLogic/updateUI.js"
import {Game} from "../gameObjects/Game.js"

let game = new Game(false)

//GamemodeSelect=0, ShipPlacement=1, PlayerSwitch=2, Game=3, GameEnd=4
let nextState = 0
let gameStart = false
let mainBoardElements = []
let miniBoardElements = []

let isVerticalRotation = false;

function gamemodeSelect()
{
    /*
    Call this function at start of game. Initialises the Gamemode select screen
    and binds the pvp and pve functions to call shipPlacement
    */
    initialiseGamemodeSelect(startComputerGame, startPlayerGame)
}

function startComputerGame()
{
    console.log("Starting PvE match")
    game = new Game(false)
    nextState = 1
}

function startPlayerGame()
{
    console.log("Starting PvP match")
    game = new Game(true)
    nextState = 1
    nextTurn()
}

function switchRotation()
{
    game.switchShipPlaceVertical()
}

function placeShipOnTile(location)
{
    console.log("Placing Ship on Location:" + location)
    let ship = game.getCurrentShip()
    console.log(location + "|" + ship)
    if (game.isValidLocation(location, game.getCurrentShip()[1], game.getIsVerticalRotation()))
    {
        game.placeShip(location)
        game.incShip()
        nextShip(game, startGame, startPlayerSwitch)
    }
    else
    {
        console.log("Invalid Ship Placement")
    }
}

function calculateShipPlacement(location)
{
    console.log("Calculating placement")
    if (game.allShipsPlaced())
    {
        updateHighlight(location, 0, 0)
    }
    updateHighlight(location, game.getCurrentShip()[1],game.getIsVerticalRotation())
}

function clearShips()
{
    console.log("Clearing")
    game.clearShips(game.getCurrentPlayerNumber())
    clearShipPlacement(game)
}

function startShipPlacement()
{
    console.log("Starting Ship Placement")
    game.resetCurrShip()
    initialiseShipPlacementElements(game, switchRotation, placeShipOnTile, calculateShipPlacement, clearShips)
}

function startPlayerSwitch()
{
    console.log("Starting Player Switch")
    game.switchPlayer()
    if (!gameStart)
    {
        gameStart = true
        initialisePlayerSwitch(startShipPlacement, game.getCurrentPlayerNumber())
    }
    else
    {
        nextState = 3
        initialisePlayerSwitch(startGame, game.getCurrentPlayerNumber())
    }
}

function restart()
{
    //TODO implement restart function
    nextState = 0
    gameStart = false
    nextTurn()
}

function attackFunction(location)
{
    if (game.hasBeenAttacked(location))
    {
        console.log("Cannot attack same location")
        return
    }
    game.fireAttack(location)
    if (game.checkIfWon() != 0)
    {
        nextState=4
    }
    else if (game.getIsPvp())
    {
        nextState = 2
    }
    else
    {
        nextState = 3
        //TODO implement AI turn
    }
    nextTurn()
}

function attackHighlight(location)
{
    updateHighlight(location, 1, false)
}

function startGame()
{
    console.log("Starting Game")
    initialiseGameElements(game, restart, attackFunction, attackHighlight)

}

function endGame()
{
    console.log("Ending Game")
    let playerOneVictory = game.checkIfWon() == 1
    initialiseEndScreen(playerOneVictory, game.getIsPvp(), restart)
}

function nextTurn()
{
    switch (nextState)
    {
        case 0: //Gamemode Select
            gamemodeSelect()
            break;
        case 1: //Ship Placement
            startShipPlacement()
            break;
        case 2: //PlayerSwitch
            startPlayerSwitch()
            break;
        case 3: //Game
            //TODO finish functionality
            startGame()
            break;
        case 4: //GameEnd
            //TODO add GameEnd functions
            endGame()
            break;
        default:
            throw new Error("Invalid gamestate integer received: " + nextState)
            break;
    }
}

export { nextTurn }