import { SET_BOOK_FILTER, SET_DETAILS_FOR, SET_TIME_RANGE } from "./actions";

export interface GraphSettingsState {
  searchByBook: string;
  detailsFor: string;
  timeRange: [number, number];
}

export const TIME_RANGE_MIN = 1800;
export const TIME_RANGE_MAX = 2008;

export const initialState: GraphSettingsState = {
  searchByBook: "",
  detailsFor: "",
  timeRange: [TIME_RANGE_MIN, TIME_RANGE_MAX],
};

type Action =
  | { type: typeof SET_BOOK_FILTER; payload: string }
  | { type: typeof SET_DETAILS_FOR; payload: string }
  | { type: typeof SET_TIME_RANGE; payload: [number, number] };
  

export type ContextType = {
  state: GraphSettingsState;
  dispatch: React.Dispatch<Action>;
};

export const reducer = (
  state: GraphSettingsState,
  action: Action
): GraphSettingsState => {
  switch (action.type) {
    case SET_BOOK_FILTER:
      return { ...state, searchByBook: action.payload };
    case SET_DETAILS_FOR:
      return { ...state, detailsFor: action.payload };
    case SET_TIME_RANGE:
      return { ...state, timeRange: action.payload };
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
};
