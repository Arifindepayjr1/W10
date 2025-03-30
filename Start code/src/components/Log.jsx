import React from 'react';

const Log = ({ battleLog }) => {
  return (
    <section id="log" className="container">
      <h2>Battle Log</h2>
      <ul>
        {battleLog.map((logItem, index) => (
          <li key={index}>
            <span className={`log--${logItem.actor.toLowerCase()}`}>
              {logItem.actor}
            </span>
            {logItem.action === 'attack' && (
              <span> attacked for <span className="log--damage">{logItem.value}</span></span>
            )}
            {logItem.action === 'heal' && (
              <span> healed for <span className="log--heal">{logItem.value}</span></span>
            )}
            {logItem.action === 'special' && (
              <span> performed special attack for <span className="log--damage">{logItem.value}</span></span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Log;