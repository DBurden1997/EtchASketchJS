
let leftDown = false;
let rightDown = false;
let showGridLines = true;

function colorTile(e) {
    let tile = e.target;
    if(leftDown) {
        tile.classList.add(`filled`);
    }
    if(rightDown) {
        tile.classList.remove(`filled`);
    }
}

function createGrid(gridLength = 16) {

    let grid = document.querySelector(`#grid-container`);

    grid.addEventListener(`contextmenu`, e => e.preventDefault())

    for(let x = 0; x < gridLength; ++x) {
        let column = document.createElement(`div`);
        column.classList.add(`grid-column`);

        grid.appendChild(column);

        for(let y = 0; y < gridLength; ++y) {
            let tile = document.createElement(`div`);
            tile.classList.add(`grid-tile`);

            if(!showGridLines) {
                tile.classList.add(`borderless`);
            }

            tile.addEventListener(`mouseenter`, colorTile);

            column.appendChild(tile);
        }
    }
}

function resetGrid() {

    let grid = document.querySelector(`#grid-container`);

    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function clearGrid() {
    let tiles = document.querySelectorAll(`.grid-tile`);

    tiles.forEach(tile => {
        tile.classList.remove('filled');
    })
}

function toggleGridlines() {
    showGridLines = !showGridLines;
    
    let tiles = document.querySelectorAll(`.grid-tile`);

    tiles.forEach(tile => {
        tile.classList.toggle('borderless');
    })
}

function openNewGridModal() {
    let modal = document.querySelector(`#new-grid-modal`);

    modal.classList.add(`active`);
}

function activateOption(e) {
    let button = e.target;

    switch(button.id) {
        case `clear`: {
            clearGrid();
            break;
        }
        case `size-submit`: {
            let value = +(document.querySelector(`#size-input`).value);
            resetGrid();
            createGrid(value);
            break;
        }
        case `toggle-lines`: {
            toggleGridlines();
            break;
        }
        default:
            break;
    }
}

createGrid(16);


document.addEventListener(`mousedown`, (e) => {

    if(e.button === 0) {
        leftDown = true;
    }

    if(e.button === 2) {
        rightDown = true;
    }
});
document.addEventListener(`mouseup`, (e) => {

    if(e.button === 0) {
        leftDown = false;
    }

    if(e.button === 2) {
        rightDown = false;
    }
});

let controlsButtons = document.querySelectorAll(`.controls-button`);
controlsButtons.forEach(button => button.addEventListener(`click`, activateOption));

let modal = document.querySelector(`#new-grid-modal`);

