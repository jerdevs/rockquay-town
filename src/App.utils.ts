import {
  Boundary,
  CharFrame,
  Movable,
  Position,
  Sprite,
} from "./App.interface";
import RockquayTown from "./images/RockquayTown.png";
import Foreground from "./images/Foreground.png";
import PlayerDown from "./images/PlayerDown.png";
import PlayerUp from "./images/PlayerUp.png";
import PlayerLeft from "./images/PlayerLeft.png";
import PlayerRight from "./images/PlayerRight.png";
import { collisions } from "./data/Collisions";
import { battleZones } from "./data/BattleZones";

export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 576;
export const BOUNDARY_SIZE = 48;
export const MAX_ELAPSED = 8;
export const map = new Image();
map.src = RockquayTown;
export const playerImage = new Image();
playerImage.src = PlayerDown;
export const foreground = new Image();
foreground.src = Foreground;

export const offset: Position = {
  x: -50,
  y: -1200,
};

export const initialPlayerSprite: Sprite = {
  position: {
    x: CANVAS_WIDTH / 2 - 154,
    y: CANVAS_HEIGHT / 2,
  },
  image: playerImage,
};

export const initialForegroundSprite: Sprite = {
  position: offset,
  image: foreground,
};

export const initialBackgroundSprite: Sprite = {
  position: offset,
  image: map,
};

export const initialCharFrame: CharFrame = {
  frameIndex: 0,
  elapsed: 1,
};

export const getUpdatedMovables = (
  currentBackgroundSprite: Sprite,
  currentBoundaries: Boundary[],
  currentForegroundSprite: Sprite,
  currentPlayerSprite: Sprite,
  currentBattleZones: Boundary[],
  keyPressed: string
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
        currentPlayerSprite.position.x + currentPlayerSprite.image.width / 4,
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
        ((currentPlayerSprite.image.width / 4) *
          currentPlayerSprite.image.height) /
          2 &&
      Math.random() < 0.01
    ) {
      console.log("battle zone collision");
      break;
    }
  }
  switch (keyPressed) {
    case "w":
      playerImage.src = PlayerUp;
      for (let i = 0; i < currentBoundaries.length; i++) {
        const bound: Boundary = currentBoundaries[i];
        if (
          isCollided(currentPlayerSprite, {
            ...bound,
            position: {
              ...bound.position,
              y: bound.position.y + 3,
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
              y: currentBackgroundSprite.position.y + 3,
            },
          },
          boundaries: currentBoundaries.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                y: boundary.position.y + 3,
              },
            };
          }),
          foregroundSprite: {
            ...currentForegroundSprite,
            position: {
              ...currentForegroundSprite.position,
              y: currentForegroundSprite.position.y + 3,
            },
          },
          playerSprite: {
            ...currentPlayerSprite,
            image: playerImage,
          },
          battleZones: currentBattleZones.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                y: boundary.position.y + 3,
              },
            };
          }),
        };
      }
      break;
    case "a":
      playerImage.src = PlayerLeft;
      for (let i = 0; i < currentBoundaries.length; i++) {
        const bound: Boundary = currentBoundaries[i];
        if (
          isCollided(currentPlayerSprite, {
            ...bound,
            position: {
              ...bound.position,
              x: bound.position.x + 3,
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
              x: currentBackgroundSprite.position.x + 3,
            },
          },
          boundaries: currentBoundaries.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                x: boundary.position.x + 3,
              },
            };
          }),
          foregroundSprite: {
            ...currentForegroundSprite,
            position: {
              ...currentForegroundSprite.position,
              x: currentForegroundSprite.position.x + 3,
            },
          },
          playerSprite: {
            ...currentPlayerSprite,
            image: playerImage,
          },
          battleZones: currentBattleZones.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                x: boundary.position.x + 3,
              },
            };
          }),
        };
      }
      break;
    case "s":
      playerImage.src = PlayerDown;
      for (let i = 0; i < currentBoundaries.length; i++) {
        const bound: Boundary = currentBoundaries[i];
        if (
          isCollided(currentPlayerSprite, {
            ...bound,
            position: {
              ...bound.position,
              y: bound.position.y - 3,
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
              y: currentBackgroundSprite.position.y - 3,
            },
          },
          boundaries: currentBoundaries.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                y: boundary.position.y - 3,
              },
            };
          }),
          foregroundSprite: {
            ...currentForegroundSprite,
            position: {
              ...currentForegroundSprite.position,
              y: currentForegroundSprite.position.y - 3,
            },
          },
          playerSprite: {
            ...currentPlayerSprite,
            image: playerImage,
          },
          battleZones: currentBattleZones.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                y: boundary.position.y - 3,
              },
            };
          }),
        };
      }
      break;
    case "d":
      playerImage.src = PlayerRight;
      for (let i = 0; i < currentBoundaries.length; i++) {
        const bound: Boundary = currentBoundaries[i];
        if (
          isCollided(currentPlayerSprite, {
            ...bound,
            position: {
              ...bound.position,
              x: bound.position.x - 3,
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
              x: currentBackgroundSprite.position.x - 3,
            },
          },
          boundaries: currentBoundaries.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                x: boundary.position.x - 3,
              },
            };
          }),
          foregroundSprite: {
            ...currentForegroundSprite,
            position: {
              ...currentForegroundSprite.position,
              x: currentForegroundSprite.position.x - 3,
            },
          },
          playerSprite: {
            ...currentPlayerSprite,
            image: playerImage,
          },
          battleZones: currentBattleZones.map((boundary: Boundary): any => {
            return {
              ...boundary,
              position: {
                ...boundary.position,
                x: boundary.position.x - 3,
              },
            };
          }),
        };
      }
      break;
  }
  return movable;
};

export const getBoundaries = (): Boundary[] => {
  const collisionsMap: number[][] = [];
  const boundaries: Boundary[] = [];

  for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70));
  }
  collisionsMap.forEach((row: number[], i: number) => {
    row.forEach((symbol: number, j: number) => {
      if (symbol === 1025) {
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

export const getBattleZones = (): Boundary[] => {
  const battleZonesMap: number[][] = [];
  const boundaries: Boundary[] = [];

  for (let i = 0; i < battleZones.length; i += 70) {
    battleZonesMap.push(battleZones.slice(i, i + 70));
  }
  battleZonesMap.forEach((row: number[], i: number) => {
    row.forEach((symbol: number, j: number) => {
      if (symbol === 1025) {
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

export const drawImage = (
  canvasContext: CanvasRenderingContext2D,
  sprite: Sprite
): void => {
  canvasContext.drawImage(sprite.image, sprite.position.x, sprite.position.y);
};

export const drawBoundary = (
  canvasContext: CanvasRenderingContext2D,
  boundary: Boundary
): void => {
  canvasContext.fillStyle = "rgba(255, 0, 0, 0.5)";
  canvasContext.fillRect(
    boundary.position.x,
    boundary.position.y,
    boundary.width,
    boundary.height
  );
};

export const drawPlayer = (
  canvasContext: CanvasRenderingContext2D,
  currentPlayerSprite: Sprite,
  charFrame: number,
  frames = 1
): void => {
  canvasContext.drawImage(
    currentPlayerSprite.image,
    (playerImage.width / frames) * charFrame,
    0,
    playerImage.width / frames,
    playerImage.height,
    currentPlayerSprite.position.x,
    currentPlayerSprite.position.y,
    playerImage.width / frames,
    playerImage.height
  );
};

export const isCollided = (rect1: Sprite, rect2: Boundary): boolean => {
  return (
    rect1.position.x + rect1.image.width / 4 >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.width &&
    rect1.position.y <= rect2.position.y + rect2.height &&
    rect1.position.y + rect1.image.height >= rect2.position.y
  );
};

export const getUpdatedCharFrame = (currentCharFrame: CharFrame): CharFrame => {
  return {
    frameIndex:
      currentCharFrame.frameIndex === 3
        ? 0
        : currentCharFrame.elapsed === MAX_ELAPSED
        ? currentCharFrame.frameIndex + 1
        : currentCharFrame.frameIndex,
    elapsed:
      currentCharFrame.elapsed === MAX_ELAPSED
        ? 1
        : currentCharFrame.elapsed + 1,
  };
};
