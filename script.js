// Two player Tic Tac Toe game using Factory Functions
// and the Module Patterns

// Gameboard Module

const gameBoard = (() => {
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

// Player Factory Function

const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return {
        getName,
        getSymbol,
    };
}