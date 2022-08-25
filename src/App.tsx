import React from "react";
import "./App.css";
import { Sprite, Boundary, CharFrame } from "./App.interface";
import {
  drawBoundary,
  getUpdatedMovables,
  drawPlayer,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  getBoundaries,
  initialPlayerSprite,
  drawImage,
  initialBackgroundSprite,
  initialForegroundSprite,
  initialCharFrame,
  getUpdatedCharFrame,
  getBattleZones,
} from "./App.utils";

const App: React.FC = (): React.ReactElement => {
  const canvasRef: React.RefObject<HTMLCanvasElement> =
    React.useRef<HTMLCanvasElement>(null);
  const [backgroundSprite, setBackgroundSprite] = React.useState<Sprite>(
    initialBackgroundSprite
  );
  const [boundaries, setBoundaries] = React.useState<Boundary[]>(
    getBoundaries()
  );
  const [foregroundSprite, setForegroundSprite] = React.useState<Sprite>(
    initialForegroundSprite
  );
  const [charFrame, setCharFrame] = React.useState<CharFrame>(initialCharFrame);
  const [playerSprite, setPlayerSprite] =
    React.useState<Sprite>(initialPlayerSprite);
  const [battleZones, setBattleZones] = React.useState<Boundary[]>(
    getBattleZones()
  );

  React.useEffect((): void => {
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundSprite]);

  const animate = (): void => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        // Draw background
        drawImage(canvasContext, backgroundSprite);
        // Draw boundaries
        boundaries.forEach((bound: Boundary): void => {
          drawBoundary(canvasContext, bound);
        });
        // Draw battle zones
        battleZones.forEach((bound: Boundary): void => {
          drawBoundary(canvasContext, bound);
        });
        // Draw player
        drawPlayer(canvasContext, playerSprite, charFrame.frameIndex, 4);
        setCharFrame(getUpdatedCharFrame(charFrame));
        // Draw foreground
        drawImage(canvasContext, foregroundSprite);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    const isWASD =
      e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d";
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        if (isWASD) {
          const updatedMovables = getUpdatedMovables(
            backgroundSprite,
            boundaries,
            foregroundSprite,
            playerSprite,
            battleZones,
            e.key
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
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      ref={canvasRef}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    />
  );
};

export default App;
