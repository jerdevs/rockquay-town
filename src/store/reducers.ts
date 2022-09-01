import { Boundary } from "./../components/GameMap/GameMap.interface";
import { Sprite } from "../App.interface";
import {
  getBattleZones,
  initialForegroundSprite,
  initialPlayerSprite,
} from "../components/GameMap/GameMap.utils";

export interface Store {
  backgroundSprite: Sprite | null;
  boundaries: Boundary[];
  foregroundSprite: Sprite;
  playerSprite: Sprite;
  battleZones: Boundary[];
}

export interface Action {
  type: string;
  payload: any;
}

export enum ActionTypes {
  UPDATE_BACKGROUND_SPRITE = "UPDATE_BACKGROUND_SPRITE",
  UPDATE_GAME_MAP_MOVABLES = "UPDATE_GAME_MAP_MOVABLES",
}

export const initialState: Store = {
  backgroundSprite: null,
  boundaries: [],
  foregroundSprite: initialForegroundSprite,
  playerSprite: initialPlayerSprite,
  battleZones: getBattleZones(),
};

export const reducers = (state = initialState, action: Action): Store => {
  switch (action.type) {
    case ActionTypes.UPDATE_BACKGROUND_SPRITE:
      console.log("update bg sprite", action.payload);
      return {
        ...state,
        backgroundSprite: action.payload,
      };
    case ActionTypes.UPDATE_GAME_MAP_MOVABLES:
      return {
        ...state,
        backgroundSprite: action.payload.backgroundSprite,
        boundaries: action.payload.boundaries,
        foregroundSprite: action.payload.foregroundSprite,
        playerSprite: action.payload.playerSprite,
        battleZones: action.payload.battleZones,
      };
    default:
      return state;
  }
};
