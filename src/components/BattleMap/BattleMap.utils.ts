import { TACKLE_DAMAGE, FIREBALL_DAMAGE } from "./../../Constants";
import { Sprite } from "../../App.interface";
import BattleBackground from "../../images/BattleBackground.png";
import Draggle from "../../images/Draggle.png";
import Emby from "../../images/Emby.png";
import Fireball from "../../images/Fireball.png";
import { gsap } from "gsap";
import { Attack, AttackNames, AttackTypes } from "./BattleMap.interface";

export const battleMap = new Image();
battleMap.src = BattleBackground;
export const draggle = new Image();
draggle.src = Draggle;
export const emby = new Image();
emby.src = Emby;
export const fireball = new Image();
fireball.src = Fireball;

export const initialBackgroundSprite: Sprite = {
  position: {
    x: 0,
    y: 0,
  },
  image: battleMap,
};

export const initialDraggleSprite: Sprite = {
  position: {
    x: 800,
    y: 100,
    opacity: 1,
  },
  image: draggle,
  render: true,
};

export const initialEmbySprite: Sprite = {
  position: {
    x: 280,
    y: 325,
  },
  image: emby,
};

export const initialFireballSprite: Sprite = {
  position: {
    x: 280,
    y: 325,
  },
  image: fireball,
};

export const attacks: Attack[] = [
  {
    name: AttackNames.TACKLE,
    damage: TACKLE_DAMAGE,
    type: AttackTypes.NORMAL,
  },
  {
    name: AttackNames.FIREBALL,
    damage: FIREBALL_DAMAGE,
    type: AttackTypes.FIRE,
  },
];

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
          onComplete && onComplete();
          enemyRef.current?.position &&
            gsap.to(enemyRef.current.position, {
              opacity: 0,
              x: enemyRef.current.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            });
        },
      })
      .to(fireballSpriteRef.current.position, {
        x: initialFireballSprite.position.x,
        y: initialFireballSprite.position.y,
      });
};
