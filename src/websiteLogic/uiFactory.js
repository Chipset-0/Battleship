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

export {createTileButton}