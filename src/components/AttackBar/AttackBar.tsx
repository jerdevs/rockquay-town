import React from "react";
import { Attack } from "../BattleMap/BattleMap.interface";

interface AttackBarProps {
  attackType: string;
  attacks: Attack[];
  onAttack?: (attack: Attack) => void;
}

const AttackBar: React.FC<AttackBarProps> = (
  props: AttackBarProps
): React.ReactElement => {
  const { attackType, attacks, onAttack } = props;

  const getAttacks = (): React.ReactElement => {
    return (
      <>
        {attacks.map((attack: Attack, index: number): React.ReactElement => {
          return (
            <button
              key={index}
              className="hover:bg-slate-200"
              onClick={(): void => onAttack && onAttack(attack)}
            >
              {attack.name}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div className="flex h-36 bottom-0 left-0 right-0 absolute bg-white border-t-4 border-solid border-black">
      <div className="w-2/3 grid grid-cols-2">{getAttacks()}</div>
      <div className="w-1/3 flex items-center justify-center border-l-4 border-solid border-black">
        {attackType}
      </div>
    </div>
  );
};

export default AttackBar;
