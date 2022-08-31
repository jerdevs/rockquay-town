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
import DialogBox from "../DialogBox/DialogBox";
import { CharFrame } from "../GameMap/GameMap.interface";
import HealthBar from "../HealthBar/HealthBar";
import { Attack } from "../../data/Attacks/Attacks.interface";
import {
  initialBackgroundSprite,
  tackleEnemy,
  throwFireball,
  fireball,
  initialPlayerAttackSelected,
  initialEnemyFireballSprite,
  initialPlayerFireballSprite,
} from "./BattleMap.utils";
import { AttackNames } from "../../data/Attacks/Attacks";
import { draggle, emby, monsters } from "../../data/Monsters/Monsters";
import { AttackSelected } from "./BattleMap.interface";
import ScreenCover from "../ScreenCover/ScreenCover";

interface BattleMapProps {
  player: string;
  enemy: string;
  goToGameMap?: () => void;
}

const BattleMap: React.FC<BattleMapProps> = (
  props: BattleMapProps
): React.ReactElement => {
  const { player, enemy, goToGameMap } = props;
  const canvasRef: React.RefObject<HTMLCanvasElement> =
    React.useRef<HTMLCanvasElement>(null);
  const playerSpriteRef: React.RefObject<Sprite> = React.useRef<Sprite>(
    monsters[player]
  );
  const enemySpriteRef: React.RefObject<Sprite> = React.useRef<Sprite>(
    monsters[enemy]
  );
  const [charFrame, setCharFrame] = React.useState<CharFrame>(initialCharFrame);
  const [playerHealthBar, setPlayerHealthBar] = React.useState<number>(100);
  const [enemyHealthBar, setEnemyHealthBar] = React.useState<number>(100);
  const [drawFireball, setDrawFireball] = React.useState(false);
  const playerFireballSpriteRef: React.RefObject<Sprite> = React.useRef<Sprite>(
    initialPlayerFireballSprite
  );
  const enemyFireballSpriteRef: React.RefObject<Sprite> = React.useRef<Sprite>(
    initialEnemyFireballSprite
  );
  const [attackSelected, setAttackSelected] = React.useState<AttackSelected>(
    initialPlayerAttackSelected(player)
  );
  const [showDialogBox, setShowDialogBox] = React.useState(false);
  const [showScreenCover, setShowScreenCover] = React.useState(false);
  const playerHasWon = enemyHealthBar < 1;
  const enemyHasWon = playerHealthBar < 1;
  const charHasFainted = playerHasWon || enemyHasWon;
  const showAttackBar = !showDialogBox && (!playerHasWon || !enemyHasWon);

  React.useEffect((): (() => void) => {
    const animation = requestAnimationFrame(animateBattle);
    return (): void => {
      cancelAnimationFrame(animation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charFrame]);

  React.useEffect((): (() => void) => {
    if (showDialogBox) {
      if (enemySpriteRef.current && playerHasWon) {
        enemySpriteRef.current.render = false;
      }
      if (playerSpriteRef.current && enemyHasWon) {
        playerSpriteRef.current.render = false;
      }
    }
    return (): void => {
      if (enemySpriteRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        enemySpriteRef.current.render = true;
      }
      if (playerSpriteRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        playerSpriteRef.current.render = true;
      }
    };
  }, [
    enemyHealthBar,
    playerHealthBar,
    showDialogBox,
    playerHasWon,
    enemyHasWon,
  ]);

  const animateBattle = (): void => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext && playerSpriteRef.current && playerSpriteRef.current) {
        // Draw background
        drawImage(canvasContext, initialBackgroundSprite);
        // Draw draggle
        canvasContext.save();
        if (enemySpriteRef.current?.position.opacity) {
          canvasContext.globalAlpha = enemySpriteRef.current.position.opacity;
        }
        enemySpriteRef.current?.render &&
          drawChar(
            canvasContext,
            enemySpriteRef.current,
            draggle,
            charFrame.frameIndex,
            MAX_CHAR_FRAMES
          );
        canvasContext.restore();
        // Draw fireball
        drawFireball &&
          attackSelected.monster === player &&
          playerFireballSpriteRef.current &&
          drawChar(
            canvasContext,
            playerFireballSpriteRef.current,
            fireball,
            charFrame.frameIndex,
            MAX_CHAR_FRAMES
          );
        drawFireball &&
          attackSelected.monster === enemy &&
          enemyFireballSpriteRef.current &&
          drawChar(
            canvasContext,
            enemyFireballSpriteRef.current,
            fireball,
            charFrame.frameIndex,
            MAX_CHAR_FRAMES
          );
        // Draw emby
        drawChar(
          canvasContext,
          playerSpriteRef.current,
          emby,
          charFrame.frameIndex,
          MAX_CHAR_FRAMES
        );
        setCharFrame(getUpdatedCharFrame(charFrame, MAX_MONSTER_ELAPSED));
      }
    }
  };

  const onAttack = (
    selectedAttack: AttackSelected,
    damage: number,
    player: React.RefObject<Sprite>,
    enemy: React.RefObject<Sprite>,
    fireball: React.RefObject<Sprite>,
    isEnemy = false,
    showDialogBoxOnComplete = false
  ): void => {
    setAttackSelected({
      monster: selectedAttack.monster,
      attack: selectedAttack.attack,
    });
    switch (selectedAttack.attack) {
      case AttackNames.TACKLE:
        tackleEnemy(player, enemy, damage, (): void => {
          showDialogBoxOnComplete && setShowDialogBox(true);
        });
        break;
      case AttackNames.FIREBALL:
        setDrawFireball(true);
        throwFireball(
          fireball,
          enemy,
          isEnemy,
          (): void => setDrawFireball(false),
          (): void => {
            showDialogBoxOnComplete && setShowDialogBox(true);
          }
        );
        break;
    }
  };

  const getDialogBox = (): React.ReactElement => {
    return (
      <DialogBox
        message={`${attackSelected.monster} used ${attackSelected.attack}!`}
        onDialogBoxClicked={(): void => {
          if (attackSelected.monster === player) {
            // Randomize enemy attack
            const enemyAttacks: Attack[] = monsters[enemy].attacks ?? [];
            const randomAttack =
              enemyAttacks[Math.floor(Math.random() * enemyAttacks.length)];
            playerHealthBar > 0 &&
              setPlayerHealthBar(playerHealthBar - randomAttack.damage);
            onAttack(
              {
                monster: enemy,
                attack: randomAttack.name,
              },
              randomAttack.damage,
              enemySpriteRef,
              playerSpriteRef,
              enemyFireballSpriteRef,
              true
            );
          } else {
            setShowDialogBox(false);
          }
        }}
      />
    );
  };

  const getAttackBar = (): React.ReactElement => {
    return (
      <AttackBar
        attacks={monsters[player].attacks ?? []}
        onAttack={(attack: Attack): void => {
          // Player chooses attack
          enemyHealthBar > 0 &&
            setEnemyHealthBar(enemyHealthBar - attack.damage);
          onAttack(
            {
              monster: player,
              attack: attack.name,
            },
            attack.damage,
            playerSpriteRef,
            enemySpriteRef,
            playerFireballSpriteRef,
            false,
            true
          );
        }}
      />
    );
  };

  const getBattleMap = (): React.ReactElement => {
    return (
      <>
        <HealthBar
          name={enemy}
          positionClassName="top-12 left-12"
          health={enemyHealthBar}
        />
        <HealthBar
          name={player}
          positionClassName="top-80 right-12"
          health={playerHealthBar}
        />
        <canvas
          className="outline-0"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          ref={canvasRef}
          tabIndex={-1}
        />
        {showDialogBox ? getDialogBox() : showAttackBar && getAttackBar()}
        {charHasFainted && (
          <DialogBox
            message={`${playerHasWon ? enemy : player} has fainted!`}
            onDialogBoxClicked={(): void => setShowScreenCover(true)}
          />
        )}
      </>
    );
  };

  return (
    <>
      {showScreenCover && (
        <ScreenCover onComplete={(): void => goToGameMap && goToGameMap()} />
      )}
      {getBattleMap()}
    </>
  );
};

export default BattleMap;
