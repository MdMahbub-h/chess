// init board desktop

function setDesktopBoard(position = false, sparePieces = false) {
  gameEnd = false;

  // mode to set chess figures in custom position
  if (sparePieces) {
    board = ChessBoard("board", {
      draggable: true,
      dropOffBoard: "trash",
      sparePieces: true,
      pieceTheme: "img/pieces/{piece}.svg",
    });
    return;
  }

  // init board with preloaded position (fen)
  if (position == false) {
    position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  } else {
    console.log("Custom: " + position);
  }

  // game rules control object
  game = new Chess(position);

  var onDragStart = function (source, piece) {
    // do not pick up pieces if the game is over or if it's not that side's turn
    if (
      game.game_over() === true ||
      (game.turn() === "w" && piece.search(/^b/) !== -1) ||
      (game.turn() === "b" && piece.search(/^w/) !== -1)
    ) {
      return false;
    }
  };

  var onDrop = function (source, target, piece, newPos, oldPos, orientation) {
    removeGreySquares();

    if (!gameStarted) {
      gameStarted = true;
      $("#btn-choose-white-side, #btn-choose-black-side").addClass("locked");
    }

    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: "q",
    });

    // illegal move
    if (move === null) {
      console.log("Player illegal move.");
      return "snapback";
    }

    promotionPos = newPos;
    moveSource = source;
    moveTarget = target;

    // promotion move
    if (move.promotion != undefined) {
      $("#game-promotion").removeClass("hidden");
      $("#board").addClass("locked");
      console.log("Paused for promotion.");
      return;
    }

    dumpLog(false);

    listMoves();
    opponentTurn();
  };

  var onMouseoverSquare = function (square, piece) {
    // get list of possible moves for this square
    var moves = game.moves({
      square: square,
      verbose: true,
    });

    // skip if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the square they moused over
    greySquare(square);

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
      greySquare(moves[i].to);
    }
  };

  var onMouseoutSquare = function (square, piece) {
    removeGreySquares();
  };

  var onSnapEnd = function () {
    board.position(game.fen());
    gameHistoryAddMove(game.fen());
    if (game.history().length > 0) $("#btn-take-back").removeClass("disabled");
  };

  board = ChessBoard("board", {
    position: position,
    draggable: true,
    showNotation: true,

    onDragStart: onDragStart,
    dropOffBoard: "snapback",
    onDrop: onDrop,

    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,

    onSnapEnd: onSnapEnd,
    pieceTheme: "img/pieces/{piece}.png",
  });

  gameHistoryClear();

  // field highlight functions
  var removeGreySquares = function () {
    $("#board .square-55d63").css("background", "");
  };

  var greySquare = function (square) {
    var squareEl = $("#board .square-" + square),
      background = "#fbe3e7";
    if (squareEl.hasClass("black-3c85d") === true) background = "#f7c5ceff";
    squareEl.css("background", background);
  };
}
