import {initialiseGamemodeSelect, initialiseShipPlacementElements, updateHighlight,
    nextShip, clearShipPlacement, initialisePlayerSwitch, initialiseGameElements,
    initialiseEndScreen,
    updateShipPlacementBoard,
    addConfirmButton,
    populateShipDisplay,
    updateGameElements
} from "../websiteLogic/updateUI.js"
import {Game, ComputerPlayer} from "../gameObjects/Game.js"

let game = new Game(false)
let computer = new ComputerPlayer()

//GamemodeSelect=0, ShipPlacement=1, PlayerSwitch=2, Game=3, GameEnd=4
let nextState = 0
let gameStart = false
let lockFire = false

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
    game = new Game(false)
    nextState = 1
    nextTurn()
}

function startPlayerGame()
{
    game = new Game(true)
    nextState = 1
    nextTurn()
}

function autoPlacePlayer()
{
    game.autoPlaceShipsCurrent()

    updateShipPlacementBoard(game.getBoardState())
    updateHighlight([0,0], 0, false)
    populateShipDisplay(game.getShipStatus())
    if (game.getIsPvp())
    {
        addConfirmButton(startPlayerSwitch)
    }
    else
    {
        addConfirmButton(startGame)
    }
    
    
}

function switchRotation()
{
    game.switchShipPlaceVertical()
}

function placeShipOnTile(location)
{
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
    if (game.allShipsPlaced())
    {
        updateHighlight(location, 0, 0)
    }
    updateHighlight(location, game.getCurrentShip()[1],game.getIsVerticalRotation())
}

function clearShips()
{
    updateHighlight([0,0], 0, false)
    game.clearShips(game.getCurrentPlayerNumber())
    clearShipPlacement(game)
}

function startShipPlacement()
{
    game.resetCurrShip()
    initialiseShipPlacementElements(game, switchRotation, placeShipOnTile, calculateShipPlacement, clearShips, autoPlacePlayer)
}

function startPlayerSwitch()
{
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
    nextState = 0
    gameStart = false
    nextTurn()
}

function attackFunction(location)
{
    if (lockFire)
    {
        console.log("Firing is locked")
        return
    }
    lockFire = true
    try{
        if (game.hasBeenAttacked(location))
        {
            console.log("Cannot attack same location")
            return
        }

        game.fireAttack(location)
        if (game.getIsPvp())
        {
            nextState = 2
        }
        else
        {
            nextState = 5
            
            game.fireAttackComputer(computer.performAttack(game.getPlayerEnemyBoardState()))
        }

        if (game.checkIfWon() != 0)
        {
            nextState=4
        }

    } finally {
        lockFire = false
    }
    nextTurn()
}

function attackHighlight(location)
{
    updateHighlight(location, 1, false)
}

function startGame()
{
    if (!game.getIsPvp())
    {
        game.resetCurrShip()
        game.autoPlaceShips(2)
    }
    initialiseGameElements(game, restart, attackFunction, attackHighlight)

}

function updateGame()
{
    console.log("Updating Game")
    updateGameElements(game)
}

function endGame()
{
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
            startGame()
            break;
        case 4: //GameEnd
            endGame()
            break;
        case 5: //Process PvE Outcome
            updateGame()
            break;
        default:
            throw new Error("Invalid gamestate integer received: " + nextState)
            break;
    }
}

export { nextTurn }