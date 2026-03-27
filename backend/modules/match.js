const matchInit = (ctx, logger, nk, params) => {
  return {
    state: {
      board: Array(9).fill(""),
      currentTurn: "X",
      players: {},
      winner: null
    },
    tickRate: 1
  };
};

const matchJoin = (ctx, logger, nk, dispatcher, tick, state, presences) => {
  presences.forEach(p => {
    if (!state.players["X"]) {
      state.players["X"] = p.userId;
    } else if (!state.players["O"]) {
      state.players["O"] = p.userId;
    }
  });

  return { state };
};

const checkWinner = (board) => {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const matchLoop = (ctx, logger, nk, dispatcher, tick, state, messages) => {
  messages.forEach(msg => {
    const data = JSON.parse(msg.data);

    const playerSymbol =
      state.players["X"] === msg.sender.userId ? "X" : "O";

    // ❌ Validation
    if (state.winner) return;
    if (state.currentTurn !== playerSymbol) return;
    if (state.board[data.pos] !== "") return;

    // ✅ Apply move
    state.board[data.pos] = playerSymbol;

    // Check winner
    const winner = checkWinner(state.board);
    if (winner) {
      state.winner = winner;
    } else {
      state.currentTurn = playerSymbol === "X" ? "O" : "X";
    }

    // Broadcast state
    dispatcher.broadcastMessage(1, JSON.stringify(state));
  });

  return { state };
};

const matchLeave = (ctx, logger, nk, dispatcher, tick, state, presences) => {
  presences.forEach(p => {
    if (state.players["X"] === p.userId) delete state.players["X"];
    if (state.players["O"] === p.userId) delete state.players["O"];
  });

  return { state };
};

globalThis.matchInit = matchInit;
globalThis.matchJoin = matchJoin;
globalThis.matchLoop = matchLoop;
globalThis.matchLeave = matchLeave;