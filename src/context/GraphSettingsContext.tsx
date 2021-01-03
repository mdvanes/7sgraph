import { createContext, FC, useContext, useReducer } from "react";
import { GraphSettingsState, initialState, reducer } from "./reducer";

const GraphSettingsContext = createContext<{
  state: GraphSettingsState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const GraphSettingsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GraphSettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </GraphSettingsContext.Provider>
  );
};

export const useGraphSettingsContext = () => useContext(GraphSettingsContext);
