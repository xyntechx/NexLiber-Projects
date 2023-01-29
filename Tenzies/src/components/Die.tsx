import React from "react";

type DiePropsType = {
  value: number;
  isHeld: boolean;
  id: string;
  hold: (id: string) => void;
};

export default function Die({ id, value, isHeld, hold }: DiePropsType) {
  return (
    <div
      onClick={() => hold(id)}
      className={`die-face ${isHeld ? "green" : "white"}`}
    >
      <p className="die-value">{value}</p>
    </div>
  );
}
