import { SET_BOOK_FILTER } from "./actions";

export interface GraphSettingsState {
  searchByBook: string;
}

export const initialState: GraphSettingsState = {
  searchByBook: "",
};

type Action = { type: typeof SET_BOOK_FILTER; payload: string } | { type: typeof SET_BOOK_FILTER; payload: string };

export type ContextType = { state: GraphSettingsState; dispatch: React.Dispatch<Action>; }

export const reducer = (
  state: GraphSettingsState,
  { type, payload }: Action
): GraphSettingsState => {
  switch (type) {
    case SET_BOOK_FILTER:
      return { ...state, searchByBook: payload };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};
