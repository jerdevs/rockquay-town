import {
  CHAR_STEP_SIZE,
  MAP_OFFSET_X,
  MAP_OFFSET_Y,
  MAX_CHAR_FRAMES,
  MAX_MAP_ROWS,
  MAX_SYMBOL,
} from "../../Constants";
import { Boundary, Movable } from "./GameMap.interface";
import RockquayTown from "../../assets/images/RockquayTown.png";
import Foreground from "../../assets/images/Foreground.png";
import PlayerDown from "../../assets/images/PlayerDown.png";
import PlayerUp from "../../assets/images/PlayerUp.png";
import PlayerLeft from "../../assets/images/PlayerLeft.png";
import PlayerRight from "../../assets/images/PlayerRight.png";
import { collisions } from "../../data/Collisions/Collisions";
import { battleZones } from "../../data/BattleZones/BattleZones";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  Key,
  BOUNDARY_SIZE,
} from "../../Constants";
import { Position, Sprite } from "../../App.interface";

export const map = new Image();
map.src = RockquayTown;
export const player = new Image();
player.src = PlayerDown;
export const foreground = new Image();
foreground.src = Foreground;

export const offset: Position = {
  x: MAP_OFFSET_X,
  y: MAP_OFFSET_Y,
};

export const initialPlayerSprite: Sprite = {
  position: {
    x: CANVAS_WIDTH / 2 - 154,
    y: CANVAS_HEIGHT / 2,
  },
  image: player,
};

export const initialForegroundSprite: Sprite = {
  position: offset,
  image: foreground,
};

export const initialBackgroundSprite: Sprite = {
  position: offset,
  image: map,
};

export const getUpdatedMovables = (
  currentBackgroundSprite: Sprite,
  currentBoundaries: Boundary[],
  currentForegroundSprite: Sprite,
  currentPlayerSprite: Sprite,
  currentBattleZones: Boundary[],
  keyPressed: string,
  onBattleInitiated?: () => void
): Movable => {
  let moving = true;
  let movable: Movable = {
    backgroundSprite: currentBackgroundSprite,
    boundaries: currentBoundaries,
    foregroundSprite: currentForegroundSprite,
    playerSprite: currentPlayerSprite,
    battleZones: currentBattleZones,
  };
  for (let i = 0; i < currentBattleZones.length; i++) {
    const battleZone: Boundary = currentBattleZones[i];
    const overlappingWidth =
      Math.min(
        currentPlayerSprite.position.x +
          currentPlayerSprite.image.width / MAX_CHAR_FRAMES,
        battleZone.position.x + battleZone.width
      ) - Math.max(currentPlayerSprite.position.x, battleZone.position.x);
    const overlappingHeight =
      Math.min(
        currentPlayerSprite.position.y + currentPlayerSprite.image.height,
        battleZone.position.y + battleZone.height
      ) - Math.max(currentPlayerSprite.position.y, battleZone.position.y);
    const overlappingArea = overlappingWidth * overlappingHeight;
    if (
      isCollided(currentPlayerSprite, battleZone) &&
      overlappingArea >
        ((currentPlayerSprite.image.width / MAX_CHAR_FRAMES) *
          currentPlayerSprite.image.height) /
          2 &&
      Math.random() < 0.03
    ) {
      onBattleInitiated && onBattleInitiated();
      break;
    }
  }
  switch (keyPressed) {
    case Key.W:
      player.src = PlayerUp;
      for (let i = 0; i < currentBoundaries.length; i++) {
        const bound: Boundary = currentBoundaries[i];
        if (
          isCollided(currentPlayerSprite, {
            ...bound,
            position: {
              ...bound.position,
              y: bound.position.y + CHAR_STEP_SIZE,
            },
          })
        ) {
          moving = false;
          break;
        }
      }
      if (moving) {
        movable = {
          backgroundSprite: {
            ...currentBackgroundSprite,
            position: {
              ...currentBackgroundSprite.position,
              y: currentBackgroundSprite.position.y + CHAR_STEP_SIZE,
            },
          },
          boundaries: currentBoundaries.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                y: boundary.position.y + CHAR_STEP_SIZE,
              },
            };
          }),
          foregroundSprite: {
            ...currentForegroundSprite,
            position: {
              ...currentForegroundSprite.position,
              y: currentForegroundSprite.position.y + CHAR_STEP_SIZE,
            },
          },
          playerSprite: {
            ...currentPlayerSprite,
            image: player,
          },
          battleZones: currentBattleZones.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                y: boundary.position.y + CHAR_STEP_SIZE,
              },
            };
          }),
        };
      }
      break;
    case Key.A:
      player.src = PlayerLeft;
      for (let i = 0; i < currentBoundaries.length; i++) {
        const bound: Boundary = currentBoundaries[i];
        if (
          isCollided(currentPlayerSprite, {
            ...bound,
            position: {
              ...bound.position,
              x: bound.position.x + CHAR_STEP_SIZE,
            },
          })
        ) {
          moving = false;
          break;
        }
      }
      if (moving) {
        movable = {
          backgroundSprite: {
            ...currentBackgroundSprite,
            position: {
              ...currentBackgroundSprite.position,
              x: currentBackgroundSprite.position.x + CHAR_STEP_SIZE,
            },
          },
          boundaries: currentBoundaries.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                x: boundary.position.x + CHAR_STEP_SIZE,
              },
            };
          }),
          foregroundSprite: {
            ...currentForegroundSprite,
            position: {
              ...currentForegroundSprite.position,
              x: currentForegroundSprite.position.x + CHAR_STEP_SIZE,
            },
          },
          playerSprite: {
            ...currentPlayerSprite,
            image: player,
          },
          battleZones: currentBattleZones.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                x: boundary.position.x + CHAR_STEP_SIZE,
              },
            };
          }),
        };
      }
      break;
    case Key.S:
      player.src = PlayerDown;
      for (let i = 0; i < currentBoundaries.length; i++) {
        const bound: Boundary = currentBoundaries[i];
        if (
          isCollided(currentPlayerSprite, {
            ...bound,
            position: {
              ...bound.position,
              y: bound.position.y - CHAR_STEP_SIZE,
            },
          })
        ) {
          moving = false;
          break;
        }
      }
      if (moving) {
        movable = {
          backgroundSprite: {
            ...currentBackgroundSprite,
            position: {
              ...currentBackgroundSprite.position,
              y: currentBackgroundSprite.position.y - CHAR_STEP_SIZE,
            },
          },
          boundaries: currentBoundaries.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                y: boundary.position.y - CHAR_STEP_SIZE,
              },
            };
          }),
          foregroundSprite: {
            ...currentForegroundSprite,
            position: {
              ...currentForegroundSprite.position,
              y: currentForegroundSprite.position.y - CHAR_STEP_SIZE,
            },
          },
          playerSprite: {
            ...currentPlayerSprite,
            image: player,
          },
          battleZones: currentBattleZones.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                y: boundary.position.y - CHAR_STEP_SIZE,
              },
            };
          }),
        };
      }
      break;
    case Key.D:
      player.src = PlayerRight;
      for (let i = 0; i < currentBoundaries.length; i++) {
        const bound: Boundary = currentBoundaries[i];
        if (
          isCollided(currentPlayerSprite, {
            ...bound,
            position: {
              ...bound.position,
              x: bound.position.x - CHAR_STEP_SIZE,
            },
          })
        ) {
          moving = false;
          break;
        }
      }
      if (moving) {
        movable = {
          backgroundSprite: {
            ...currentBackgroundSprite,
            position: {
              ...currentBackgroundSprite.position,
              x: currentBackgroundSprite.position.x - CHAR_STEP_SIZE,
            },
          },
          boundaries: currentBoundaries.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                x: boundary.position.x - CHAR_STEP_SIZE,
              },
            };
          }),
          foregroundSprite: {
            ...currentForegroundSprite,
            position: {
              ...currentForegroundSprite.position,
              x: currentForegroundSprite.position.x - CHAR_STEP_SIZE,
            },
          },
          playerSprite: {
            ...currentPlayerSprite,
            image: player,
          },
          battleZones: currentBattleZones.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                x: boundary.position.x - CHAR_STEP_SIZE,
              },
            };
          }),
        };
      }
      break;
  }
  return movable;
};

const getCollisions = (collisions: number[]): Boundary[] => {
  const collisionsMap: number[][] = [];
  const boundaries: Boundary[] = [];

  for (let i = 0; i < collisions.length; i += MAX_MAP_ROWS) {
    collisionsMap.push(collisions.slice(i, i + MAX_MAP_ROWS));
  }
  collisionsMap.forEach((row: number[], i: number) => {
    row.forEach((symbol: number, j: number) => {
      if (symbol === MAX_SYMBOL) {
        boundaries.push({
          position: {
            x: j * BOUNDARY_SIZE + offset.x,
            y: i * BOUNDARY_SIZE + offset.y,
          },
          width: BOUNDARY_SIZE,
          height: BOUNDARY_SIZE,
        });
      }
    });
  });
  return boundaries;
};

export const getBoundaries = (): Boundary[] => {
  return getCollisions(collisions);
};

export const getBattleZones = (): Boundary[] => {
  return getCollisions(battleZones);
};

export const drawBoundary = (
  canvasContext: CanvasRenderingContext2D,
  boundary: Boundary
): void => {
  canvasContext.fillStyle = "rgba(255, 0, 0, 0)";
  canvasContext.fillRect(
    boundary.position.x,
    boundary.position.y,
    boundary.width,
    boundary.height
  );
};

export const isCollided = (rect1: Sprite, rect2: Boundary): boolean => {
  return (
    rect1.position.x + rect1.image.width / MAX_CHAR_FRAMES >=
      rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.width &&
    rect1.position.y <= rect2.position.y + rect2.height &&
    rect1.position.y + rect1.image.height >= rect2.position.y
  );
};
