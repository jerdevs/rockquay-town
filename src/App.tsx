import React from "react";
import { GameSequence } from "./App.interface";
import { initialGameSequence, resetGameSequence } from "./App.utils";
import BattleMap from "./components/BattleMap/BattleMap";
import GameMap from "./components/GameMap/GameMap";
import ScreenCover from "./components/ScreenCover/ScreenCover";

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
          onComplete={(): void => {
            setGameSequence({
              ...resetGameSequence,
              onBattleMap: true,
            });
          }}
        />
      )}
      {gameSequence.onBattleMap && <BattleMap />}
    </div>
  );
};

export default App;
