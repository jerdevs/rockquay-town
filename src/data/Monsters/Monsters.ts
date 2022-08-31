import { Sprite } from "./../../App.interface";
import Emby from "../../images/Emby.png";
import Draggle from "../../images/Draggle.png";
import { AttackNames, attacks } from "../Attacks/Attacks";

export const emby = new Image();
emby.src = Emby;
export const draggle = new Image();
draggle.src = Draggle;

export enum MonsterNames {
  EMBY = "Emby",
  DRAGGLE = "Draggle",
}

export const monsters: { [monster: string]: Sprite } = {
  [MonsterNames.EMBY]: {
    position: {
      x: 280,
      y: 325,
    },
    image: emby,
    attacks: [attacks[AttackNames.TACKLE], attacks[AttackNames.FIREBALL]],
  },
  [MonsterNames.DRAGGLE]: {
    position: {
      x: 800,
      y: 100,
      opacity: 1,
    },
    image: draggle,
    attacks: [attacks[AttackNames.TACKLE], attacks[AttackNames.FIREBALL]],
    render: true,
  },
};
