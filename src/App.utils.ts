import { enemies, players } from "./data/Monsters/Monsters";
import { GameSequence, Sprite } from "./App.interface";
import { CharFrame } from "./components/GameMap/GameMap.interface";
import { MAX_CHAR_FRAMES } from "./Constants";

export const initialGameSequence: GameSequence = {
  onGameMap: false,
  battleInitiated: false,
  onBattleMap: true,
};

export const resetGameSequence: GameSequence = {
  onGameMap: false,
  battleInitiated: false,
  onBattleMap: false,
};

export const initialCharFrame: CharFrame = {
  frameIndex: 0,
  elapsed: 1,
};

export const drawImage = (
  canvasContext: CanvasRenderingContext2D,
  sprite: Sprite
): void => {
  canvasContext.drawImage(sprite.image, sprite.position.x, sprite.position.y);
};

export const drawChar = (
  canvasContext: CanvasRenderingContext2D,
  currentCharSprite: Sprite,
  charImage: HTMLImageElement,
  charFrame: number,
  frames = 1
): void => {
  canvasContext.drawImage(
    currentCharSprite.image,
    (charImage.width / frames) * charFrame,
    0,
    charImage.width / frames,
    charImage.height,
    currentCharSprite.position.x,
    currentCharSprite.position.y,
    charImage.width / frames,
    charImage.height
  );
};

export const getUpdatedCharFrame = (
  currentCharFrame: CharFrame,
  maxElapsed: number
): CharFrame => {
  return {
    frameIndex:
      currentCharFrame.frameIndex === MAX_CHAR_FRAMES - 1 &&
      currentCharFrame.elapsed === maxElapsed
        ? 0
        : currentCharFrame.elapsed === maxElapsed
        ? currentCharFrame.frameIndex + 1
        : currentCharFrame.frameIndex,
    elapsed:
      currentCharFrame.elapsed === maxElapsed
        ? 1
        : currentCharFrame.elapsed + 1,
  };
};

export const getRandomMonster = (isEnemy = false): string => {
  const monsters = isEnemy ? enemies : players;
  const randomIndex = Math.floor(Math.random() * monsters.length);
  return monsters[randomIndex];
};
