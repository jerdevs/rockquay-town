import { Position, Sprite } from "../../App.interface";

export interface GameMapProps {
  battleInitiated?: boolean;
  onBattleInitiated?: () => void;
}

export interface Boundary {
  position: Position;
  width: number;
  height: number;
}

export interface Movable {
  backgroundSprite: Sprite;
  boundaries: Boundary[];
  foregroundSprite: Sprite;
  playerSprite: Sprite;
  battleZones: Boundary[];
}

export interface CharFrame {
  frameIndex: number;
  elapsed: number;
}
