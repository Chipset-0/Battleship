import {initialiseGamemodeSelect, initialiseShipPlacementElements, updateShipHighlight} from "../websiteLogic/updateUI.js"
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
    game = new Game(true)
    nextState = 1
}

function startPlayerGame()
{
    console.log("Starting PvP match")
    game = new Game(false)
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
    if (game.isValidLocation(location, ship[1]))
    {
        game.placeShip(game.getCurrentPlayerNumber(), location)
        game.incShip()
    }
    else
    {
        
    }
}

function calculateShipPlacement(location)
{
    console.log("Calculating placement")
    if (game.allShipsPlaced())
    {
        updateShipHighlight(location, 0, 0)
    }
    updateShipHighlight(location, game.getCurrentShip()[1],game.getIsVerticalRotation())
}

function startShipPlacement()
{
    console.log("Starting Ship Placement")
    initialiseShipPlacementElements(game, switchRotation, placeShipOnTile, calculateShipPlacement)
}

function startPlayerSwitch()
{
    console.log("Starting Player Switch")
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
            //TODO add Game functions
            break;
        case 4: //GameEnd
            //TODO add GameEnd functions
            break;
        default:
            throw new Error("Invalid gamestate integer received: " + nextState)
            break;
    }
}

export { nextTurn }