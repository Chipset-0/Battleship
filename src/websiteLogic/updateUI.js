import {createTileButton, createGamemodeSelect, createPlayerSwitch,
        createShipPlacementControlsElement, createBoardElement, 
        createShipTitle, createShipList, createConfirmButton,
        createShipDisplay, createGameControls, createGameContent, 
        createGameEndScreen} 
from "./uiFactory.js"

// Get elements that must be updated from html
const screenCover = document.getElementById("cover")
const leftSidebar = document.getElementById("left-sidebar")
const boardContainer = document.getElementById("content")
const rightSidebar = document.getElementById("right-sidebar")

function updateTiles(board, boardState, clickFunc = () => {}, hoverFunc = () => {})
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
function populateMainBoard(boardState, clickFunction, hoverFunc)
{
    //Populates the main board to show current game state
    let board = document.getElementById("main-board")

    updateTiles(board, boardState, clickFunction, hoverFunc)

}

function clearBoard()
{
    let tiles = document.getElementById("main-board").querySelectorAll('.tile')
    tiles.forEach(tile => {
        tile.className = "";
    })
}

function updateBoard(board, boardState)
{
    let tiles = board.querySelectorAll('.tile')
    for (let i = 0; i < tiles.length; i++)
    {
        tiles[i].className = 'tile'
        switch(boardState[Math.floor(i/9)][ i%9])
        {
            case 0:
                tiles[i].classList.add("miss")
                break;
            case 1:
                tiles[i].classList.add("hit")
                break;
            case 2:
                tiles[i].classList.add("sunk")
                break;
            case 3:
                tiles[i].classList.add("ship-exists")
                break;
        }
    }
}

function populateMiniBoard(boardState, clickFunction, hoverFunc)
{
    //Populates the main board to show current game state

    let miniBoard = document.getElementById("mini-board")

    updateTiles(miniBoard, boardState, clickFunction, hoverFunc)
}

function clearMiniBoard(board)
{
    document.getElementById("mini-board").querySelector(`.${tile}`).forEach(child => child.remove())
}

function showScreenCover(player)
{
    screenCover.style.display = "grid";
    if (player==1)
    {
        screenCover.className = "screen-cover first-cover"
        document.body.className = "first-cover"
    }
    else
    {
        screenCover.className = "screen-cover second-cover"
        document.body.className = "second-cover"
    }
    
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

function clearAll()
{
    clearScreenCover()
    clearLeftSidebar()
    clearBoardContainer()
    clearRightSidebar()
}

function updatePlayerHeader(playerNumber)
{
    let header = document.getElementById("current-player-heading")
    if (playerNumber == 1)
    {
        header.textContent = "Player 1"
    }
    else
    { 
        header.textContent = "Player 2"
    }
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

function updateHighlight(location, length, isVertical)
{
    let boardVisual = document.getElementById("board-visual")
    if (length == 0)
    {
        boardVisual.style.display = "none"
        return;
    }
    let gridArea = `${location[0]+1} / ${location[1]+1} / `
    let hasError = false
    if (isVertical)
    {
        gridArea += `${location[0]+1} / ${location[1]+1 + length}`
        hasError = (9 > location[1]+length-1)
    }
    else
    {
        gridArea += `${location[0]+1 + length} / ${location[1]+1}`
        hasError = (9 > location[0]+length-1)
    }

    boardVisual.style.gridArea = gridArea
    if (!hasError)
    {
        boardVisual.classList.add("ship-place-error")
        boardVisual.classList.remove("ship-place-good")
    }
    else
    {
        boardVisual.classList.remove("ship-place-error")
        boardVisual.classList.add("ship-place-good")
    }
}


function populateShipDisplay(shipArray)
{
    let shipList = document.getElementsByClassName("ship-list")[0]
    shipList.innerHTML = ''
    shipArray.forEach(shipStatus => {
        shipList.appendChild(createShipDisplay(shipStatus))
    });
}

function showShipHighlight()
{
    let shipPlaceVisual = document.getElementById("board-visual")
    shipPlaceVisual.style.display = "";
}


function addConfirmButton(confirmFunction)
{
    rightSidebar.appendChild(createConfirmButton(confirmFunction))
}

function removeConfirmButton()
{
    let button = document.getElementById("confirm-button")
    if (button)
    {
        button.remove()
    }
}


function initialiseGamemodeSelect(functionComputer, functionPlayer)
{
    clearAll()
    showScreenCover(1)
    let gamemodeSelectElement = createGamemodeSelect(functionComputer, functionPlayer)
    screenCover.appendChild(gamemodeSelectElement)
}

function initialiseShipPlacementElements(game, rotateFunction, tileClickFunction, hoverFunc, clearFunc)
{
    
    clearAll()
    hideScreenCover()
    
    //TODO implement autoplace
    let shipControls = createShipPlacementControlsElement(()=>{},clearFunc, rotateFunction)
    leftSidebar.appendChild(shipControls)

    rightSidebar.appendChild(createShipTitle())
    rightSidebar.appendChild(createShipList(null))


    let mainBoard = createBoardElement(game.getCurrentPlayerNumber())
    boardContainer.appendChild(mainBoard)

    populateMainBoard(game.getBoardState(), tileClickFunction, hoverFunc)
    populateShipDisplay(game.getShipStatus())

    updateShipPlacementHeader(game.getCurrentShip())
    updatePlayerHeader(game.getCurrentPlayerNumber())
}


function clearShipPlacement(game)
{
    let boardState = game.getBoardState()
    document.getElementsByClassName("ship-list")[0].innerHTML=''
    updateBoard(document.getElementById("main-board"), boardState)
    updateShipPlacementHeader(game.getCurrentShip())
    removeConfirmButton()
    showShipHighlight()
    populateShipDisplay(game.getShipStatus())
}

function doesConfirmButtonExist()
{
    return document.getElementById("confirm-button")
}

function nextShip(game, confirmComputerFunction, confirmPlayerFunction)
{
    updateShipPlacementHeader(game.getCurrentShip());

    let boardState = game.getBoardState()
    populateShipDisplay(game.getShipStatus())

    updateBoard(document.getElementById("main-board"), boardState)

    if (game.allShipsPlaced() && !doesConfirmButtonExist())
    {
        // If the game is PvP, start the player switch UI. 
        // Otherwise go straight to game
        if (game.getIsPvp())
        {
            addConfirmButton(confirmPlayerFunction)
        }
        else
        {
            addConfirmButton(confirmComputerFunction)
        }
    }
}

function initialiseGameElements (game, resetFunc, tileClickFunction, hoverFunc)
{
    clearAll()
    hideScreenCover()

    let gameControls = createGameControls(resetFunc)
    leftSidebar.appendChild(gameControls)

    let gameContent = createGameContent()
    boardContainer.appendChild(gameContent)
    updatePlayerHeader(game.getCurrentPlayerNumber())

    rightSidebar.appendChild(createShipTitle())
    rightSidebar.appendChild(createShipList())

    populateMainBoard(game.getEnemyBoardState(), tileClickFunction, hoverFunc)
    populateMiniBoard(game.getBoardState(), ()=>{}, ()=>{})
    populateShipDisplay(game.getShipStatus())
}

function initialisePlayerSwitch(playerSwitchFunc, playerNumber)
{
    clearAll()
    screenCover.appendChild(createPlayerSwitch(playerSwitchFunc, playerNumber))
    showScreenCover(playerNumber)
}

function initialiseEndScreen(didPlayerOneWin, isPvp, restartFunction)
{
    clearAll()
    screenCover.appendChild(createGameEndScreen(didPlayerOneWin, isPvp, restartFunction))
    if (didPlayerOneWin)
    {
        showScreenCover(1)
    }
    else
    {
        showScreenCover(2)
    }
}

export {initialiseGamemodeSelect, initialiseShipPlacementElements, initialiseGameElements, 
    updateHighlight, nextShip, clearShipPlacement, initialisePlayerSwitch, initialiseEndScreen}