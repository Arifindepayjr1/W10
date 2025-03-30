import React, { useState, useEffect } from "react";
import Entity from "./Entity";
import GameOver from "./GameOver";
import Log from "./Log";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [battleLogs, setBattleLogs] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Constants for attack values
  const ATTACK_MIN_DAMAGE = 5;
  const ATTACK_MAX_DAMAGE = 12;
  const SPECIAL_ATTACK_MIN_DAMAGE = 10;
  const SPECIAL_ATTACK_MAX_DAMAGE = 25;
  const HEAL_MIN_VALUE = 8;
  const HEAL_MAX_VALUE = 20;
  const MONSTER_ATTACK_MIN_DAMAGE = 8;
  const MONSTER_ATTACK_MAX_DAMAGE = 15;

  // Monitor health to determine if game is over
  useEffect(() => {
    if (monsterHealth <= 0 && playerHealth <= 0) {
      // Draw scenario
      setIsGameOver(true);
      setWinner('draw');
    } else if (monsterHealth <= 0) {
      // Player won
      setIsGameOver(true);
      setWinner('player');
    } else if (playerHealth <= 0) {
      // Monster won
      setIsGameOver(true);
      setWinner('monster');
    }
  }, [playerHealth, monsterHealth]);

  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  const attackHandler = () => {
    const damage = getRandomValue(ATTACK_MIN_DAMAGE, ATTACK_MAX_DAMAGE);
    setMonsterHealth(prevHealth => Math.max(0, prevHealth - damage));
    
    addLogEntry(createLogAttack(true, damage));
    
    monsterAttackHandler();
  };

  const specialAttackHandler = () => {
    const damage = getRandomValue(SPECIAL_ATTACK_MIN_DAMAGE, SPECIAL_ATTACK_MAX_DAMAGE);
    setMonsterHealth(prevHealth => Math.max(0, prevHealth - damage));
    
    addLogEntry(createLogAttack(true, damage));
    
    monsterAttackHandler();
  };

  const healHandler = () => {
    const healing = getRandomValue(HEAL_MIN_VALUE, HEAL_MAX_VALUE);
    setPlayerHealth(prevHealth => Math.min(100, prevHealth + healing));
    
    addLogEntry(createLogHeal(healing));
    
    monsterAttackHandler();
  };

  const surrenderHandler = () => {
    setPlayerHealth(0);
    
    addLogEntry({
      isPlayer: true,
      isDamage: true,
      text: " surrendered"
    });
  };

  const restartGameHandler = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setBattleLogs([]);
    setIsGameOver(false);
    setWinner(null);
  };

  // Monster attack logic
  const monsterAttackHandler = () => {
    const damage = getRandomValue(MONSTER_ATTACK_MIN_DAMAGE, MONSTER_ATTACK_MAX_DAMAGE);
    setPlayerHealth(prevHealth => Math.max(0, prevHealth - damage));
    
    // Add to log
    addLogEntry(createLogAttack(false, damage));
  };

  // Add log entry helper
  const addLogEntry = (logEntry) => {
    setBattleLogs(prevLogs => [logEntry, ...prevLogs]);
  };

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  // Convert logs to format expected by Log component
  const formatLogsForComponent = () => {
    return battleLogs.map(log => {
      // Handle the surrender case specially
      if (log.text === " surrendered") {
        return {
          actor: 'Player',
          action: 'surrender',
          value: 0
        };
      }
      
      // Handle regular attack and heal logs
      return {
        actor: log.isPlayer ? 'Player' : 'Monster',
        action: log.isDamage ? 'attack' : 'heal',
        value: parseInt(log.text.match(/\d+/)[0], 10)
      };
    });
  };

  // ----------------------------------------------------------------------------------------------------------
  // MAIN TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <>
      <Entity 
        title="Monster Health" 
        healthPercentage={monsterHealth} 
      />
      <Entity 
        title="Your Health" 
        healthPercentage={playerHealth} 
      />
      
      {isGameOver && (
        <GameOver 
          winner={winner} 
          onRestartGame={restartGameHandler} 
        />
      )}
      
      {!isGameOver && (
        <section id="controls">
          <button onClick={attackHandler}>ATTACK</button>
          <button onClick={specialAttackHandler}>SPECIAL!</button>
          <button onClick={healHandler}>HEAL</button>
          <button onClick={surrenderHandler}>KILL YOURSELF</button>
        </section>
      )}
      
      <Log battleLog={formatLogsForComponent()} />
    </>
  );
}

export default Game;