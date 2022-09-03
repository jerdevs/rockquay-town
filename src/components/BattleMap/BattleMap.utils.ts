import { AttackNames } from "./../../data/Attacks/Attacks";
import { AttackSelected } from "./BattleMap.interface";
import { Sprite } from "../../App.interface";
import BattleBackground from "../../assets/images/Maps/BattleBackground.png";
import Fireball from "../../assets/images/Attacks/Fireball.png";
import GasBomb from "../../assets/images/Attacks/GasBomb.png";
import ColdSpikes from "../../assets/images/Attacks/ColdSpikes.png";
import { gsap } from "gsap";
import BattleAudio from "../../assets/audio/Battle.mp3";
import VictoryAudio from "../../assets/audio/Victory.wav";
import TackleHitAudio from "../../assets/audio/TackleHit.wav";
import FireballHitAudio from "../../assets/audio/FireballHit.wav";
import ExplosionAudio from "../../assets/audio/Explosion.wav";
import IceAudio from "../../assets/audio/Ice.wav";

export const battleMap = new Image();
battleMap.src = BattleBackground;
export const fireball = new Image();
fireball.src = Fireball;
export const gasBomb = new Image();
gasBomb.src = GasBomb;
export const coldSpikes = new Image();
coldSpikes.src = ColdSpikes;

export const initialBackgroundSprite: Sprite = {
  position: {
    x: 0,
    y: 0,
  },
  image: battleMap,
};

export const getProjectileSprite = (
  attackName = "",
  isEnemy = false
): Sprite => {
  return {
    position: {
      x: isEnemy ? 800 : 280,
      y: isEnemy ? 100 : 325,
    },
    image:
      attackName === AttackNames.FIREBALL
        ? fireball
        : attackName === AttackNames.GAS_BOMB
        ? gasBomb
        : coldSpikes,
  };
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

export const throwProjectile = (
  projectileSpriteRef: React.RefObject<Sprite>,
  enemyRef: React.RefObject<Sprite>,
  attackName: string,
  isEnemy = false,
  onProjectileComplete?: () => void,
  onComplete?: () => void
): void => {
  const playerAttackTimeline = gsap.timeline();
  projectileSpriteRef.current?.position &&
    enemyRef.current?.position &&
    playerAttackTimeline
      .to(projectileSpriteRef.current.position, {
        x: enemyRef.current.position.x,
        y: enemyRef.current.position.y,
        onComplete: (): void => {
          onProjectileComplete && onProjectileComplete();
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
      .to(projectileSpriteRef.current.position, {
        x: isEnemy
          ? getProjectileSprite(attackName, true).position.x
          : getProjectileSprite(attackName).position.x,
        y: isEnemy
          ? getProjectileSprite(attackName, true).position.y
          : getProjectileSprite(attackName).position.y,
      });
};

export const getBattleMapAudioSource = (playerHasWon = false): string => {
  let audio = BattleAudio;
  if (playerHasWon) {
    audio = VictoryAudio;
  }
  return audio;
};

export const getAttackAudioSource = (attackAudio: string): string => {
  switch (attackAudio) {
    case AttackNames.TACKLE:
      return TackleHitAudio;
    case AttackNames.FIREBALL:
      return FireballHitAudio;
    case AttackNames.GAS_BOMB:
      return ExplosionAudio;
    case AttackNames.COLD_SPIKES:
      return IceAudio;
  }
  return "";
};
