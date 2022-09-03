import { COLD_SPIKES_DAMAGE, GAS_BOMB_DAMAGE } from "./../../Constants";
import { TACKLE_DAMAGE, FIREBALL_DAMAGE } from "../../Constants";
import { Attack } from "./Attacks.interface";

export enum AttackNames {
  TACKLE = "Tackle",
  FIREBALL = "Fireball",
  GAS_BOMB = "Gas Bomb",
  COLD_SPIKES = "Cold Spikes",
}

export enum AttackTypes {
  NORMAL = "Normal",
  FIRE = "Fire",
  POISON = "Poison",
  ICE = "Ice",
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
  [AttackNames.GAS_BOMB]: {
    name: AttackNames.GAS_BOMB,
    damage: GAS_BOMB_DAMAGE,
    type: AttackTypes.POISON,
    bgColor: "bg-orange-300",
  },
  [AttackNames.COLD_SPIKES]: {
    name: AttackNames.COLD_SPIKES,
    damage: COLD_SPIKES_DAMAGE,
    type: AttackTypes.ICE,
    bgColor: "bg-sky-300",
  },
};
