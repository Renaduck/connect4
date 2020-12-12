/* 
  REQUIREMENTS:
    -New game start
    -Player must have 4 pieces in a row either horizontally, vertically, or diagonally to win
    -Only two players at a time
    -Player can only place one piece at a time
    -Each player has 21 pieces
    -When board is filled with no winner, game ends in a tie
    -Random decision for who gets first move 
    -Pieces can only drop to the bottom of the board or just above any piece previously dropped in column
*/

const models = require('./scripts/models.js');
const render = require('./scripts/render.js');

function replaceRoot(rootNode) {
  // use HTML and document.body to replace div with id="root" with given `rootNode`
}

function main() {
  // make players..
  console.debug('starting main')

  const game = new models.Game(player1, player2)
  while (game.isRunning()) {
    const rootNode = render.renderGame(game);
    replaceRoot(rootNode);
    game.nextTurn();
  }
}

main();