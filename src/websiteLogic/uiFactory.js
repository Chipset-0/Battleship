import HUMAN_IMAGE from "../assets/pve-creativestallpremium.png"
import COMPUTER_IMAGE from "../assets/pvp-freepik.png"

//TODO Create functions that create end game screens, ship indicators, battleship UI and placing ship UI

function createTileButton(location, state=-1)
{
    let button = document.createElement("button")
    button.classList.add("tile")
    button.style.gridArea = `${location[0]+1} / ${location[1]+1} / ${location[0]+1} / ${location[1]+1}`;
    switch(state)
    {
        case -1:
            button.classList.add("empty-tile")
            break;
        case 0:
            button.classList.add("miss")
            break;
        case 1:
            button.classList.add("hit")
            break;
        case 2:
            button.classList.add("sunk")
            break;
        case 3:
            button.classList.add("ship-exists")
    }
    button.dataset.location = JSON.stringify(location);
    return button
}

function createGamemodeSelect(functionComputer, functionPlayer)
{
  // Create the outer container div
  const gamemodeSelect = document.createElement('div');
  gamemodeSelect.className = 'gamemode-select';

  // Create the container for the options
  const gamemodeOptions = document.createElement('div');
  gamemodeOptions.className = 'gamemode-options';
  gamemodeSelect.appendChild(gamemodeOptions);

  // First game mode option
  const gamemodeOptionComputer = document.createElement('div');
  gamemodeOptionComputer.className = 'gamemode-option';
  gamemodeOptions.appendChild(gamemodeOptionComputer);

  const img1 = document.createElement('img');
  img1.src = COMPUTER_IMAGE;
  gamemodeOptionComputer.appendChild(img1);

  const buttonComputer = document.createElement('button');
  buttonComputer.className = 'computer-gamemode-button';

  const h41 = document.createElement('h4');
  h41.textContent = 'Select';
  buttonComputer.appendChild(h41);
  gamemodeOptionComputer.appendChild(buttonComputer);

  buttonComputer.addEventListener('click', () => {
    functionComputer()
  })

  // Second game mode option
  const gamemodeOptionPlayer = document.createElement('div');
  gamemodeOptionPlayer.className = 'gamemode-option';
  gamemodeOptions.appendChild(gamemodeOptionPlayer);

  const img2 = document.createElement('img');
  img2.src = HUMAN_IMAGE;
  gamemodeOptionPlayer.appendChild(img2);

  const buttonPlayer = document.createElement('button');
  buttonPlayer.className = 'player-gamemode-button';

  const h42 = document.createElement('h4');
  h42.textContent = 'Select';
  buttonPlayer.appendChild(h42);
  gamemodeOptionPlayer.appendChild(buttonPlayer);


  buttonPlayer.addEventListener('click', () => {
    functionPlayer()
  })

  return gamemodeSelect;
}

function createPlayerSwitch(playerSwitchFunc, playerNumber) {
    // Create the main div element
    const turnCover = document.createElement('div');
    turnCover.className = 'turn-cover';
  
    // Create the h1 element
    const heading = document.createElement('h1');
    if (playerNumber == 1)
    {
        heading.textContent = 'Player 1 Turn';
    }
    else
    {
        heading.textContent = 'Player 2 Turn';
    }
    turnCover.appendChild(heading);
  
    // Create the button element
    const button = document.createElement('button');
    button.className = 'player-switch-button';
    button.textContent = 'Continue';
    turnCover.appendChild(button);

    button.addEventListener('click', () => {playerSwitchFunc()})
  
    return turnCover;
  }
  
function createGameEndScreen(didPlayerOneWin=true, isPvp=false, restartFunction) 
{
    // Create the main div element
    const gameEndScreen = document.createElement('div');
    gameEndScreen.className = 'game-end-screen';

    // Create the heading element
    const heading = document.createElement('h1');
    // Assign correct victory text
    if (didPlayerOneWin)
    {
        if (!isPvp)
        {
            heading.textContent = 'Human Wins!';
        }
        else
        {
            heading.textContent = 'Player 1 Wins!';
        }
    }
    else 
    {
        if (!isPvp)
        {
            heading.textContent = "Computer Wins!"
        }
        else
        {
            heading.textContent = 'Player 2 Wins!';
        }
    }
    // Create the button element
    const restartButton = document.createElement('button');
    restartButton.className = 'button-restart-game';
    restartButton.textContent = 'Restart';

    restartButton.addEventListener('click', () => {restartFunction()})

    // Append the heading and button to the main div
    gameEndScreen.appendChild(heading);
    gameEndScreen.appendChild(restartButton);

    return gameEndScreen;
}

function createBoardElement(clickFunc, hoverFunc) {
    // Create the main container div
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");

    // Create the heading
    const heading = document.createElement("h3");
    heading.id = "current-player-heading"

    // Create the inner div structure
    const innerDiv = document.createElement("div");

    // Create the board div
    const board = document.createElement("div");
    board.classList.add("board");
    board.id = "main-board";
    board.addEventListener("click", (event) => {
        if (event.target.matches("button.tile")) {
            let location = JSON.parse(event.target.dataset.location);
            clickFunc(location)
        }
    })
    board.addEventListener("mouseover", (event) => {
        const tile = event.target.closest("button.tile");
        if (tile && board.contains(tile))
        {
            const location = JSON.parse(tile.dataset.location)
            hoverFunc(location);
        }
    });

    // Append board inside the inner div
    innerDiv.appendChild(board);


    const boardVisual = document.createElement("div");
    boardVisual.id = "board-visual"
    boardVisual.style.gridArea = `0 / 0 / 0 / 0`;


    board.appendChild(boardVisual)

    // Append all elements inside the main container
    boardContainer.appendChild(heading);
    boardContainer.appendChild(innerDiv);

    // Return the created element
    return boardContainer;
}

function createShipPlacementControlsElement(autoPlaceFunc, clearFunc, rotateFunc) {
    // Create the main container for the ship indicator
    const shipIndicator = document.createElement("div");
    shipIndicator.classList.add("current-ship-indicator");

    // Create the heading
    const heading = document.createElement("h3");
    heading.id = "current-ship-to-place-header"

    // Append heading inside the ship indicator container
    shipIndicator.appendChild(heading);

    // Create the button container with a grid-row style
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create the auto-place button
    const autoPlaceButton = document.createElement("button");
    autoPlaceButton.classList.add("sidebar-button", "button-auto-place");
    autoPlaceButton.textContent = "Auto-Place";

    autoPlaceButton.addEventListener('click', autoPlaceFunc)

    // Create the clear button
    const clearButton = document.createElement("button");
    clearButton.classList.add("sidebar-button", "button-clear");
    clearButton.textContent = "Clear";

    clearButton.addEventListener('click', () => {clearFunc()})


    // Create the rotate button
    const rotateButton = document.createElement("button");
    rotateButton.classList.add("sidebar-button");
    rotateButton.textContent = "Rotate";

    rotateButton.addEventListener("click", () => {rotateFunc()})


    // Append buttons inside the button container
    buttonContainer.appendChild(autoPlaceButton);
    buttonContainer.appendChild(clearButton);
    buttonContainer.appendChild(rotateButton);

    // Create a wrapper div for both elements
    const wrapper = document.createElement("div");
    wrapper.appendChild(shipIndicator);
    wrapper.appendChild(buttonContainer);
    wrapper.classList.add("ship-controls-container")

    // Return the created element
    return wrapper;
}

function createShipDisplay(hitStatus=[]) {
    // Create the ship display container
    const shipDisplay = document.createElement("div");
    shipDisplay.classList.add("ship-display");

    let length = hitStatus.length

    let isSunk = !hitStatus.includes(false)

    // Create the ship tiles
    for (let i = 0; i < length; i++) {
        const shipTile = document.createElement("div");
        shipTile.classList.add("ship-tile");
        if (isSunk)
        {
            shipTile.classList.add("sunk")
        }
        else if (hitStatus[i] == true)
        {
            shipTile.classList.add("hit")
        }
        else
        {
            shipTile.classList.add("ship-exists")
        }
        shipDisplay.appendChild(shipTile);
    }


    // Return the created element
    return shipDisplay;
}

function createShipList(shipArray=[["ShipName",[false]]])
{
    let shipList = document.createElement("div")
    shipList.classList.add("ship-list")
    for (let i = 0; i < shipArray; i++)
    {
        let currShip = shipArray[i]
        let shipElement = createShipDisplay(currShip[0], currShip[1])
        shipList.appendChild(shipElement)
    }
    return shipList
}

function createShipTitle()
{
    let title = document.createElement("h3")
    title.textContent = "Ships"
    return title
}


function createConfirmButton(confirmFunction)
{
    let confirmButton = document.createElement("button")
    confirmButton.id = "confirm-button"
    
    let confirmText = document.createElement("h3")
    confirmText.textContent = "Confirm"

    confirmButton.appendChild(confirmText)


    confirmButton.addEventListener('click', () => confirmFunction())

    return confirmButton
}

function createGameControls(restartFunc = () => {}) {
    // Create the button container div
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create the restart button
    const restartButton = document.createElement("button");
    restartButton.classList.add("sidebar-button", "button-restart");
    restartButton.id = "button-restart-game"
    restartButton.textContent = "Restart";

    restartButton.addEventListener('click', () => {restartFunc()})

    // Append the button to the button container
    buttonContainer.appendChild(restartButton);

    // Create the wrapper div for the mini-board
    const boardWrapper = document.createElement("div");

    // Create the mini-board div
    const miniBoard = document.createElement("div");
    miniBoard.classList.add("board", "small");
    miniBoard.id = "mini-board";

    // Append the mini-board inside the wrapper
    boardWrapper.appendChild(miniBoard);

    // Create a container to hold both elements
    const container = document.createElement("div");
    container.appendChild(buttonContainer);
    container.appendChild(boardWrapper);
    container.classList.add("game-left-container")

    // Return the created structure
    return container;
}

function createGameContent(clickFunc, hoverFunc) {
    // Create the player heading
    const playerHeading = document.createElement("h3");
    playerHeading.id = "current-player-heading";

    // Create the wrapper div for the main board
    const boardWrapper = document.createElement("div");

    const mainBoard = createBoardElement(clickFunc, hoverFunc)
    
    // Append the main board inside the wrapper
    boardWrapper.appendChild(mainBoard);


    const boardVisual = document.createElement("div");
    boardVisual.id = "board-visual"
    boardVisual.style.gridArea = `0 / 0 / 0 / 0`;

    mainBoard.appendChild(boardVisual)

    // Create a container to hold all elements
    const container = document.createElement("div");
    container.appendChild(playerHeading);
    container.appendChild(boardWrapper);

    // Return the created structure
    return container;
}


export {createTileButton, createGamemodeSelect, createPlayerSwitch, createBoardElement, 
        createShipTitle, createShipPlacementControlsElement, createShipList, createConfirmButton,
        createShipDisplay, createGameControls, createGameContent, createGameEndScreen}