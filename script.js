// Two player Tic Tac Toe game using Factory Functions
// and the Module Patterns 
// hosted on Firebase

// Firebase

firebase.initializeApp({
    apiKey: "AIzaSyBHpRt93zDNSfosVB4BtMifms90EgJtC18",
    authDomain: "tictactoe-3d907.firebaseapp.com",
    projectId: "tictactoe-3d907",
    storageBucket: "tictactoe-3d907.appspot.com",
    messagingSenderId: "1013988218237",
    appId: "1:1013988218237:web:3fcff00e0ce9b44854e814",
    measurementId: "G-Z76FKG7442"
});

// DOM elements

let boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('#reset');
let message = document.querySelector('#message');
const playScreen = document.querySelector('#playScreen');
const startScreen = document.querySelector('#startScreen');
const vsComputer = document.querySelector('#vsComputer');
const vsPlayer = document.querySelector('#vsPlayer');

// hide play screen and show start screen on page load
playScreen.style.display = 'none';

// display play screen on click 
const startGame = () => {
    startScreen.style.display = 'none';
    playScreen.style.display = 'block';
}

vsComputer.addEventListener('click', startGame);
vsPlayer.addEventListener('click', startGame);










// Factory Functions

const player = (name, symbol) => {
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
    let board = ['', '', '', '', '', '', '', '', ''];
    
    const getBoard = () => board;
    
    const setBoard = (index, player) => {
        board[index] = player;
    };
    
    // reset the boxes color
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        boxes.forEach((box) => {
            box.style.color = 'rgb(163,163,163)';
        });
    };
    
    return {
        getBoard,
        setBoard,
        resetBoard,
    };
})();

// displayController Module

const displayController = (() => {
    
    const render = () => {
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

    // check for draw
    const addClickEvent = () => {
        boxes.forEach((box, index) => {
            box.addEventListener('click', () => {
                if (gameBoard.getBoard()[index] === '' && !gameOver) {
                    
                    gameBoard.setBoard(index, currentPlayer.getSymbol());
                    render();


                    if (gameFlow.checkWin()){
                        message.textContent = `${currentPlayer.getName()} wins!`;
                        gameOver = true;
                    } 
                    else {
                        gameFlow.switchPlayer();
                    }
                    // check for draw
                    let draw = true;
                    gameBoard.getBoard().forEach((box) => {
                        if (box === '' ) {
                            draw = false;
                        }
                    }
                    );
                    if (draw && !gameOver) {
                        message.textContent = 'Draw!';
                        gameOver = true;
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

    const checkWin = () => 
    {
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
                boxes[condition[0]].style.color = 'green';
                boxes[condition[1]].style.color = 'green';
                boxes[condition[2]].style.color = 'green';
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


// Firebase

const auth = firebase.auth();
const db = firebase.firestore();
const user= auth.currentUser;

const signIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

const signOut = () => {
    auth.signOut();
}

let signInButton = document.getElementById('signin');
signInButton.addEventListener('click', signIn);

let signOutButton = document.getElementById('signout');
signOutButton.addEventListener('click', signOut);



const onAuthStateChanged = () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log(user.email);
            console.log(user.displayName);

        } else {
            console.log('No user signed in');
        }
    });
}

onAuthStateChanged();

