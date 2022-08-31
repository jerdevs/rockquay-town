import { Attack } from "./data/Attacks/Attacks.interface";

export interface GameSequence {
  onGameMap?: boolean;
  battleInitiated?: boolean;
  onBattleMap?: boolean;
}

export interface Position {
  x: number;
  y: number;
  opacity?: number;
}

export interface Sprite {
  position: Position;
  image: HTMLImageElement;
  attacks?: Attack[];
  render?: boolean;
}
