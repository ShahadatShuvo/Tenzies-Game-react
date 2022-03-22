import React from "react";

function Die(props) {
  return (
    <div
      className="box"
      style={{ backgroundColor: props.isHeld ? "#59e391" : "white" }}
      onClick={() => props.onDiceClick(props.id)}
    >
      {props.value}
    </div>
  );
}

export default Die;
