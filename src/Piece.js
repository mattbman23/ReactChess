import React from 'react';
import { useDrag } from 'react-dnd';

export const Piece = ({ piece: { type, color }, position }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { id: `${position}_${type}_${color}` },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  }));
  const pieceImg = `./images/${type}_${color}.png`;

  return (
    <>
      <div
        className="piece-container"
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <img src={pieceImg} width="80" alt="img" className="piece" />
      </div>
    </>
  );
};
