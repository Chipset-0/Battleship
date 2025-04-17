import HUMAN_IMAGE from "../assets/pve-creativestallpremium.png"
import COMPUTER_IMAGE from "../assets/pvp-freepik.png"

//TODO Create functions that create end game screens, ship indicators, battleship UI and placing ship UI

function createTileButton(location, state=-1, clickFunction, hoverFunction)
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
    button.addEventListener('click', () => {clickFunction(location)})
    button.addEventListener('mouseover', () => {hoverFunction(location)})
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

function createPlayerSwitch() {
    // Create the main div element
    const turnCover = document.createElement('div');
    turnCover.className = 'turn-cover';
  
    // Create the h1 element
    const heading = document.createElement('h1');
    heading.textContent = 'Player 1 Turn';
    turnCover.appendChild(heading);
  
    // Create the button element
    const button = document.createElement('button');
    button.className = 'player-switch-button';
    button.textContent = 'Continue';
    turnCover.appendChild(button);
  
    return turnCover;
  }
  
function createGameEndScreen(didPlayerOneWin=true, isComputerPlaying=false) 
{
    // Create the main div element
    const gameEndScreen = document.createElement('div');
    gameEndScreen.className = 'game-end-screen';

    // Create the heading element
    const heading = document.createElement('h1');
    // Assign correct victory text
    if (didPlayerOneWin)
    {
        if (isComputerPlaying)
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
        if (isComputerPlaying)
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

    // Append the heading and button to the main div
    gameEndScreen.appendChild(heading);
    gameEndScreen.appendChild(restartButton);

    return gameEndScreen;
}

function createBoardElement(playerNumber, rotateFunction) {
    // Create the main container div
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");

    // Create the heading
    const heading = document.createElement("h3");
    heading.textContent = "Player 1";

    // Create the inner div structure
    const innerDiv = document.createElement("div");

    // Create the board div
    const board = document.createElement("div");
    board.classList.add("board");
    board.id = "main-board";

    // Append board inside the inner div
    innerDiv.appendChild(board);

    // Create the rotate container div
    const rotateContainer = document.createElement("div");
    rotateContainer.classList.add("rotate-container");

    // Create the rotate button
    const rotateButton = document.createElement("button");
    rotateButton.classList.add("rotate-button");
    rotateButton.textContent = "Rotate";

    rotateButton.addEventListener("click", () => {rotateFunction()})

    // Append button inside the rotate container
    rotateContainer.appendChild(rotateButton);

    const shipPlaceVisual = document.createElement("div");
    shipPlaceVisual.id = "ship-place-visual"
    shipPlaceVisual.style.gridArea = `0 / 0 / 0 / 0`;


    board.appendChild(shipPlaceVisual)

    // Append all elements inside the main container
    boardContainer.appendChild(heading);
    boardContainer.appendChild(innerDiv);
    boardContainer.appendChild(rotateContainer);

    // Return the created element
    return boardContainer;
}

function createShipPlacementControlsElement() {
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

    // Create the clear button
    const clearButton = document.createElement("button");
    clearButton.classList.add("sidebar-button", "button-clear");
    clearButton.textContent = "Clear";

    // Append buttons inside the button container
    buttonContainer.appendChild(autoPlaceButton);
    buttonContainer.appendChild(clearButton);

    // Create a wrapper div for both elements
    const wrapper = document.createElement("div");
    wrapper.appendChild(shipIndicator);
    wrapper.appendChild(buttonContainer);
    wrapper.classList.add("ship-controls-container")

    // Return the created element
    return wrapper;
}

function createShipDisplay(shipType, hitStatus=[false]) {
    // Create the carrier button
    const carrierButton = document.createElement("button");
    carrierButton.classList.add(shipType);

    // Create the ship display container
    const shipDisplay = document.createElement("div");
    shipDisplay.classList.add("ship-display", "carrier");

    let length = -1
    switch (shipType.toUpperCase())
        {
            case "TUG":
                length = 2
                break;

            case "SUB":
                length = 3
                break;

            case "DESTROYER":
                length = 4
                break;

            case "CARRIER":
                length = 5
                break;
        }

    let isSunk = hitStatus.includes(false)

    // Create the ship tiles
    for (let i = 0; i < length; i++) {
        const shipTile = document.createElement("div");
        shipTile.classList.add("ship-tile");
        if (isSunk)
        {
            shipTile.classList.add("sunk")
        }
        else if (hitStatus[0])
        {
            shipTile.classList.add("hit")
        }
        else
        {
            shipTile.classList.add("ship-exists")
        }
        shipDisplay.appendChild(shipTile);
    }

    // Append ship display inside the carrier button
    carrierButton.appendChild(shipDisplay);

    // Return the created element
    return carrierButton;
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

function createRotateButton() {
    // Create the rotate container div
    const rotateContainer = document.createElement("div");
    rotateContainer.classList.add("rotate-container");

    // Create the rotate button
    const rotateButton = document.createElement("button");
    rotateButton.classList.add("rotate-button");
    rotateButton.textContent = "Rotate";

    // Append button inside the rotate container
    rotateContainer.appendChild(rotateButton);

    // Return the created element
    return rotateContainer;
}

function createUpdateTextContainer() {
    // Create the update text container
    const updateTextContainer = document.createElement("div");
    updateTextContainer.classList.add("update-text-container");

    // Create the current player result heading
    const currentPlayerResult = document.createElement("h3");
    currentPlayerResult.classList.add("current-player-result");
    currentPlayerResult.textContent = "You HIT!";

    // Create the enemy player result heading
    const enemyPlayerResult = document.createElement("h3");
    enemyPlayerResult.classList.add("enemy-player-result");
    enemyPlayerResult.textContent = "They MISSED";

    // Append headings to the container
    updateTextContainer.appendChild(currentPlayerResult);
    updateTextContainer.appendChild(enemyPlayerResult);

    // Return the created element
    return updateTextContainer;
}

export {createTileButton, createGamemodeSelect, createPlayerSwitch, createBoardElement, 
        createShipTitle, createShipPlacementControlsElement, createShipList}