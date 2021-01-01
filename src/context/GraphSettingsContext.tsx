import { createContext, FC, useContext, useReducer } from "react";
import { initialState, reducer, ContextType } from "./reducer";

// const GraphSettingsContext = createContext<ContextType | null>(null);
const GraphSettingsContext = createContext<any>(null);

export const GraphSettingsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GraphSettingsContext.Provider value={{state, dispatch}}>
      {children}
    </GraphSettingsContext.Provider>
  );
};

export const useGraphSettingsContext = () => useContext(GraphSettingsContext);
