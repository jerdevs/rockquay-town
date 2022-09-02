import { Position, Sprite } from "./../../App.interface";
// Player
import Emby from "../../assets/images/Monsters/Player/Emby.png";
import Olly from "../../assets/images/Monsters/Player/Olly.png";
import Rackworth from "../../assets/images/Monsters/Player/Rackworth.png";
import Rapston from "../../assets/images/Monsters/Player/Rapston.png";
import Slithy from "../../assets/images/Monsters/Player/Slithy.png";
import Trenk from "../../assets/images/Monsters/Player/Trenk.png";
import Blonsky from "../../assets/images/Monsters/Player/Blonsky.png";
import Dusty from "../../assets/images/Monsters/Player/Dusty.png";
import Lizzy from "../../assets/images/Monsters/Player/Lizzy.png";
import Molluc from "../../assets/images/Monsters/Player/Molluc.png";
import Musse from "../../assets/images/Monsters/Player/Musse.png";
import Slomp from "../../assets/images/Monsters/Player/Slomp.png";
import Tronk from "../../assets/images/Monsters/Player/Tronk.png";
import Welph from "../../assets/images/Monsters/Player/Welph.png";
import Wrecko from "../../assets/images/Monsters/Player/Wrecko.png";
import Zyro from "../../assets/images/Monsters/Player/Zyro.png";
import Zyry from "../../assets/images/Monsters/Player/Zyro.png";
// Enemy
import Draggle from "../../assets/images/Monsters/Enemy/Draggle.png";
import Flyko from "../../assets/images/Monsters/Enemy/Flyko.png";
import Okbus from "../../assets/images/Monsters/Enemy/Okbus.png";
import Snally from "../../assets/images/Monsters/Enemy/Snally.png";
import Yonsky from "../../assets/images/Monsters/Enemy/Yonsky.png";
import Draggly from "../../assets/images/Monsters/Enemy/Draggly.png";
import Blensky from "../../assets/images/Monsters/Enemy/Blensky.png";
import Emb from "../../assets/images/Monsters/Enemy/Emb.png";
import Eyo from "../../assets/images/Monsters/Enemy/Eyo.png";
import Flyke from "../../assets/images/Monsters/Enemy/Flyke.png";
import Hissy from "../../assets/images/Monsters/Enemy/Hissy.png";
import Memb from "../../assets/images/Monsters/Enemy/Memb.png";
import Moose from "../../assets/images/Monsters/Enemy/Moose.png";
import Moosy from "../../assets/images/Monsters/Enemy/Moosy.png";
import Quak from "../../assets/images/Monsters/Enemy/Quak.png";
import Walph from "../../assets/images/Monsters/Enemy/Walph.png";
import Okby from "../../assets/images/Monsters/Enemy/Okby.png";

import { AttackNames, attacks } from "../Attacks/Attacks";

// Player
export const emby = new Image();
emby.src = Emby;
export const olly = new Image();
olly.src = Olly;
export const rackworth = new Image();
rackworth.src = Rackworth;
export const rapston = new Image();
rapston.src = Rapston;
export const slithy = new Image();
slithy.src = Slithy;
export const trenk = new Image();
trenk.src = Trenk;
export const blonsky = new Image();
blonsky.src = Blonsky;
export const dusty = new Image();
dusty.src = Dusty;
export const lizzy = new Image();
lizzy.src = Lizzy;
export const molluc = new Image();
molluc.src = Molluc;
export const musse = new Image();
musse.src = Musse;
export const slomp = new Image();
slomp.src = Slomp;
export const tronk = new Image();
tronk.src = Tronk;
export const welph = new Image();
welph.src = Welph;
export const wrecko = new Image();
wrecko.src = Wrecko;
export const zyro = new Image();
zyro.src = Zyro;
export const zyry = new Image();
zyry.src = Zyry;
// Enemy
export const draggle = new Image();
draggle.src = Draggle;
export const flyko = new Image();
flyko.src = Flyko;
export const okbus = new Image();
okbus.src = Okbus;
export const snally = new Image();
snally.src = Snally;
export const yonsky = new Image();
yonsky.src = Yonsky;
export const draggly = new Image();
draggly.src = Draggly;
export const blensky = new Image();
blensky.src = Blensky;
export const emb = new Image();
emb.src = Emb;
export const eyo = new Image();
eyo.src = Eyo;
export const flyke = new Image();
flyke.src = Flyke;
export const hissy = new Image();
hissy.src = Hissy;
export const memb = new Image();
memb.src = Memb;
export const moose = new Image();
moose.src = Moose;
export const moosy = new Image();
moosy.src = Moosy;
export const quak = new Image();
quak.src = Quak;
export const okby = new Image();
okby.src = Okby;
export const walph = new Image();
walph.src = Walph;

export enum MonsterNames {
  DRAGGLE = "Draggle",
  FLYKO = "Flyko",
  OLLY = "Olly",
  RACKWORTH = "Rackworth",
  RAPSTON = "Rapston",
  TRENK = "Trenk",
  DRAGGLY = "Draggly",
  EMBY = "Emby",
  OKBUS = "Okbus",
  SLITHY = "Slithy",
  SNALLY = "Snally",
  YONSKY = "Yonsky",
  BLONSKY = "Blonsky",
  DUSTY = "Dusty",
  LIZZY = "Lizzy",
  MOLLUC = "Molluc",
  MUSSE = "Musse",
  SLOMP = "Slomp",
  TRONK = "Tronk",
  WELPH = "Welph",
  WRECKO = "Wrecko",
  ZYRO = "Zyro",
  ZYRY = "Zyry",
  BLENSKY = "Blensky",
  EMB = "Emb",
  EYO = "Eyo",
  FLYKE = "Flyke",
  HISSY = "Hissy",
  MEMB = "Memb",
  MOOSE = "Moose",
  MOOSY = "Moosy",
  QUAK = "Quak",
  OKBY = "Okby",
  WALPH = "Walph",
}

const enemyPosition: Position = {
  x: 800,
  y: 100,
  opacity: 1,
};

const playerPosition: Position = {
  x: 280,
  y: 325,
};

const getMonster = (image: HTMLImageElement, isEnemy = false): Sprite => {
  return {
    position: isEnemy ? enemyPosition : playerPosition,
    image: image,
    attacks: [attacks[AttackNames.TACKLE], attacks[AttackNames.FIREBALL]],
    render: true,
  };
};

export const players = [
  MonsterNames.EMBY,
  MonsterNames.SLITHY,
  MonsterNames.OLLY,
  MonsterNames.RACKWORTH,
  MonsterNames.RAPSTON,
  MonsterNames.TRENK,
  MonsterNames.BLONSKY,
  MonsterNames.DUSTY,
  MonsterNames.LIZZY,
  MonsterNames.MOLLUC,
  MonsterNames.MUSSE,
  MonsterNames.SLOMP,
  MonsterNames.TRONK,
  MonsterNames.WELPH,
  MonsterNames.WRECKO,
  MonsterNames.ZYRO,
  MonsterNames.ZYRY,
];
export const enemies = [
  MonsterNames.DRAGGLY,
  MonsterNames.DRAGGLE,
  MonsterNames.OKBUS,
  MonsterNames.FLYKO,
  MonsterNames.SNALLY,
  MonsterNames.YONSKY,
  MonsterNames.BLENSKY,
  MonsterNames.EMB,
  MonsterNames.EYO,
  MonsterNames.FLYKE,
  MonsterNames.HISSY,
  MonsterNames.MEMB,
  MonsterNames.MOOSE,
  MonsterNames.MOOSY,
  MonsterNames.QUAK,
  MonsterNames.OKBY,
  MonsterNames.WALPH,
];

export const playerMonsters: { [monster: string]: Sprite } = {
  [MonsterNames.EMBY]: getMonster(emby),
  [MonsterNames.SLITHY]: getMonster(slithy),
  [MonsterNames.OLLY]: getMonster(olly),
  [MonsterNames.RACKWORTH]: getMonster(rackworth),
  [MonsterNames.RAPSTON]: getMonster(rapston),
  [MonsterNames.TRENK]: getMonster(trenk),
  [MonsterNames.BLONSKY]: getMonster(blonsky),
  [MonsterNames.DUSTY]: getMonster(dusty),
  [MonsterNames.LIZZY]: getMonster(lizzy),
  [MonsterNames.MOLLUC]: getMonster(molluc),
  [MonsterNames.MUSSE]: getMonster(musse),
  [MonsterNames.SLOMP]: getMonster(slomp),
  [MonsterNames.TRONK]: getMonster(tronk),
  [MonsterNames.WELPH]: getMonster(welph),
  [MonsterNames.WRECKO]: getMonster(wrecko),
  [MonsterNames.ZYRO]: getMonster(zyro),
  [MonsterNames.ZYRY]: getMonster(zyry),
};

export const enemyMonsters: { [monster: string]: Sprite } = {
  [MonsterNames.DRAGGLY]: getMonster(draggly, true),
  [MonsterNames.DRAGGLE]: getMonster(draggle, true),
  [MonsterNames.OKBUS]: getMonster(okbus, true),
  [MonsterNames.FLYKO]: getMonster(flyko, true),
  [MonsterNames.SNALLY]: getMonster(snally, true),
  [MonsterNames.YONSKY]: getMonster(yonsky, true),
  [MonsterNames.BLENSKY]: getMonster(blensky, true),
  [MonsterNames.EMB]: getMonster(emb, true),
  [MonsterNames.EYO]: getMonster(eyo, true),
  [MonsterNames.FLYKE]: getMonster(flyke, true),
  [MonsterNames.HISSY]: getMonster(hissy, true),
  [MonsterNames.MEMB]: getMonster(memb, true),
  [MonsterNames.MOOSE]: getMonster(moose, true),
  [MonsterNames.MOOSY]: getMonster(moosy, true),
  [MonsterNames.QUAK]: getMonster(quak, true),
  [MonsterNames.OKBY]: getMonster(okby, true),
  [MonsterNames.WALPH]: getMonster(walph, true),
};
