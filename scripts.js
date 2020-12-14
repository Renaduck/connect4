/* 
  REQUIREMENTS:
    -New game start
    -Player must have 4 pieces in a row either horizontally, vertically, or diagonally to win
    -must check for win in all directions
    -Only two players at a time
    -Player can only place one piece at a time
    -When board is filled with no winner, game ends in a tie
    -no moves should be able to be made once the game has ended 
    -must have restart button
    -Pieces can only drop to the bottom of the board or above any piece previously dropped in column
    -must update text if player wins or if a turn is ongoing
    -must have a restart game button that resets the board and turns
*/

const BOARD_COLUMNS = 7;
const BOARD_ROWS = 6;


const NOBODY = 0;
const PLAYER_1 = 1;
const PLAYER_2 = -1;

//play statuses

const STATUS = {
  [NOBODY]: {
    won: 'Game Over: Tie'
  },
  [PLAYER_1]: {
    turn: 'Turn: Player 1',
    won: 'Game Over: Player 1 Won'
  },
  [PLAYER_2]: {
    turn: 'Turn: Player 2',
    won: 'Game Over: Player 2 Won'
  }
}

const PIECE_COLOR = {
  [NOBODY]: 'white',
  [PLAYER_1]: 'red',
  [PLAYER_2]: 'blue'
}

const PLAYING = 'playing';
const GAME_OVER = 'game-over';

let gameState;
let board;
let turn
let isWaitingForPlayer;

function setupGameState() {
  gameState = 'playing';
  board = {};
  turn = PLAYER_1;
  isWaitingForPlayer = PLAYER_1;
}

function nextTurn() {
  turn *= -1;
  updateGameStatus(STATUS[turn].turn);
}

function updateGameStatus(statusText) {
  document.getElementById('gameStatusText').innerHTML = statusText
  
}

function getBoardCellString(row, column) {
  return `${row}-${column}`;
}

function getPlayerColor(player) {
  return PIECE_COLOR[player];
}

function setBoardCellCss(row, column, player) {
  const cell = document.getElementById(`boardCell-${row}-${column}`);
  cell.style.backgroundColor = getPlayerColor(player);
  
}

function clearBoardCss() {
  const boardCells = document.getElementsByClassName(`boardCell`);
  for(var i = 0; i < boardCells.length; i++) {
    boardCells[i].style.backgroundColor = getPlayerColor(NOBODY);
  }
}



function getBoardCell(row, column) {
  return board[getBoardCellString(row, column)];
}

function setBoardCell(row, column, player) {
  board[getBoardCellString(row, column)] = player;
  setBoardCellCss(row, column, player);
}

function isCellEmpty(row, column) {
  return typeof getBoardCell(row, column) === 'undefined';
}

function isBottomRow(row) {
  return (row + 1) === BOARD_ROWS;
}



function isLegalBoardMove(row, column) {
  const atBottom = isBottomRow(row);
  const overPiece = !isCellEmpty(row+1, column);
  const isEmpty = isCellEmpty(row, column);
  return (atBottom || overPiece) && isEmpty;
  
}



function isWinningMove(player, row, column) {
  const topLeft = countPiecesInDirection(player, row, column, -1, -1);
  const top = countPiecesInDirection(player, row, column, -1, 0);
  const topRight = countPiecesInDirection(player, row, column, -1, 1);
   const left = countPiecesInDirection(player, row, column, 0, -1);
  const right = countPiecesInDirection(player, row, column, 0, 1);
  const bottomLeft = countPiecesInDirection(player, row, column, 1, -1);
  const bottom = countPiecesInDirection(player, row, column, 1, 0);
   const bottomRight = countPiecesInDirection(player, row, column, 1, 1);
  
  const isWinningHorizontal = left + right + 1 >= 4;
  const isWinningVertical = top + bottom + 1 >= 4;
  const isWinningLeftDiag = topLeft + bottomRight + 1 >= 4;
   const isWinningRightDiag = bottomLeft + topRight + 1 >= 4;
  
  return isWinningHorizontal || isWinningVertical || isWinningLeftDiag || isWinningRightDiag
}



function countPiecesInDirection(player, row, column, rowDir, columnDir) {
  let pieces = 0;
  let row_i = row;
  let col_i = column;
  for (var i = 0; i < 4; i++) {
    row_i += rowDir;
    col_i += columnDir;
    if (row_i < 0 || row_i >= BOARD_ROWS || col_i < 0 || col_i >= BOARD_COLUMNS) {
      return pieces;
    }
    const piece = getBoardCell(row_i, col_i);
    if (typeof piece === 'undefined' || piece !== player) {
      return pieces;
    }
    pieces++;
  }
  return pieces;
}




function isBoardFull() {
  return Object.keys(board).length === (BOARD_ROWS * BOARD_COLUMNS)
}

function restartGame() {
  setupGameState();
  updateGameStatus(STATUS[PLAYER_1].turn);
  clearBoardCss();
}

function endGame(winner) {
  gameState = GAME_OVER;
  updateGameStatus(STATUS[winner].won);
  
}


function handleClick(row, column) {
  if (gameState !== PLAYING || !isLegalBoardMove(row, column)) {
    return;
  }
  
  setBoardCell(row, column, turn);
  
  if (isWinningMove(turn, row, column)) {
    return endGame(turn);
  }
  
  if (isBoardFull()) {
    return endGame(NOBODY)
  }
  
  nextTurn();
}




function registerClickHandlers() {
  var boardCells = document.getElementsByClassName('boardCell');
  for (var i = 0; i < boardCells.length; i++) {
    const row = Math.floor(i / BOARD_COLUMNS);
    const column = i % BOARD_COLUMNS;
    boardCells[i].onclick = () => handleClick(row, column);
  }
  
  const restartGameButton = document.getElementById('restartGameButton')
  restartGameButton.onclick = () => restartGame();
  
}

function newGame() {
  setupGameState();
  updateGameStatus(STATUS[PLAYER_1].turn);
  registerClickHandlers();
}

window.onload = () => {
  newGame();
};
