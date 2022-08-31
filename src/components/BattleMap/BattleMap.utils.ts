import { AttackSelected } from "./BattleMap.interface";
import { Sprite } from "../../App.interface";
import BattleBackground from "../../images/BattleBackground.png";
import Fireball from "../../images/Fireball.png";
import { gsap } from "gsap";

export const battleMap = new Image();
battleMap.src = BattleBackground;
export const fireball = new Image();
fireball.src = Fireball;

export const initialBackgroundSprite: Sprite = {
  position: {
    x: 0,
    y: 0,
  },
  image: battleMap,
};

export const initialPlayerFireballSprite: Sprite = {
  position: {
    x: 280,
    y: 325,
  },
  image: fireball,
};

export const initialEnemyFireballSprite: Sprite = {
  position: {
    x: 800,
    y: 100,
  },
  image: fireball,
};

export const initialPlayerAttackSelected = (player: string): AttackSelected => {
  return {
    monster: player,
    attack: "",
  };
};

export const tackleEnemy = (
  playerRef: React.RefObject<Sprite>,
  enemyRef: React.RefObject<Sprite>,
  damage: number,
  onComplete?: () => void
): void => {
  const playerAttackTimeline = gsap.timeline();
  playerRef.current?.position &&
    playerAttackTimeline
      .to(playerRef.current.position, {
        x: playerRef.current.position.x - damage,
      })
      .to(playerRef.current.position, {
        x: playerRef.current.position.x + damage * 2,
        duration: 0.1,
        onComplete: (): void => {
          enemyRef.current?.position &&
            gsap.to(enemyRef.current.position, {
              opacity: 0,
              x: enemyRef.current.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
              onComplete,
            });
        },
      })
      .to(playerRef.current.position, {
        x: playerRef.current.position.x,
      });
};

export const throwFireball = (
  fireballSpriteRef: React.RefObject<Sprite>,
  enemyRef: React.RefObject<Sprite>,
  isEnemy = false,
  fireballComplete?: () => void,
  onComplete?: () => void
): void => {
  const playerAttackTimeline = gsap.timeline();
  fireballSpriteRef.current?.position &&
    enemyRef.current?.position &&
    playerAttackTimeline
      .to(fireballSpriteRef.current.position, {
        x: enemyRef.current.position.x,
        y: enemyRef.current.position.y,
        onComplete: (): void => {
          fireballComplete && fireballComplete();
          enemyRef.current?.position &&
            gsap.to(enemyRef.current.position, {
              opacity: 0,
              x: enemyRef.current.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
              onComplete,
            });
        },
      })
      .to(fireballSpriteRef.current.position, {
        x: isEnemy
          ? initialEnemyFireballSprite.position.x
          : initialPlayerFireballSprite.position.x,
        y: isEnemy
          ? initialEnemyFireballSprite.position.y
          : initialPlayerFireballSprite.position.y,
      });
};