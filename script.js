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
const playerName = document.querySelector('.nameContainer');
const pvp = document.querySelectorAll('.pvp');



const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol,
    };
};

// global variables
let player1Name = document.querySelector('#player1');
let player2Name = document.querySelector('#player2');
let player1 = player('Player 1', 'X');
let player2 = player('Player 2', 'O');
let currentPlayer = player1;
let gameOver = false;
let playvsComputer = false;
let oppcomputer = false;
// hide play screen and show start screen on page load
playScreen.style.display = 'none';

pvp.forEach((player) => {
    player.style.display = 'none';
});

// display play screen on click 
const startGame = () => {
    startScreen.style.display = 'none';
    playScreen.style.display = 'block';
}

vsComputer.addEventListener('click', () => {
    const computer = player('Computer', 'O');
    player2 = computer;
    playvsComputer = true;
    oppcomputer = true;
    startGame();
});

vsPlayer.addEventListener('click', startGame);

// display player name input on click
vsPlayer.addEventListener('click', () => {
    pvp.forEach((player) => {
        player.style.display = 'block';
    });
});

// player name input

// Factory Functions
player1Name.addEventListener('change', () => {
    player1 = player(player1Name.value, 'X');
    currentPlayer = player1;
    message.textContent = `${player1.getName()}'s turn`;

});

player2Name.addEventListener('change', () => {
    player2 = player(player2Name.value, 'O');
});


// Modules

// Gameboard Module

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    
    const getBoard = () => board;
    
    const setBoard = (index, playerSymbol) => {
        board[index] = playerSymbol;
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
        // clear player names and reset player names
        player1Name.value = '';
        player2Name.value = '';
        player1 = player('Player 1', 'X');
        player2 = player('Player 2', 'O');
        currentPlayer = player1;
        
    }

    resetButton.addEventListener('click', reset);

    let clicks = 0;

    // add click event to each box 
    const addClickEvent = () => {
        boxes.forEach((box, index) => {
            box.addEventListener('click', () => {
                if (gameBoard.getBoard()[index] === '' && !gameOver) {
                    
                    gameBoard.setBoard(index, currentPlayer.getSymbol());
                    render();
                    clicks++;
            
                    if (gameFlow.checkWin()){
                        message.textContent = `${currentPlayer.getName()} wins!`;
                        gameOver = true;
                    } 
                    else {
                        gameFlow.switchPlayer();
                        console.log ('wtf');
                        if (playvsComputer && currentPlayer.getName() === 'Computer' && clicks < 5) {
                            // if all boxes are filled after last player render, game is over and do not call computerMove()
                    
                            computerMove();
                            if (gameFlow.checkWin()){
                                message.textContent = `${currentPlayer.getName()} wins!`;
                                gameOver = true;
                            }
                            else {
                                console.log ('switching player');
                                gameFlow.switchPlayer();
                            }
                            
                        }
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


    // computer move using random number
    const computerMove = () => {
            
        let board = gameBoard.getBoard();
        let random = Math.floor(Math.random() * 9);
        while (board[random] !== '') {
            random = Math.floor(Math.random() * 9);
        }
        gameBoard.setBoard(random, player2.getSymbol());
        console.log ('rendering computer move');
        render();
        if (gameFlow.checkWin()){
            console.log('computer wins');
            message.textContent = `${player2.getName()} wins!`;
            gameOver = true;
        }
        else {
            console.log('switching player');
            console.log("player1: " + player1.getName());
            console.log("player2: " + player2.getName());            
        }
        // check for draw
        let draw = true;
        console.log("checking for draw")
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
            message.textContent = `${player2.getName()}'s turn`;
        } 
        else if (currentPlayer.getName() === 'Computer') {
            currentPlayer = player1;
            message.textContent = `${player1.getName()}'s turn`;
        }
        
        else {
            currentPlayer = player1;
            message.textContent = `${player1.getName()}'s turn`;
        }
    };

    return {
        checkWin,
        switchPlayer,
    };
})();


// add Computer Player Module
// use minimax algorithm

























// add AI Module
// use minimax algorithm

const ai = (() => {
    const minimax = (board, depth, isMaximizing) => {
        let result = gameFlow.checkWin();
        if (result !== null) {
            return result;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = computerPlayer.getComputer().getSymbol();
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = player1.getSymbol();
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const getBestMove = () => {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = computerPlayer.getComputer().getSymbol();
                let score = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    };

    return {
        getBestMove,
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












/* const computerPlayer = (() => {
    const computer = player('Computer', 'O');
    const getComputer = () => computer;
    return {
        getComputer,
    };
})();

vsComputer.addEventListener('click', () => {
    playvscomputer = true;

});


const computerMove = () => {
    let emptyBoxes = [];
    // find all empty boxes on the game board
    gameBoard.getBoard().forEach((box, index) => {
        if (box === '') {
            emptyBoxes.push(index);
        }
    });
    // randomly select an empty box and make a move
    if (emptyBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        gameBoard.setBoard(emptyBoxes[randomIndex], player2.getSymbol());
    }
}

const addClickEvent = () => {
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (gameBoard.getBoard()[index] === '' && !gameOver) {
                gameBoard.setBoard(index, currentPlayer.getSymbol());
                render();
                if (gameFlow.checkWin()) {
                    message.textContent = `${currentPlayer.getName()} wins!`;
                    gameOver = true;
                } else {
                    gameFlow.switchPlayer();
                    if (playvsComputer && currentPlayer === player2) {
                        computerMove();
                        render();
                        if (gameFlow.checkWin()) {
                            message.textContent = `Computer wins!`;
                            gameOver = true;
                        } else {
                            gameFlow.switchPlayer();
                        }
                    }
                }
                // check for draw
                let draw = true;
                gameBoard.getBoard().forEach((box) => {
                    if (box === '') {
                        draw = false;
                    }
                });
                if (draw && !gameOver) {
                    message.textContent = 'Draw!';
                    gameOver = true;
                }
            }
        });
    });
} */