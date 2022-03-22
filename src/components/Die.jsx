import React from "react";

function Die(props) {
  return (
    <div
      className={props.isHeld ? "box isHeld" : "box"}
      onClick={() => props.onDiceClick(props.id)}
    >
      {props.value}
    </div>
  );
}

export default Die;
