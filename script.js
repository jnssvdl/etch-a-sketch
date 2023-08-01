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

function modes() {

    // const write = document.getElementById('write-button');
    // const erase = document.getElementById('erase-button');
    // const color = document.getElementById('color-button');
    // write.addEventListener('click', () => {
    //     mode = 'black';
    // });
    // erase.addEventListener('click', () => {
    //     mode = 'white';
    // });
    // color.addEventListener('click', () => {
    //     mode = 'color';
    // });

    const modeButtons = document.querySelectorAll('.mode-button');
    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log(button.id)
            mode = button.id;
        });
    });
}

// mouseover shade function
function shade() {
    const gridCells = document.querySelectorAll('.square');
    gridCells.forEach((cell) => {
        cell.addEventListener('mouseover', () => {
            if (mode === 'color') {
                cell.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}` // generates random color
            } else {
                cell.style.backgroundColor = mode;
            }
        });
    });
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
