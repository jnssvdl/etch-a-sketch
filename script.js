function initialSquares(squareContainer, SQUARE_CONTAINER_WIDTH_HEIGHT) {
    const INITIAL_SQUARE_NUMBER = 16; // fixed initial number of squares inside the square container
    const SQUARE_WIDTH_HEIGHT = SQUARE_CONTAINER_WIDTH_HEIGHT / INITIAL_SQUARE_NUMBER;
    for (let i = 0; i < (INITIAL_SQUARE_NUMBER ** 2); i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('style', `height: ${SQUARE_WIDTH_HEIGHT}px; width: ${SQUARE_WIDTH_HEIGHT}px`);
        squareContainer.appendChild(square);
    }
}

function selectedMode(write, erase, color, mode) {
    if (mode === 'write-button') {
        write.style.backgroundColor = '#8FB0A9';
        erase.style.backgroundColor = '#FBD266';
        color.style.backgroundColor = '#FBD266';
    } else if (mode === 'erase-button') {
        write.style.backgroundColor = '#FBD266';
        erase.style.backgroundColor = '#8FB0A9';
        color.style.backgroundColor = '#FBD266';
    } else {
        write.style.backgroundColor = '#FBD266';
        erase.style.backgroundColor = '#FBD266';
        color.style.backgroundColor = '#8FB0A9';
    }
}

function modes() {
    const write = document.getElementById('write-button');
    const erase = document.getElementById('erase-button');
    const color = document.getElementById('color-button');

    // write.addEventListener('click', () => {
    //     mode = '#BFAA8C';
    //     write.style.backgroundColor = '#FBD266'; // green
    //     erase.style.backgroundColor = '#8FB0A9'; // yellow
    //     color.style.backgroundColor = '#8FB0A9';
    // });
    // erase.addEventListener('click', () => {
    //     mode = '#F5F5DC';
    //     write.style.backgroundColor = '#8FB0A9';
    //     erase.style.backgroundColor = '#FBD266';
    //     color.style.backgroundColor = '#8FB0A9';
    // });
    // color.addEventListener('click', () => {
    //     mode = 'color';
    //     write.style.backgroundColor = '#8FB0A9';
    //     erase.style.backgroundColor = '#8FB0A9';
    //     color.style.backgroundColor = '#FBD266';
    // });

    // shorthand
    const modeButtons = document.querySelectorAll('.mode-button');
    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            mode = button.value;
            selectedMode(write, erase, color, button.id);
        });
    });
}

// mouseover shade function
function shade() {
    const gridCells = document.querySelectorAll('.square');
    gridCells.forEach((cell) => {
        cell.addEventListener('mouseover', event => {
            console.log(event.buttons)
            if (event.buttons === 1) {
                try {
                    if (mode === 'color') {
                        cell.style.cursor = 'crosshair';
                        cell.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}` // generates random color
                    } else {
                        cell.style.cursor = 'crosshair';
                        cell.style.backgroundColor = mode;
                    }
                } catch {}
            }
        });
    });
}

// makes all cells' color to #F5F5DC
function reset() {
    const gridCells = document.querySelectorAll('.square');
    gridCells.forEach((cell) => {
        cell.style.backgroundColor = '#F5F5DC';
    })
}

function main() {
    const squareContainer = document.querySelector('.square-container');
    const SQUARE_CONTAINER_WIDTH_HEIGHT = 400; // fixed width and height of square container
    initialSquares(squareContainer, SQUARE_CONTAINER_WIDTH_HEIGHT); // displays the square container with the initial number of squares
    let mode;
    modes();
    shade();

    // slider
    const slider = document.getElementById('square-range');
    const squares = document.getElementById('squares');
    squares.textContent = `${slider.value} \u00d7 ${slider.value}`;

    slider.oninput = function() {
        squares.textContent = `${slider.value} \u00d7 ${slider.value}`; // displays the number of squares
        squareContainer.innerHTML = ''; // removes all the previous elements
        let squareNumber = +this.value;
        const SQUARE_WIDTH_HEIGHT = SQUARE_CONTAINER_WIDTH_HEIGHT / squareNumber;
        for (let i = 0; i < (squareNumber ** 2); i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('style', `height: ${SQUARE_WIDTH_HEIGHT}px; width: ${SQUARE_WIDTH_HEIGHT}px`)
            squareContainer.appendChild(square);
        }
        shade();
    }
}

main();
