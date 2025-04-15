import HUMAN_IMAGE from "../assets/pve-creativestallpremium.png"
import COMPUTER_IMAGE from "../assets/pvp-freepik.png"

//TODO Create functions that create end game screens, ship indicators, battleship UI and placing ship UI

function createTileButton(player, location, state=-1)
{
    let button = document.createElement("button")
    button.classList.add("tile")
    button.style.gridArea = `${location[0]+1} / ${location[1]+1} / span 1 / span 1`;
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
    button.addEventListener('click', () => {player.receiveAttack(location)})
    return button
}

function createGamemodeSelect()
{
  // Create the outer container div
  const gamemodeSelect = document.createElement('div');
  gamemodeSelect.className = 'gamemode-select';

  // Create the container for the options
  const gamemodeOptions = document.createElement('div');
  gamemodeOptions.className = 'gamemode-options';
  gamemodeSelect.appendChild(gamemodeOptions);

  // First game mode option
  const gamemodeOption1 = document.createElement('div');
  gamemodeOption1.className = 'gamemode-option';
  gamemodeOptions.appendChild(gamemodeOption1);

  const img1 = document.createElement('img');
  img1.src = COMPUTER_IMAGE;
  gamemodeOption1.appendChild(img1);

  const button1 = document.createElement('button');
  button1.className = 'computer-gamemode-button';
  const h41 = document.createElement('h4');
  h41.textContent = 'Select';
  button1.appendChild(h41);
  gamemodeOption1.appendChild(button1);

  // Second game mode option
  const gamemodeOption2 = document.createElement('div');
  gamemodeOption2.className = 'gamemode-option';
  gamemodeOptions.appendChild(gamemodeOption2);

  const img2 = document.createElement('img');
  img2.src = HUMAN_IMAGE;
  gamemodeOption2.appendChild(img2);

  const button2 = document.createElement('button');
  button2.className = 'player-gamemode-button';
  const h42 = document.createElement('h4');
  h42.textContent = 'Select';
  button2.appendChild(h42);
  gamemodeOption2.appendChild(button2);

  return gamemodeSelect;
}

function createTurnCover() {
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
  

export {createTileButton, createGamemodeSelect, createTurnCover}