/* eslint-disable no-magic-numbers */
document.addEventListener('DOMContentLoaded', () => {
    createTail();

    let xTurn;
    const announcer = document.querySelector('.announcer');
    const message = document.querySelector('.display');
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function createTail() {
        const container = document.querySelector('.container');
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                container.appendChild(tile);
            }
        }
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.addEventListener('click', handelClick, {once: true});
        });

        function handelClick(e) {
            const tail = e.target;
            
            let currentClass;
            let currentTurn;

            if(!xTurn) {
                currentTurn = 'X';
                currentClass = 'playerX';
                tail.classList.add(currentTurn);
                message.innerHTML = `Player <span class="display-player playerO">O</span> turn`;
            } else {
                currentTurn = 'O';
                currentClass = 'playerO';
                tail.classList.add(currentTurn);
                message.innerHTML = `Player <span class="display-player playerX">X</span> turn`;
            }

            if(checkWin(currentTurn)) {
                gameEnd(currentTurn);
                tiles.forEach(tile => {
                    tile.removeEventListener('click', handelClick);
                });
            } else if(!checkDraw()) {
                message.classList.add('hide');
                announcer.classList.remove('hide');
                announcer.innerHTML = 'Draw!';
            }
            
            placeMark(tail, currentTurn, currentClass);

            swapTurn();
        }
        function placeMark(tail, currentTurn, currentClass) {
            const span = document.createElement('span');
            span.classList.add(currentClass);
            const mark = document.createTextNode(currentTurn);
            span.appendChild(mark);
            tail.appendChild(span);
        }

        function checkWin(currentTurn) {
            return winningCombination.some(combination => {
                return combination.every(index => {
                    const tiles = document.querySelectorAll('.tile');
                    return tiles[index].classList.contains(currentTurn);
                });
            });
        }

        function checkDraw() {
            const tiles = document.querySelectorAll('.tile');
            let counter = 8;
            tiles.forEach(tile => {
                if(tile.childNodes.length) {
                    --counter;
                    console.log(counter);
                }
            });
            return !!counter;
        }

        function gameEnd(currentTurn) {
            message.classList.add('hide');
            switch (currentTurn) {
                case 'X':
                    announcer.classList.remove('hide');
                    announcer.innerHTML = 'Player <span class="display-player playerX">X</span> won';
                    break;
                case 'O':
                    announcer.classList.remove('hide');
                    announcer.innerHTML = 'Player <span class="display-player playerO">O</span> won';
                    break;
                default:
                    break;
            }
        }

        function swapTurn() {
            xTurn = !xTurn;
        }
    }

    const reset = document.getElementById('reset');

    reset.onclick = () => {
        const container = document.querySelector('.container');
        announcer.classList.add('hide');
        message.classList.remove('hide');
        
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                const tile = document.querySelector('.tile');
                container.removeChild(tile);
            }
        }
        createTail();
    };

    const icons = document.querySelectorAll('.avatar-icon');
    const containers = document.querySelectorAll('.avatar-container');
    const avatarBox = document.querySelector('.icons');

    icons.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    avatarBox.addEventListener('dragover', e => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        avatarBox.appendChild(draggable);
        });

    containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        if(!container.childNodes.length) {
            container.appendChild(draggable);
        } else {
            return;
        }
    });
    });
});
