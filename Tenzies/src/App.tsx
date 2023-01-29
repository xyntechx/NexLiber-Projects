import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "./hooks/windowSize";

export default function App() {
  // features:
  // 1. real dots on the dice
  // 2. track number of rolls to window
  // 3. track time it took to win a game
  // 4. save your best time to localstorage
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    const allIsHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allIsHeld && allSameValue) {
      setTenzies(true);
      console.log("Dice changed");
    }
  }, [dice]);

  const mappedDice = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        id={die.id}
        hold={holdDice}
      />
    );
  });

  function genereateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const dieValueArray = [];
    for (let i = 0; i < 10; i++) {
      dieValueArray.push(genereateNewDie());
    }
    return dieValueArray;
  }

  function rollDice() {
    const newRollDice = dice.map((die) => {
      return die.isHeld ? die : genereateNewDie();
    });
    setDice(newRollDice);
  }

  function holdDice(id: string) {
    const holdedDie = dice.map((die) => {
      if (die.id === id) {
        return { ...die, isHeld: !die.isHeld };
      } else {
        return die;
      }
    });
    setDice(holdedDie);
  }

  function newGame() {
    return setTenzies(false), setDice(allNewDice());
  }

  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p className="instruction">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>
      <div className="die-container">{mappedDice}</div>
      <button onClick={tenzies ? newGame : rollDice} className="roll-btn">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
