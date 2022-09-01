import { initialState, reducers } from "../store/reducers";
import React from "react";
import { AppContext } from "./StoreContext";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = (
  props: StoreProviderProps
): React.ReactElement => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducers, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default StoreProvider;
