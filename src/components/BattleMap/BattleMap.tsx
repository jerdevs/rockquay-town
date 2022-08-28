import React from "react";
import { Sprite } from "../../App.interface";
import {
  drawChar,
  drawImage,
  getUpdatedCharFrame,
  initialCharFrame,
} from "../../App.utils";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAX_CHAR_FRAMES,
  MAX_MONSTER_ELAPSED,
} from "../../Constants";
import AttackBar from "../AttackBar/AttackBar";
import { CharFrame } from "../GameMap/GameMap.interface";
import HealthBar from "../HealthBar/HealthBar";
import { Attack, AttackNames } from "./BattleMap.interface";
import {
  draggle,
  emby,
  initialDraggleSprite,
  initialEmbySprite,
  initialBackgroundSprite,
  attacks,
  initialFireballSprite,
  tackleEnemy,
  throwFireball,
  fireball,
} from "./BattleMap.utils";

const BattleMap: React.FC = (): React.ReactElement => {
  const canvasRef: React.RefObject<HTMLCanvasElement> =
    React.useRef<HTMLCanvasElement>(null);
  const draggleSpriteRef: React.RefObject<Sprite> =
    React.useRef<Sprite>(initialDraggleSprite);
  const embySpriteRef: React.RefObject<Sprite> =
    React.useRef<Sprite>(initialEmbySprite);
  const [charFrame, setCharFrame] = React.useState<CharFrame>(initialCharFrame);
  const [draggleHealthBar, setDraggleHealthBar] = React.useState<number>(100);
  const [embyHealthBar, setEmbyHealthBar] = React.useState<number>(100);
  const [drawFireball, setDrawFireball] = React.useState(false);
  const [attackComplete, setAttackComplete] = React.useState(false);
  const fireballSpriteRef: React.RefObject<Sprite> = React.useRef<Sprite>(
    initialFireballSprite
  );

  React.useEffect((): (() => void) => {
    const animation = requestAnimationFrame(animateBattle);
    return (): void => {
      cancelAnimationFrame(animation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charFrame]);

  React.useEffect((): void => {
    if (attackComplete && draggleSpriteRef.current && draggleHealthBar === 0) {
      draggleSpriteRef.current.render = false;
    }
  }, [draggleHealthBar, attackComplete]);

  const animateBattle = (): void => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext && embySpriteRef.current && draggleSpriteRef.current) {
        // Draw background
        drawImage(canvasContext, initialBackgroundSprite);
        // Draw draggle
        canvasContext.save();
        if (draggleSpriteRef.current.position.opacity) {
          canvasContext.globalAlpha = draggleSpriteRef.current.position.opacity;
        }
        draggleSpriteRef.current.render &&
          drawChar(
            canvasContext,
            draggleSpriteRef.current,
            draggle,
            charFrame.frameIndex,
            MAX_CHAR_FRAMES
          );
        canvasContext.restore();
        // Draw fireball
        drawFireball &&
          fireballSpriteRef.current &&
          drawChar(
            canvasContext,
            fireballSpriteRef.current,
            fireball,
            charFrame.frameIndex,
            MAX_CHAR_FRAMES
          );
        // Draw emby
        drawChar(
          canvasContext,
          embySpriteRef.current,
          emby,
          charFrame.frameIndex,
          MAX_CHAR_FRAMES
        );
        setCharFrame(getUpdatedCharFrame(charFrame, MAX_MONSTER_ELAPSED));
      }
    }
  };

  return (
    <>
      <HealthBar
        name="Draggle"
        positionClassName="top-12 left-12"
        health={draggleHealthBar}
      />
      <HealthBar
        name="Emby"
        positionClassName="top-80 right-12"
        health={embyHealthBar}
      />
      <canvas
        className="outline-0"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={canvasRef}
        tabIndex={-1}
      />
      <AttackBar
        attackType="Attack type"
        attacks={attacks}
        onAttack={(attack: Attack): void => {
          setAttackComplete(false);
          draggleHealthBar > 0 &&
            setDraggleHealthBar(draggleHealthBar - attack.damage);
          switch (attack.name) {
            case AttackNames.TACKLE:
              tackleEnemy(embySpriteRef, draggleSpriteRef, 50, (): void =>
                setAttackComplete(true)
              );
              break;
            case AttackNames.FIREBALL:
              setDrawFireball(true);
              throwFireball(fireballSpriteRef, draggleSpriteRef, (): void =>
                setDrawFireball(false)
              );
              break;
          }
        }}
      />
    </>
  );
};

export default BattleMap;
