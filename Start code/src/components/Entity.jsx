import React from 'react';

const Entity = ({ title, healthPercentage }) => {
  return (
    <section className="container">
      <h2>{title}</h2>
      <div className="healthbar">
        <div 
          style={{ width: `${healthPercentage}%` }} 
          className="healthbar__value"
        ></div>
      </div>
    </section>
  );
};

export default Entity;