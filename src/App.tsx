import React from "react";
import { GameSequence } from "./App.interface";
import { initialGameSequence, resetGameSequence } from "./App.utils";
import BattleMap from "./components/BattleMap/BattleMap";
import GameMap from "./components/GameMap/GameMap";
import Instructions from "./components/Instructions/Instructions";
import ScreenCover from "./components/ScreenCover/ScreenCover";
import { MonsterNames } from "./data/Monsters/Monsters";
import StoreProvider from "./providers/StoreProvider";

const App: React.FC = (): React.ReactElement => {
  const [gameSequence, setGameSequence] =
    React.useState<GameSequence>(initialGameSequence);

  const getGame = (): React.ReactElement => {
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

  return (
    <StoreProvider>
      <div>
        <div className="p-6">Welcome to Rockquay Town!</div>
        <div>{getGame()}</div>
        <Instructions />
      </div>
    </StoreProvider>
  );
};

export default App;
