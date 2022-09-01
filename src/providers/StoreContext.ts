import { Action, initialState, Store } from "./../store/reducers";
import * as React from "react";

interface AppContextType {
  state: Store;
  dispatch: React.Dispatch<Action>;
}

export const AppContext = React.createContext<AppContextType>({
  state: initialState,
  dispatch: (() => null) as React.Dispatch<Action>,
});
