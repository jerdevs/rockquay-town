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
  isValidKeyPress,
} from "./GameMap.utils";
import MapAudio from "../../assets/audio/Map.wav";
import InitBattleAudio from "../../assets/audio/InitBattle.wav";
import WalkingAudio from "../../assets/audio/Walking.wav";

const GameMap: React.FC<GameMapProps> = (
  props: GameMapProps
): React.ReactElement => {
  const { battleInitiated = false, onBattleInitiated } = props;
  const canvasRef: React.RefObject<HTMLCanvasElement> =
    React.useRef<HTMLCanvasElement>(null);
  const [charFrame, setCharFrame] = React.useState<CharFrame>(initialCharFrame);
  const { state, dispatch } = React.useContext(AppContext);
  const [isWalking, setIsWalking] = React.useState(false);

  React.useEffect((): (() => void) => {
    const animation = requestAnimationFrame(animateGame);
    return (): void => {
      cancelAnimationFrame(animation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.backgroundSprite]);

  React.useEffect((): void => {
    // Initial map rendering
    if (canvasRef.current) {
      canvasRef.current.focus();
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        state.backgroundSprite.image.onload = (): void =>
          getGameMapContents(canvasContext);
      }
    }
  }, []);

  const getGameMapContents = (
    canvasContext: CanvasRenderingContext2D
  ): void => {
    // Draw background
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
  };

  const animateGame = (): void => {
    if (canvasRef.current) {
      canvasRef.current.focus();
      const canvasContext = canvasRef.current.getContext("2d");
      canvasContext && getGameMapContents(canvasContext);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    e.preventDefault();
    if (canvasRef.current && !battleInitiated) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext) {
        if (isValidKeyPress(e.key) && state.backgroundSprite) {
          setIsWalking(true);
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
    <>
      <audio
        src={battleInitiated ? InitBattleAudio : MapAudio}
        autoPlay
        loop={!battleInitiated}
      />
      {isWalking && <audio src={WalkingAudio} autoPlay />}
      <canvas
        className="outline-0"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={canvasRef}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        onKeyUp={(): void => setIsWalking(false)}
      />
    </>
  );
};

export default GameMap;
