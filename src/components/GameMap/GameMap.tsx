import React from "react";
import { Sprite } from "../../App.interface";
import {
  drawChar,
  drawImage,
  getUpdatedCharFrame,
  initialCharFrame,
} from "../../App.utils";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  MAX_PLAYER_ELAPSED,
  MAX_CHAR_FRAMES,
} from "../../Constants";
import { Boundary, CharFrame, GameMapProps } from "./GameMap.interface";
import {
  initialBackgroundSprite,
  getBoundaries,
  initialForegroundSprite,
  initialPlayerSprite,
  getBattleZones,
  drawBoundary,
  getUpdatedMovables,
  player,
} from "./GameMap.utils";

const GameMap: React.FC<GameMapProps> = (
  props: GameMapProps
): React.ReactElement => {
  const { battleInitiated, onBattleInitiated } = props;
  const canvasRef: React.RefObject<HTMLCanvasElement> =
    React.useRef<HTMLCanvasElement>(null);
  const [charFrame, setCharFrame] = React.useState<CharFrame>(initialCharFrame);
  // Need to store below in store
  const [backgroundSprite, setBackgroundSprite] = React.useState<Sprite | null>(
    null
  );
  const [boundaries, setBoundaries] = React.useState<Boundary[]>(
    getBoundaries()
  );
  const [foregroundSprite, setForegroundSprite] = React.useState<Sprite>(
    initialForegroundSprite
  );
  const [playerSprite, setPlayerSprite] =
    React.useState<Sprite>(initialPlayerSprite);
  const [battleZones, setBattleZones] = React.useState<Boundary[]>(
    getBattleZones()
  );

  React.useEffect((): (() => void) => {
    const animation = requestAnimationFrame(animateGame);
    return (): void => {
      cancelAnimationFrame(animation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundSprite]);

  const animateGame = (): void => {
    !backgroundSprite && setBackgroundSprite(initialBackgroundSprite);
    if (canvasRef.current) {
      canvasRef.current.focus();
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        // Draw background
        backgroundSprite && drawImage(canvasContext, backgroundSprite);
        // Draw boundaries
        boundaries.forEach((bound: Boundary): void => {
          drawBoundary(canvasContext, bound);
        });
        // Draw battle zones
        battleZones.forEach((bound: Boundary): void => {
          drawBoundary(canvasContext, bound);
        });
        // Draw player
        drawChar(
          canvasContext,
          playerSprite,
          player,
          charFrame.frameIndex,
          MAX_CHAR_FRAMES
        );
        setCharFrame(getUpdatedCharFrame(charFrame, MAX_PLAYER_ELAPSED));
        // Draw foreground
        drawImage(canvasContext, foregroundSprite);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    const isWASD =
      e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d";
    if (canvasRef.current && !battleInitiated) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        if (isWASD && backgroundSprite) {
          const updatedMovables = getUpdatedMovables(
            backgroundSprite,
            boundaries,
            foregroundSprite,
            playerSprite,
            battleZones,
            e.key,
            (): void => {
              onBattleInitiated && onBattleInitiated();
            }
          );
          setBackgroundSprite(updatedMovables.backgroundSprite);
          setBoundaries(updatedMovables.boundaries);
          setForegroundSprite(updatedMovables.foregroundSprite);
          setPlayerSprite(updatedMovables.playerSprite);
          setBattleZones(updatedMovables.battleZones);
        }
      }
    }
  };

  return (
    <canvas
      className="outline-0"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      ref={canvasRef}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    />
  );
};

export default GameMap;
