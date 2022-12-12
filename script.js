// Two player Tic Tac Toe game using Factory Functions
// and the Module Patterns

// DOM elements

let boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('#reset');
let message = document.querySelector('#message');

// Factory Functions

const player = (name, symbol) => {
    console.log('player');
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol,
    };
};

// global variables

let player1 = player('Player 1', 'X');
let player2 = player('Player 2', 'O');
let currentPlayer = player1;
let gameOver = false;

// Modules

// Gameboard Module

const gameBoard = (() => {
    console.log('gameBoard');
    let board = ['', '', '', '', '', '', '', '', ''];
    
    const getBoard = () => board;
    
    const setBoard = (index, player) => {
        board[index] = player;
    };
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };
    
    return {
        getBoard,
        setBoard,
        resetBoard,
    };
})();

// displayController Module

const displayController = (() => {
    console.log('displayController');
    
    const render = () => {
        console.log('render');
        let board = gameBoard.getBoard();
        boxes.forEach((box, index) => {
            box.textContent = board[index];
        });
    };

    const reset = () => {
        gameBoard.resetBoard();
        render();
        message.textContent = "X's turn";
        gameOver = false;
        currentPlayer = player1;
    }

    resetButton.addEventListener('click', reset);

    const addClickEvent = () => {
        console.log('addClickEvent');
        boxes.forEach((box, index) => {
            box.addEventListener('click', () => {
                if (gameBoard.getBoard()[index] === '' && !gameOver) {
                
                    gameBoard.setBoard(index, currentPlayer.getSymbol());
                    render();

                    if (checkWin()) 
                    {
                        message.textContent = `${currentPlayer.getName()} wins!`;
                        gameOver = true;
                    } else {
                        switchPlayer();
                    }
                }
            });
        });
    }

    addClickEvent();
    render();

})();

// Game Module

const gameFlow = (() => {
    console.log('gameFlow');

    const checkWin = () => {
        let win = false;
        let board = gameBoard.getBoard();
        let winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        winConditions.forEach((condition) => {
            if (board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]] && board[condition[0]] !== '') {
                win = true;
            }
        });
        return win;
    };

    const switchPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
            message.textContent = "O's turn";
        } else {
            currentPlayer = player1;
            message.textContent = "X's turn";
        }
    };

    return {
        checkWin,
        switchPlayer,
    };
})();
