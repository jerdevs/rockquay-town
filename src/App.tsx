import React from "react";
import { GameSequence } from "./App.interface";
import {
  getRandomMonster,
  initialGameSequence,
  resetGameSequence,
} from "./App.utils";
import BattleMap from "./components/BattleMap/BattleMap";
import Credits from "./components/Credits/Credits";
import GameMap from "./components/GameMap/GameMap";
import Instructions from "./components/Instructions/Instructions";
import ScreenCover from "./components/ScreenCover/ScreenCover";
import StoreProvider from "./providers/StoreProvider";
import PixelIcon from "./assets/images/PixelIcon.png";
import { isBrowser } from "react-device-detect";

const App: React.FC = (): React.ReactElement => {
  const [gameSequence, setGameSequence] =
    React.useState<GameSequence>(initialGameSequence);
  const [showStartButton, setShowStartButton] = React.useState(true);

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
            player={getRandomMonster()}
            enemy={getRandomMonster(true)}
            goToGameMap={(): void => setGameSequence(initialGameSequence)}
          />
        )}
      </div>
    );
  };

  return (
    <StoreProvider>
      <div>
        <div className="p-8">
          <span className="text-amber-600">Hello adventurer, </span>
          <span>welcome to </span>
          <span className="text-sky-600">Rockquay Town!</span>
        </div>
        {showStartButton && (
          <div className="px-8 pb-8">
            <div className="pb-4 text-cyan-600 flex">
              <div>
                <img src={PixelIcon} alt="Your mission" />
              </div>
              <div className="pl-3">YOUR MISSION</div>
            </div>
            <div>
              This is a 2D interactive game where you will explore the town and
              defeat as many monsters as you can in order to protect your
              villagers from harm. This is best played on a web browser.
            </div>
          </div>
        )}
        {isBrowser ? (
          <>
            {!showStartButton && <div className="pl-8">{getGame()}</div>}
            <div className={!showStartButton ? "pt-8" : ""}>
              <Instructions />
            </div>
            {showStartButton && (
              <div className="pl-8 pb-8">
                <button
                  className="border-amber-600 text-amber-600 border-solid border-4 py-4 px-8 hover:bg-amber-600 hover:text-white"
                  onClick={(): void => setShowStartButton(false)}
                >
                  &gt; Press to Start
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="px-8 pb-8 flex text-red-600">
            Please use a web browser to play the game!
          </div>
        )}
        <Credits />
      </div>
    </StoreProvider>
  );
};

export default App;
