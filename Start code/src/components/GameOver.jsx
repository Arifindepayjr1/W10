// GameOver.jsx
import React from 'react';

const GameOver = ({ winner, onRestartGame }) => {
  return (
    <section className="container">
      <h2>Game Over!</h2>
      
      {winner === 'monster' && <h3>Monster won!</h3>}
      {winner === 'player' && <h3>Player won!</h3>}
      {winner === 'draw' && <h3>It's a draw!</h3>}
      
      <button onClick={onRestartGame}>Start New Game</button>
    </section>
  );
};

export default GameOver;