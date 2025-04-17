import {createTileButton, createGamemodeSelect, createTurnCover,
        createShipPlacementControlsElement, createBoardElement, 
        createShipTitle, createShipList} 
from "./uiFactory.js"

// Get elements that must be updated from html
const screenCover = document.getElementById("cover")
const leftSidebar = document.getElementById("left-sidebar")
const boardContainer = document.getElementById("content")
const rightSidebar = document.getElementById("right-sidebar")

function updateTiles(board, boardState, clickFunc = () => {}, hoverFunc = (location) => console.log(location))
{
    for (let i = 0; i < boardState.length; i++)
    {
        for (let j = 0; j < boardState[0].length; j++)
        {
            board.appendChild(createTileButton([i,j], boardState[i][j], clickFunc, hoverFunc))
        }
    }
}

//TODO test these functions
function populateMainBoard(game, clickFunction, hoverFunc)
{
    //Populates the main board to show current game state

    let board = document.getElementById("main-board")
    let playerNumber = game.getCurrentPlayerNumber()

    //Get the board state of the enemy player as shown to current player
    let boardState

    if (playerNumber == 1)
    {
        boardState = game.getEnemyBoardState(2)
    }
    else
    {
        boardState = game.getEnemyBoardState(1)
    }

    updateTiles(board, boardState, clickFunction, hoverFunc)

}

function clearBoard()
{
    document.getElementById("main-board").innerHTML = ''
}

function populateMiniBoard(game, clickFunction)
{
    //Populates the main board to show current game state

    let miniBoard = document.getElementById("mini-board")

    //Get the current player's board state
    let boardState = game.getOwnGameboard(game.getCurrentPlayerNumber())

    updateTiles(miniBoard, boardState)
}

function clearMiniBoard(board)
{
    document.getElementById("mini-board")
}


function showScreenCover()
{
    screenCover.style.display = "grid";
}

function hideScreenCover()
{
    screenCover.style.display = "none";
}

function clearScreenCover()
{
    screenCover.innerHTML = ''
}

function clearLeftSidebar()
{
    leftSidebar.innerHTML = ''
}

function clearBoardContainer()
{
    boardContainer.innerHTML = ''
}

function clearRightSidebar()
{
    rightSidebar.innerHTML = ''
}

//TODO implement logic to reset game, setup ship-placing phase, enable board hovering
function resetGameElements()
{
    /*
    Rese
    */
}

function updateShipPlacementHeader(ship)
{
    let header = document.getElementById("current-ship-to-place-header")
    if (ship[1] != 0)
    {
        header.textContent = `Placing ${ship[0]} (${ship[1]} long)`
    }
    else
    {
        header.textContent = "All Ships Placed!"
    }
}

function updateShipHighlight(location, length, isVertical)
{
    let shipPlaceVisual = document.getElementById("ship-place-visual")
    if (length == 0)
    {
        console.log("Removing visual")
        shipPlaceVisual.style.display = "none"
        return;
    }
    let gridArea = `${location[0]+1} / ${location[1]+1} / `
    let hasError = false
    console.log(isVertical)
    if (isVertical)
    {
        gridArea += `${location[0]+1} / ${location[1]+1 + length}`
        hasError = (9 > location[1]+length)
    }
    else
    {
        gridArea += `${location[0]+1 + length} / ${location[1]+1}`
        hasError = (9 > location[0]+length)
    }
    console.log(location)
    console.log(length)
    console.log(gridArea)

    shipPlaceVisual.style.gridArea = gridArea
    if (!hasError)
    {
        shipPlaceVisual.classList.add("ship-place-error")
        shipPlaceVisual.classList.remove("ship-place-good")
    }
    else
    {
        shipPlaceVisual.classList.remove("ship-place-error")
        shipPlaceVisual.classList.add("ship-place-good")
    }
}

function addConfirmButton()
{
    //TODO add confirmation button after all ships placed
    
}


function initialiseGamemodeSelect(functionComputer, functionPlayer)
{
    let gamemodeSelectElement = createGamemodeSelect(functionComputer, functionPlayer)
    screenCover.appendChild(gamemodeSelectElement)
}

function initialiseShipPlacementElements(game, rotateFunction, tileClickFunction, hoverFunc)
{
    //TODO
    console.log("Initialising shipPlacementElements")
    clearScreenCover()
    hideScreenCover()
    let shipControls = createShipPlacementControlsElement()
    clearLeftSidebar()
    
    leftSidebar.appendChild(shipControls)
    
    clearRightSidebar()
    rightSidebar.appendChild(createShipTitle())
    rightSidebar.appendChild(createShipList(null))

    clearBoardContainer()
    let mainBoard = createBoardElement(game.getCurrentPlayerNumber(), rotateFunction)
    boardContainer.appendChild(mainBoard)

    populateMainBoard(game, tileClickFunction, hoverFunc)

    updateShipPlacementHeader(game.getCurrentShip())
}

function nextShip(game)
{
    updateShipPlacementHeader(game.getCurrentShip())
}

function initialiseGameElements ()
{
    //TODO
    console.log("Initialising gameElements")
}

export {initialiseGamemodeSelect, initialiseShipPlacementElements, initialiseGameElements, updateShipHighlight}