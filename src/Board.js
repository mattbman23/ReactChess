import React from 'react';
import { BoardSquare } from './BoardSquare';

export const Board = ({ board }) => {
  const getXY = (i) => {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
    return { x, y };
  };

  const isBlack = (i) => {
    const { x, y } = getXY(i);
    return (x + y) % 2 === 1;
  };

  const getPosition = (i) => {
    const { x, y } = getXY(i);
    const letter = 'abcdefgh'.split('')[x];
    return `${letter}${y + 1}`;
  };

  return (
    <div className="board">
      {board.flat().map((piece, idx) => (
        <div key={idx} className="square">
          <BoardSquare
            piece={piece}
            black={isBlack(idx)}
            position={getPosition(idx)}
          />
        </div>
      ))}
    </div>
  );
};
