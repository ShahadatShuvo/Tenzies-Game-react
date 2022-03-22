import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import Die from "./components/Die";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  console.log(dice);

  const [tenzies, setTenzies] = React.useState(false);

  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    let temp = 0;
    for (let i = 0; i < 10; i++) {
      if (dice[i].isHeld === true) {
        temp = 1;
      } else {
        temp = 0;
        break;
      }
    }
    if (temp === 1) {
      setPlay(true);
      let flag = dice[1].value;
      let count = 0;
      dice.map((diceObj) => {
        if (diceObj.value === flag) {
          count++;
        }
        return 0;
      });
      console.log("matched " + count);
      if (count === 10) {
        setTenzies(true);
      }
    }
  }, [dice]);

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      let randomNumber = Math.floor(Math.random() * 6) + 1;
      let diceElement = {
        id: nanoid(),
        value: randomNumber,
        isHeld: false,
      };
      newDice.push(diceElement);
    }
    return newDice;
  }

  function onRollDice() {
    if (play === true) {
      setDice(allNewDice());
      setPlay(false);
      setTenzies(false);
    } else {
      setPlay(false);
      setTenzies(false);
      setDice((prevState) => {
        return prevState.map((dice) => {
          if (dice.isHeld === false) {
            let randomNumber = Math.floor(Math.random() * 6) + 1;
            let diceElement = {
              id: nanoid(),
              value: randomNumber,
              isHeld: false,
            };
            return diceElement;
          }
          return dice;
        });
      });
    }
  }

  function onHandleClick(id) {
    setDice((prevState) => {
      return prevState.map((dice) => {
        if (dice.id === id) {
          return {
            ...dice,
            isHeld: !dice.isHeld,
          };
        }
        return dice;
      });
    });
  }
  const diceElements = dice.map((elenment) => (
    <Die key={elenment.id} {...elenment} onDiceClick={onHandleClick} />
  ));

  return (
    <div className="wrapper">
      {tenzies && <Confetti />}
      <div className="body--section">
        <div className="text-center px-3">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="parent">{diceElements}</div>
        {tenzies && (
          <div className="mt-3 mx-3">
            <h2>Congrats! you Won!</h2>
          </div>
        )}
        <div className="my-3">
          <button className="rollBtn" onClick={onRollDice}>
            {play === true ? "New Match" : "Roll"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
