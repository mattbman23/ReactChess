import React, { useEffect, useState } from 'react';
import { gameSubject, initGame, resetGame } from './Game';
import { Board } from './Board';

import './App.css';

export const App = () => {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
    });

    return () => subscribe.unsubscribe();
  }, []);

  return (
    <div className="container">
      <div className="navbar">
        {isGameOver ? <h2>GAME OVER</h2> : <h1></h1>}
        <button className="newGameBtn" onClick={() => resetGame()}>
          New Games
        </button>
      </div>

      <div className="board-container">
        <Board board={board} />
      </div>

      {result && <h1 className="text">GAME </h1>}
    </div>
  );
};
