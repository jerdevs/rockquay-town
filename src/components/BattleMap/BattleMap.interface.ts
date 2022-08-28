export enum AttackNames {
  TACKLE = "Tackle",
  FIREBALL = "Fireball",
}

export enum AttackTypes {
  NORMAL = "Normal",
  FIRE = "Fire",
}

export interface Attack {
  name: string;
  damage: number;
  type: string;
}
