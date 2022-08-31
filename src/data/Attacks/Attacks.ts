import { TACKLE_DAMAGE, FIREBALL_DAMAGE } from "../../Constants";
import { Attack } from "./Attacks.interface";

export enum AttackNames {
  TACKLE = "Tackle",
  FIREBALL = "Fireball",
}

export enum AttackTypes {
  NORMAL = "Normal",
  FIRE = "Fire",
}

export const attacks: { [attack: string]: Attack } = {
  [AttackNames.TACKLE]: {
    name: AttackNames.TACKLE,
    damage: TACKLE_DAMAGE,
    type: AttackTypes.NORMAL,
    bgColor: "bg-purple-300",
  },
  [AttackNames.FIREBALL]: {
    name: AttackNames.FIREBALL,
    damage: FIREBALL_DAMAGE,
    type: AttackTypes.FIRE,
    bgColor: "bg-red-300",
  },
};
