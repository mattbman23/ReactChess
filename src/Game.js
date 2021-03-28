import * as Chess from 'chess.js';
import { BehaviorSubject } from 'rxjs';

const chess = new Chess();

export const gameSubject = new BehaviorSubject({
  board: chess.board(),
});

export const initGame = () => {
  const savedGame = localStorage.getItem('chessGame');

  if (savedGame) {
    chess.load(savedGame);
  }

  updateGame();
};

export const handleMove = (from, to) => {
  const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);
  if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    console.log('User can promite');
    const pendingPromotion = { from, to, color: promotions[0].color };
    updateGame(pendingPromotion);
  }

  const { pendingPromotion } = gameSubject.getValue();

  if (!pendingPromotion) {
    move(from, to);
  }
};

export const move = (from, to, promotion) => {
  let tempMove = { from, to };

  if (promotion) {
    tempMove.promotion = promotion;
  }

  const legalMove = chess.move(tempMove);
  if (legalMove) {
    updateGame();
  }
};

const updateGame = (pendingPromotion) => {
  const isGameOver = chess.game_over();

  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    result: isGameOver ? getGameResult() : null,
  };

  localStorage.setItem('chessGame', chess.fen());

  gameSubject.next(newGame);
};

const getGameResult = () => {
  if (chess.in_checkmate()) {
    const winner = chess.turn();
    return `Checkmate - Winner - ${winner}`;
  } else {
    return 'Draw';
  }
};

export const resetGame = () => {
  chess.reset();
  updateGame();
};
