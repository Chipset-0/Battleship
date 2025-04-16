import {createTileButton, createGamemodeSelect, createTurnCover} from uiFactory.js


//TODO test these functions
populateBoard(game, playerNumber)
{
    //Populates the main board to show current game state

    let board = document.getElementById("main-board")
    //Get the board state of the enemy player as shown to current player
    let boardState
    let enemy

    if (playerNumber == 1)
    {
        boardState = game.getEnemyBoardState(2)
        enemy = game.getPlayer(2)
    }
    else
    {
        boardState = game.getEnemyBoardState(1)
        enemy = game.getPlayer(1)
    }

    for (let i = 0; i < boardState.length; i++)
    {
        for (let j = 0; j < boardState[0].length; j++)
        {
            board.appendChild(createTileButton(enemy, [i,j], boardState[i][j]))
        }
    }
    
}

clearBoard()
{
    document.getElementById("main-board").innerHTML = ''
}

populateMiniBoard(game, board)
{
    //Populates the main board to show current game state

    let board = document.getElementById("mini-board")
    //Get the board state of the enemy player as shown to current player
    let boardState
    let enemy

    if (playerNumber == 1)
    {
        boardState = game.getEnemyBoardState(2)
        enemy = game.getPlayer(2)
    }
    else
    {
        boardState = game.getEnemyBoardState(1)
        enemy = game.getPlayer(1)
    }

    for (let i = 0; i < boardState.length; i++)
    {
        for (let j = 0; j < boardState[0].length; j++)
        {
            board.appendChild(createTileButton(enemy, [i,j], boardState[i][j]))
        }
    }
}

clearMiniBoard(board)
{
    document.getElementById("mini-board")
}

//TODO implement logic to reset game, setup ship-placing phase, enable board hovering
resetGameElements()
{
    /*
    Rese
    */
}

initialiseShipPlacementElements()
{

}

initialiseGameElements ()
{

}