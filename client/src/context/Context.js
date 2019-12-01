import React from "react";
import { types } from "../utils";

export const initialState = {
  theme: {
    theme: true
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case types.SET_THEME:
      return Object.assign({}, state, {
        theme: { ...(action.payload || []) }
      });

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const StoreContext = React.createContext();

export const DispatchContext = React.createContext();
