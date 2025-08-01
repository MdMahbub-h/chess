function Chessboard(a, b) {
  "use strict";
  (Chessboard.ANIMATION = { fadeInTime: 1e3, fadeOutTime: 1e3 }),
    (Chessboard.CSS_PREFIX = "chess_"),
    (Chessboard.CSS = {
      pathSeparator: "_",
      board: {
        id: Chessboard.CSS_PREFIX + "board",
        className: Chessboard.CSS_PREFIX + "board",
      },
      square: {
        className: Chessboard.CSS_PREFIX + "square",
        lastColumn: { className: Chessboard.CSS_PREFIX + "square_last_column" },
        idPrefix: Chessboard.CSS_PREFIX + "square",
        dark: { className: Chessboard.CSS_PREFIX + "square_dark" },
        light: { className: Chessboard.CSS_PREFIX + "square_light" },
        createClassName: function (a) {
          return (
            " " +
            ((a + ChessUtils.convertIndexToRow(a)) % 2 === 0
              ? Chessboard.CSS.square.dark.className
              : Chessboard.CSS.square.light.className)
          );
        },
        selected: { className: Chessboard.CSS_PREFIX + "square_selected" },
        validMove: { className: Chessboard.CSS_PREFIX + "square_valid_move" },
      },
      player: {
        black: {
          className:
            Chessboard.CSS_PREFIX +
            "player_" +
            ChessUtils.PLAYER.black.className,
        },
        white: {
          className:
            Chessboard.CSS_PREFIX +
            "player_" +
            ChessUtils.PLAYER.white.className,
        },
        createClassName: function (a) {
          return "white" === a
            ? Chessboard.CSS.player.white.className
            : Chessboard.CSS.player.black.className;
        },
      },
      piece: {
        idPrefix: Chessboard.CSS_PREFIX + "piece",
        className: Chessboard.CSS_PREFIX + "piece",
        createClassName: function (a) {
          return Chessboard.CSS.piece.className + "_" + a;
        },
        none: { className: Chessboard.CSS_PREFIX + "piece_none" },
      },
      label: {
        className: Chessboard.CSS_PREFIX + "label",
        hidden: { className: Chessboard.CSS_PREFIX + "label_hidden" },
        row: {
          className: Chessboard.CSS_PREFIX + "label_row",
          reversed: { className: Chessboard.CSS_PREFIX + "label_row_reversed" },
        },
        column: {
          className: Chessboard.CSS_PREFIX + "label_column",
          reversed: {
            className: Chessboard.CSS_PREFIX + "label_column_reversed",
          },
        },
      },
      style: { id: Chessboard.CSS_PREFIX + "style" },
    });
  var c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x,
    y,
    z = this,
    A = !1,
    B = ChessUtils.convertFenToPosition(ChessUtils.FEN.positions.empty),
    C = null,
    D = ChessUtils.ORIENTATION.white,
    E = { useAnimation: !0, showBoardLabels: !0, showNextMove: !0 },
    F = {
      onMove: null,
      onPieceSelected: null,
      onChange: null,
      onChanged: null,
    },
    G = !1,
    H = !0;
  (this.clear = function () {
    G ||
      (this.setPosition(ChessUtils.FEN.positions.empty),
      this.setOrientation(ChessUtils.ORIENTATION.white));
  }),
    (this.destroy = function () {
      $(x).html(""), g();
    }),
    (this.position = function (a, b) {
      return 0 === arguments.length ||
        "undefined" == typeof a ||
        ("string" == typeof a && a.toLowerCase() === ChessUtils.FEN.id) ||
        ("string" == typeof a && a.toLowerCase() === ChessUtils.NOTATION.id)
        ? this.getPosition(a)
        : void this.setPosition(a, b);
    }),
    (this.setPosition = function (a, b) {
      var c = A;
      if (
        !G &&
        (l(),
        (b =
          1 === arguments.length || "undefined" == typeof b
            ? E.useAnimation
            : b),
        "string" == typeof a && a.toLowerCase() === ChessUtils.FEN.startId
          ? (a = ChessUtils.convertFenToPosition(
              ChessUtils.FEN.positions.start
            ))
          : "string" == typeof a && a.toLowerCase() === ChessUtils.FEN.emptyId
          ? (a = ChessUtils.convertFenToPosition(
              ChessUtils.FEN.positions.empty
            ))
          : "string" == typeof a
          ? -1 !== a.indexOf(ChessUtils.FEN.rowSeparator) &&
            (a = ChessUtils.convertFenToPosition(a))
          : "object" == typeof a &&
            (a = ChessUtils.convertNotationToPosition(a)),
        B !== a)
      ) {
        if (
          F.hasOwnProperty("onChange") === !0 &&
          "function" == typeof F.onChange &&
          !H
        ) {
          if (((G = !0), !F.onChange(B, a))) return;
          G = !1;
        }
        (A = !1),
          b === !0 ? (r(a), (B = a)) : ((B = a), q()),
          F.hasOwnProperty("onChanged") !== !0 ||
            "function" != typeof F.onChanged ||
            H ||
            ((G = !0), F.onChanged(B), (G = !1)),
          (A = c);
      }
    }),
    (this.getPosition = function (a) {
      return 0 !== arguments.length && a
        ? a.toLowerCase() === ChessUtils.FEN.id
          ? ChessUtils.convertPositionToFen(B)
          : a.toLowerCase() === ChessUtils.NOTATION.id
          ? ChessUtils.convertPositionToNotation(B)
          : void 0
        : B;
    }),
    (this.move = function (a) {
      var b,
        c,
        d = [],
        e = [],
        f = B,
        g = E.useAnimation;
      if (!G) {
        if (
          ("boolean" == typeof arguments[arguments.length - 1]
            ? ((g = arguments[arguments.length - 1]),
              (c = arguments.length - 1))
            : (c = arguments.length),
          "string" == typeof a)
        )
          if (-1 !== a.search("-"))
            for (b = 0; c > b; b++)
              d.push(
                ChessUtils.convertNotationSquareToIndex(
                  arguments[b].split("-")[0]
                )
              ),
                e.push(
                  ChessUtils.convertNotationSquareToIndex(
                    arguments[b].split("-")[1]
                  )
                );
          else
            for (b = 0; c > b; b += 2)
              d.push(ChessUtils.convertNotationSquareToIndex(arguments[b])),
                e.push(
                  ChessUtils.convertNotationSquareToIndex(arguments[b + 1])
                );
        else
          for (b = 0; c > b; b += 2)
            d.push(arguments[b]), e.push(arguments[b + 1]);
        for (b = 0; b < d.length; b++)
          B[d[b]] !== ChessUtils.POSITION.empty &&
            ((f = ChessUtils.replaceStringAt(
              f,
              d[b],
              ChessUtils.POSITION.empty
            )),
            (f = ChessUtils.replaceStringAt(f, e[b], B[d[b]])));
        this.setPosition(f, g);
      }
    }),
    (this.fen = function (a, b) {
      return this.position(ChessUtils.FEN.id, a, b);
    }),
    (this.orientation = function (a) {
      return 0 === arguments.length
        ? this.getOrientation()
        : void this.setOrientation(a);
    }),
    (this.setOrientation = function (a) {
      (a === ChessUtils.ORIENTATION.flip || D !== a) &&
        (l(),
        (D =
          D === ChessUtils.ORIENTATION.white
            ? ChessUtils.ORIENTATION.black
            : ChessUtils.ORIENTATION.white),
        D === ChessUtils.ORIENTATION.white
          ? ($("." + Chessboard.CSS.label.row.className).removeClass(
              Chessboard.CSS.label.hidden.className
            ),
            $("." + Chessboard.CSS.label.column.className).removeClass(
              Chessboard.CSS.label.hidden.className
            ),
            $("." + Chessboard.CSS.label.row.reversed.className).addClass(
              Chessboard.CSS.label.hidden.className
            ),
            $("." + Chessboard.CSS.label.column.reversed.className).addClass(
              Chessboard.CSS.label.hidden.className
            ))
          : ($("." + Chessboard.CSS.label.row.className).addClass(
              Chessboard.CSS.label.hidden.className
            ),
            $("." + Chessboard.CSS.label.column.className).addClass(
              Chessboard.CSS.label.hidden.className
            ),
            $("." + Chessboard.CSS.label.row.reversed.className).removeClass(
              Chessboard.CSS.label.hidden.className
            ),
            $("." + Chessboard.CSS.label.column.reversed.className).removeClass(
              Chessboard.CSS.label.hidden.className
            )),
        q());
    }),
    (this.getOrientation = function () {
      return D;
    }),
    (this.resize = function () {
      h();
    }),
    (this.start = function (a) {
      G ||
        ((a = 0 === arguments.length ? E.useAnimation : a),
        this.position(ChessUtils.FEN.positions.start, a),
        (D = ChessUtils.ORIENTATION.white));
    }),
    (this.enableUserInput = function (a) {
      0 === arguments.length && (a = !0), (A = a);
    }),
    (this.isUserInputEnabled = function () {
      return A;
    }),
    (c = function (a, b) {
      var c;
      return (c = d(b)), e(a), f(), (A = !0), c;
    }),
    (d = function (a) {
      var b;
      return "undefined" == typeof a
        ? (b = ChessUtils.convertFenToPosition(ChessUtils.FEN.positions.start))
        : "string" == typeof a
        ? (b =
            a.toLowerCase() === ChessUtils.FEN.startId
              ? ChessUtils.convertFenToPosition(ChessUtils.FEN.positions.start)
              : a.toLowerCase() === ChessUtils.FEN.emptyId
              ? ChessUtils.convertFenToPosition(ChessUtils.FEN.positions.empty)
              : a)
        : "undefined" == typeof a.position
        ? (b = ChessUtils.convertNotationToPosition(a))
        : (null !== a.position &&
            (ChessUtils.isValidFen(a.position) &&
              (a.position = ChessUtils.convertFenToPosition(a.position)),
            (b = a.position)),
          (D =
            a.orientation === ChessUtils.ORIENTATION.black
              ? ChessUtils.ORIENTATION.black
              : ChessUtils.ORIENTATION.white),
          (E.useAnimation = a.useAnimation === !1 ? !1 : !0),
          (E.showBoardLabels =
            a.showNotation === !1 || a.showBoardLabels === !1 ? !1 : !0),
          (E.showNextMove = a.showNextMove === !1 ? !1 : !0),
          a.eventHandlers &&
            (a.eventHandlers.onChange &&
              "function" == typeof a.eventHandlers.onChange &&
              (F.onChange = a.eventHandlers.onChange),
            a.eventHandlers.onChanged &&
              "function" == typeof a.eventHandlers.onChanged &&
              (F.onChanged = a.eventHandlers.onChanged),
            a.eventHandlers.onPieceSelected &&
              "function" == typeof a.eventHandlers.onPieceSelected &&
              (F.onPieceSelected = a.eventHandlers.onPieceSelected),
            a.eventHandlers.onMove &&
              "function" == typeof a.eventHandlers.onMove &&
              (F.onMove = a.eventHandlers.onMove)),
          b);
    }),
    (e = function (a) {
      var b,
        c,
        d,
        e = "";
      if (((x = "#" + a), !$(x)))
        throw new Error("ContainerId provided doesn't point to a DOM element.");
      for (
        e += '<style id="' + w() + '"></style>',
          e +=
            '<div id="' +
            t() +
            '" class="' +
            Chessboard.CSS.board.className +
            '">',
          b = 0;
        64 > b;
        b++
      )
        (c = u(b)),
          (d = Chessboard.CSS.square.className),
          (d += " " + Chessboard.CSS.square.createClassName(b)),
          b % 8 === 7 &&
            (d += " " + Chessboard.CSS.square.lastColumn.className),
          (e += '<div id="' + c + '" class="' + d + '">'),
          0 === ChessUtils.convertIndexToRow(b) &&
            (e +=
              '<div class="' +
              Chessboard.CSS.label.className +
              " " +
              Chessboard.CSS.label.column.className +
              '">' +
              ChessUtils.NOTATION.columnConverter[
                ChessUtils.convertIndexToColumn(b)
              ] +
              "</div>"),
          7 === ChessUtils.convertIndexToRow(b) &&
            (e +=
              '<div class="' +
              Chessboard.CSS.label.className +
              " " +
              Chessboard.CSS.label.hidden.className +
              " " +
              Chessboard.CSS.label.column.reversed.className +
              '">' +
              ChessUtils.NOTATION.columnConverter[
                ChessUtils.convertIndexToColumn(7 - b)
              ] +
              "</div>"),
          0 === ChessUtils.convertIndexToColumn(b) &&
            (e +=
              '<div class="' +
              Chessboard.CSS.label.className +
              " " +
              Chessboard.CSS.label.row.className +
              '">' +
              ChessUtils.NOTATION.rowConverter[
                ChessUtils.convertIndexToRow(b)
              ] +
              "</div>"),
          7 === ChessUtils.convertIndexToColumn(b) &&
            (e +=
              '<div class="' +
              Chessboard.CSS.label.className +
              " " +
              Chessboard.CSS.label.hidden.className +
              " " +
              Chessboard.CSS.label.row.reversed.className +
              '">' +
              ChessUtils.NOTATION.rowConverter[
                7 - ChessUtils.convertIndexToRow(b)
              ] +
              "</div>"),
          (d = Chessboard.CSS.piece.className),
          (d += " " + Chessboard.CSS.piece.none.className),
          (e += '<div id="' + v(b) + '" class="' + d + '"></div>'),
          (e += "</div>");
      (e += "</div>"), $(x).html(e), $(x).css("display", "inline-block");
    }),
    (f = function () {
      $(window).on("resize.chessEvents", h),
        $("div" + x + " div." + Chessboard.CSS.square.className).on("click", i);
    }),
    (g = function () {
      $(window).unbind("resize.chessEvents"),
        $("div" + x + " div." + Chessboard.CSS.square.className).unbind(
          "click"
        );
    }),
    (h = function () {
      var a, b, c, d;
      (a = Math.floor($(x).width() / 8)),
        (b = 0.85 * a),
        (c = Math.min(Math.max(0.5 * a, 8), 20)),
        (d =
          "			div" +
          x +
          " div." +
          Chessboard.CSS.piece.className +
          " {				font-size: " +
          b +
          "px;				height: " +
          a +
          "px;			}			div" +
          x +
          " div." +
          Chessboard.CSS.label.className +
          " {				font-size: " +
          c +
          "px;				" +
          (E.showBoardLabels ? "" : "display: none;") +
          "			}"),
        $("#" + w()).html(d);
    }),
    (i = function () {
      var a,
        b,
        c = k($(this).attr("id"));
      if (A)
        if (null !== C && y.indexOf(c) > -1)
          F.onMove &&
            ((b = F.onMove({
              from: ChessUtils.convertIndexToNotationSquare(C),
              to: ChessUtils.convertIndexToNotationSquare(c),
            })),
            null !== b && (z.setPosition(b), l()));
        else if (C !== c && F.onPieceSelected)
          if (
            ((y = F.onPieceSelected(
              ChessUtils.convertIndexToNotationSquare(c)
            )),
            y && 0 !== y.length)
          ) {
            if ((m(c), !n(c)))
              for (a = 0; a < y.length; a++)
                j(y[a]).addClass(Chessboard.CSS.square.validMove.className);
          } else l();
    }),
    (l = function () {
      null !== C &&
        (j(C).removeClass(Chessboard.CSS.square.selected.className),
        $(
          "div" + x + " div." + Chessboard.CSS.square.validMove.className
        ).removeClass(Chessboard.CSS.square.validMove.className)),
        (C = null);
    }),
    (m = function (a) {
      l(),
        n(a) ||
          ((C = a), j(C).addClass(Chessboard.CSS.square.selected.className));
    }),
    (j = function (a) {
      return $("#" + u(a));
    }),
    (k = function (a) {
      var b, c;
      return (
        (b = a.split(Chessboard.CSS.pathSeparator)),
        (c = parseInt(b[b.length - 1], 10)),
        D === ChessUtils.ORIENTATION.white ? c : 63 - c
      );
    }),
    (o = function (a) {
      return $("#" + v(a));
    }),
    (n = function (a) {
      return $(o(a)).hasClass(Chessboard.CSS.piece.none.className);
    }),
    (p = function (a, b, c) {
      var d = "",
        e = ChessUtils.getPlayerNameFromPiece(b),
        f = ChessUtils.PIECE.codeToPieceName[b.toLowerCase()];
      c !== !0 && (c = !1),
        (d = Chessboard.CSS.piece.className),
        b !== ChessUtils.POSITION.empty
          ? ((d += " " + Chessboard.CSS.piece.createClassName(f)),
            (d += " " + Chessboard.CSS.player.createClassName(e)))
          : (d += " " + Chessboard.CSS.piece.none.className),
        o(a).attr("class") !== d && o(a).attr("class", d),
        o(a).css("opacity", c ? 0 : 1);
    }),
    (q = function () {
      var a;
      for (a = 0; 64 > a; a++) p(a, B[a]);
    }),
    (r = function (a) {
      var b;
      for (b = 0; 64 > b; b++)
        B[b] !== a[b] &&
          ("0" !== B[b] && "0" !== a[b]
            ? (p(b, a[b], !0),
              $(o(b)).animate(
                { opacity: "1" },
                Chessboard.ANIMATION.fadeInTime
              ))
            : "0" === B[b]
            ? (p(b, a[b], !0),
              $(o(b)).animate(
                { opacity: "1" },
                Chessboard.ANIMATION.fadeInTime
              ))
            : "0" === a[b] && p(b, a[b], !0));
    }),
    (s = function () {
      return $(x).attr("id") + "_";
    }),
    (t = function () {
      return s() + Chessboard.CSS.board.id;
    }),
    (u = function (a) {
      return (
        s() +
        Chessboard.CSS.square.idPrefix +
        "_" +
        (D === ChessUtils.ORIENTATION.white ? a : 63 - a)
      );
    }),
    (v = function (a) {
      return (
        s() +
        Chessboard.CSS.piece.idPrefix +
        "_" +
        (D === ChessUtils.ORIENTATION.white ? a : 63 - a)
      );
    }),
    (w = function () {
      return s() + Chessboard.CSS.style.id;
    }),
    this.setPosition(c(a, b)),
    h(),
    D === ChessUtils.ORIENTATION.black &&
      (this.setOrientation(ChessUtils.ORIENTATION.flip),
      (D = ChessUtils.ORIENTATION.black)),
    (H = !1);
}
!(function () {
  "use strict";
  var a = {};
  (a.PLAYER = {
    black: { code: "b", notation: "b", className: "black" },
    white: { code: "w", notation: "w", className: "white" },
  }),
    (a.ORIENTATION = { white: "w", black: "b", flip: "flip" }),
    (a.PIECE = {
      none: "0",
      pawn: "p",
      rook: "r",
      knight: "n",
      bishop: "b",
      queen: "q",
      king: "k",
      codeToPieceName: {
        p: "pawn",
        r: "rook",
        n: "knight",
        b: "bishop",
        q: "queen",
        k: "king",
      },
    }),
    (a.POSITION = {
      empty: "0",
      piece: {
        pawn: "p",
        rook: "r",
        knight: "n",
        bishop: "b",
        queen: "q",
        king: "k",
      },
      validator: /^[kqrbnpKQRNBP0]+$/,
    }),
    (a.NOTATION = {
      id: "notation",
      positionValidator: /^[a-h][1-8]$/,
      pieceValidator: /^[bw][KQRNBP]$/,
      columns: String.prototype.split.call("abcdefgh", ""),
      rows: String.prototype.split.call("12345678", ""),
      columnConverter: "abcdefgh",
      rowConverter: "12345678",
    }),
    (a.FEN = {
      id: "fen",
      startId: "start",
      emptyId: "empty",
      rowValidator: /^[kqrbnpKQRNBP1-8]+$/,
      rowSeparator: "/",
      positions: {
        empty: "8/8/8/8/8/8/8/8",
        start: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
        ruyLopez: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
      },
    }),
    (a.isPieceWhite = function (b) {
      return b.toUpperCase() === b && b !== a.PIECE.none;
    }),
    (a.isPieceBlack = function (a) {
      return a.toUpperCase() !== a;
    }),
    (a.getPieceForPlayer = function (b, c) {
      return c === a.PLAYER.white.code ? b.toUpperCase() : b.toLowerCase();
    }),
    (a.getPlayerNameFromPiece = function (b) {
      return a.isPieceWhite(b)
        ? a.PLAYER.white.className
        : a.isPieceBlack(b)
        ? a.PLAYER.black.className
        : void 0;
    }),
    (a.getPlayerCodeFromPiece = function (b) {
      return a.isPieceWhite(b)
        ? a.PLAYER.white.code
        : a.isPieceBlack(b)
        ? a.PLAYER.black.code
        : void 0;
    }),
    (a.isValidPosition = function (b) {
      return "string" != typeof b
        ? !1
        : 64 !== b.length || -1 !== b.search(a.POSITION.validator)
        ? !1
        : void 0;
    }),
    (a.isValidFen = function (b) {
      var c, d;
      if ("string" != typeof b) return !1;
      if (((b = b.split(" ")[0]), (c = b.split("/")), 8 !== c.length))
        return !1;
      for (d = 0; 8 > d; d++)
        if (
          "" === c[d] ||
          c[d].length > 8 ||
          -1 !== c[d].search(a.FEN.rowValidator)
        )
          return !1;
      return !0;
    }),
    (a.isValidNotationPosition = function (b) {
      return "string" != typeof b
        ? !1
        : -1 !== b.search(a.NOTATION.positionValidator);
    }),
    (a.isValidNotationPiece = function (b) {
      return "string" != typeof b
        ? !1
        : -1 !== b.search(a.NOTATION.pieceValidator);
    }),
    (a.isValidNotation = function (b) {
      var c;
      if ("object" != typeof b) return !1;
      for (c in b)
        if (
          b.hasOwnProperty(c) &&
          (!a.isValidNotationPosition(c) || !a.isValidNotationPiece(b[c]))
        )
          return !1;
      return !0;
    }),
    (a.convertFenToPosition = function (b) {
      var c, d;
      if (a.isValidFen(b)) throw new Error('Invalid fen string "' + b + '".');
      for (d = b.split(" ")[0], c = 1; 8 >= c; c++)
        d = d.replace(new RegExp(c, "g"), a.repeatString("0", c));
      return (d = d.replace(new RegExp(a.FEN.rowSeparator, "g"), ""));
    }),
    (a.convertPositionToFen = function (b) {
      var c,
        d = "";
      if (a.isValidPosition(b))
        throw new Error('Invalid position string "' + b + '".');
      for (d = b.substr(0, 8), c = 1; 8 > c; c++)
        d += a.FEN.rowSeparator + b.substr(8 * c, 8);
      for (c = 8; c > 0; c--)
        d = d.replace(new RegExp(a.repeatString("0", c), "g"), c);
      return d;
    }),
    (a.convertPieceToNotationPiece = function (b) {
      return (
        (a.isPieceWhite(b)
          ? a.PLAYER.white.notation
          : a.PLAYER.black.notation) + b.toUpperCase()
      );
    }),
    (a.convertNotationPieceToPiece = function (b) {
      return b.split("")[0] === a.PLAYER.white.notation
        ? b.split("")[1].toUpperCase()
        : b.split("")[1].toLowerCase();
    }),
    (a.convertIndexToNotationSquare = function (b) {
      return (
        a.NOTATION.columns[a.convertIndexToColumn(b)] +
        a.NOTATION.rows[a.convertIndexToRow(b)]
      );
    }),
    (a.convertNotationSquareToIndex = function (b) {
      var c, d;
      return (
        "+" === b[b.length - 1] && (b = b.substring(0, b.length - 1)),
        (d = b.split("")[b.length - 2]),
        (c = b.split("")[b.length - 1]),
        a.convertRowColumnToIndex(
          a.NOTATION.rowConverter.search(c),
          a.NOTATION.columnConverter.search(d)
        )
      );
    }),
    (a.convertNotationToPosition = function (b) {
      var c,
        d = a.convertFenToPosition(a.FEN.positions.empty);
      if (a.isValidNotation(d))
        throw new Error('Invalid notation object "' + b.toString() + '".');
      for (c in b)
        b.hasOwnProperty(c) &&
          (d = a.replaceStringAt(
            d,
            a.convertNotationSquareToIndex(c),
            a.convertNotationPieceToPiece(b[c])
          ));
      return d;
    }),
    (a.convertPositionToNotation = function (b) {
      var c,
        d = {};
      if (a.isValidPosition(b))
        throw new Error('Invalid position string "' + b + '".');
      for (c = 0; 64 > c; c++)
        b[c] !== a.POSITION.empty &&
          (d[a.convertIndexToNotationSquare(c)] = a.convertPieceToNotationPiece(
            b[c]
          ));
      return d;
    }),
    (a.isOutOfBoard = function (a, b) {
      return 0 > a || a > 7 || 0 > b || b > 7;
    }),
    (a.convertIndexToColumn = function (a) {
      return a % 8;
    }),
    (a.convertIndexToRow = function (a) {
      return 7 - Math.floor(a / 8);
    }),
    (a.convertRowColumnToIndex = function (a, b) {
      return 8 * (7 - a) + b;
    }),
    (a.repeatString = function (a, b) {
      var c = [];
      return (c.length = b + 1), c.join(a);
    }),
    (a.replaceStringAt = function (a, b, c) {
      var d;
      return (d = a.split("")), (d[b] = c), d.join("");
    }),
    "undefined" != typeof module && "undefined" != typeof module.exports
      ? (module.exports.ChessUtils = a)
      : (window.ChessUtils = a);
})();
