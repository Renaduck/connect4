const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;

const PieceColor = {
   RED: 1,
   BLUE: 2
};

Object.freeze(Color);

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  
  askMove() {
    
  }
}

class Board {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.pieces = [];
  }
  
  update(move) {
    
  }
}

class Piece {
  constructor(color) {
    this.color
  }
}

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.turn = { player: this.player1 }
    this.board = new Board(BOARD_WIDTH, BOARD_WIDTH);
    this.winner = {}
  }
  
  runGame() {
    while(!this.winner) {
      nextTurn()
      checkWin()
      swapTurn()
    }
  }
  
  nextTurn() {
    const nextMove = this.turn.player.askMove()
    this.board.update(nextMove)
    this.board.isComplete()
  }
  
  checkWin() {
    
  }
  
  swapTurn() {
    this.turn.player = (this.turn.player + 1) % 2
  }
  
  handleClick() {
    
  }
}

export default {
  Game,
  Board,
  Piece,
  Player,
  PieceColor
}
