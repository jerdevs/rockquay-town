import React from "react";
import { ATTACK_TYPE } from "../../Constants";
import { Attack } from "../../data/Attacks/Attacks.interface";

interface AttackBarProps {
  attacks: Attack[];
  onAttack?: (attack: Attack) => void;
}

const AttackBar: React.FC<AttackBarProps> = (
  props: AttackBarProps
): React.ReactElement => {
  const { attacks, onAttack } = props;
  const [attackType, setAttackType] = React.useState(ATTACK_TYPE);
  const [attackBgColor, setAttackBgColor] = React.useState("");

  const getAttacks = (): React.ReactElement => {
    return (
      <>
        {attacks.map((attack: Attack, index: number): React.ReactElement => {
          return (
            <button
              key={index}
              className="hover:bg-slate-200 border-r-4 border-t-4 border-solid border-black"
              onClick={(): void => onAttack && onAttack(attack)}
              onMouseEnter={(): void => {
                setAttackType(attack.type);
                setAttackBgColor(attack.bgColor);
              }}
              onMouseLeave={(): void => {
                setAttackType(ATTACK_TYPE);
                setAttackBgColor("");
              }}
            >
              {attack.name}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div className="flex h-36 bottom-0 left-0 right-0 absolute bg-white">
      <div className="w-2/3 grid grid-cols-2 border-solid border-black border-l-4 border-b-4">
        {getAttacks()}
      </div>
      <div
        className={`w-1/3 flex items-center justify-center border-r-4 border-y-4 border-solid border-black ${attackBgColor}`}
      >
        {attackType}
      </div>
    </div>
  );
};

export default AttackBar;
