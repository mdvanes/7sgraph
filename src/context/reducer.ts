import { SET_BOOK_FILTER, SET_DETAILS_FOR } from "./actions";

export interface GraphSettingsState {
  searchByBook: string;
  detailsFor: string;
}

export const initialState: GraphSettingsState = {
  searchByBook: "",
  detailsFor: "",
};

type Action =
  | { type: typeof SET_BOOK_FILTER; payload: string }
  | { type: typeof SET_DETAILS_FOR; payload: string };

export type ContextType = {
  state: GraphSettingsState;
  dispatch: React.Dispatch<Action>;
};

export const reducer = (
  state: GraphSettingsState,
  { type, payload }: Action
): GraphSettingsState => {
  switch (type) {
    case SET_BOOK_FILTER:
      return { ...state, searchByBook: payload };
    case SET_DETAILS_FOR:
      return { ...state, detailsFor: payload };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};
