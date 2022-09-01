import React from "react";
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
import { AppContext } from "../../providers/StoreContext";
import { ActionTypes } from "../../store/reducers";
import {
  Boundary,
  CharFrame,
  GameMapProps,
  Movable,
} from "./GameMap.interface";
import {
  initialBackgroundSprite,
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
  const { state, dispatch } = React.useContext(AppContext);

  React.useEffect((): (() => void) => {
    const animation = requestAnimationFrame(animateGame);
    return (): void => {
      cancelAnimationFrame(animation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.backgroundSprite]);

  console.log(state);

  const animateGame = (): void => {
    !state.backgroundSprite &&
      dispatch({
        type: ActionTypes.UPDATE_BACKGROUND_SPRITE,
        payload: initialBackgroundSprite,
      });

    if (canvasRef.current) {
      canvasRef.current.focus();
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        // Draw background
        state.backgroundSprite &&
          drawImage(canvasContext, state.backgroundSprite);
        // Draw boundaries
        state.boundaries.forEach((bound: Boundary): void => {
          drawBoundary(canvasContext, bound);
        });
        // Draw battle zones
        state.battleZones.forEach((bound: Boundary): void => {
          drawBoundary(canvasContext, bound);
        });
        // Draw player
        drawChar(
          canvasContext,
          state.playerSprite,
          player,
          charFrame.frameIndex,
          MAX_CHAR_FRAMES
        );
        setCharFrame(getUpdatedCharFrame(charFrame, MAX_PLAYER_ELAPSED));
        // Draw foreground
        drawImage(canvasContext, state.foregroundSprite);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    const isWASD =
      e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d";
    if (canvasRef.current && !battleInitiated) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        if (isWASD && state.backgroundSprite) {
          const updatedMovables: Movable = getUpdatedMovables(
            state.backgroundSprite,
            state.boundaries,
            state.foregroundSprite,
            state.playerSprite,
            state.battleZones,
            e.key,
            (): void => {
              onBattleInitiated && onBattleInitiated();
            }
          );
          dispatch({
            type: ActionTypes.UPDATE_GAME_MAP_MOVABLES,
            payload: updatedMovables,
          });
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
