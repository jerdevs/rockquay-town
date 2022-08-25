export interface Position {
  x: number;
  y: number;
}

export interface Sprite {
  position: Position;
  image: HTMLImageElement;
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
