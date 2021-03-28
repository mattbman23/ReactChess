import React from 'react';
import { Square } from './Square';
import { move } from './Game';

const promotionPieces = 'rnbq'.split('');

export const Promote = ({ promotion: { from, to, color } }) => {
  return (
    <div className="board">
      {promotionPieces.map((p, i) => {
        return (
          <div key={i} className="promote-square">
            <Square black={i % 3 === 0}>
              <div
                className="piece-container"
                onClick={() => move(from, to, p)}
              >
                <img
                  src={`./images/${p}_${color}.png`}
                  alt=""
                  className="piece cursor-pointer"
                />
              </div>
            </Square>
          </div>
        );
      })}
    </div>
  );
};
