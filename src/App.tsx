import React from "react";
import { GameSequence } from "./App.interface";
import { initialGameSequence, resetGameSequence } from "./App.utils";
import BattleMap from "./components/BattleMap/BattleMap";
import GameMap from "./components/GameMap/GameMap";
import ScreenCover from "./components/ScreenCover/ScreenCover";
import { MonsterNames } from "./data/Monsters/Monsters";

const App: React.FC = (): React.ReactElement => {
  const [gameSequence, setGameSequence] =
    React.useState<GameSequence>(initialGameSequence);

  return (
    <div className="inline-block relative">
      {gameSequence.onGameMap && (
        <GameMap
          battleInitiated={gameSequence.battleInitiated}
          onBattleInitiated={(): void =>
            setGameSequence({
              ...gameSequence,
              battleInitiated: true,
            })
          }
        />
      )}
      {gameSequence.battleInitiated && (
        <ScreenCover
          yoyo
          repeat={3}
          onComplete={(): void =>
            setGameSequence({
              ...resetGameSequence,
              onBattleMap: true,
            })
          }
        />
      )}
      {gameSequence.onBattleMap && (
        <BattleMap
          player={MonsterNames.EMBY}
          enemy={MonsterNames.DRAGGLE}
          goToGameMap={(): void => setGameSequence(initialGameSequence)}
        />
      )}
    </div>
  );
};

export default App;
