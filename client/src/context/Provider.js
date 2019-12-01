import React, { useReducer } from "react";
import {
  StoreContext,
  DispatchContext,
  reducer,
  initialState
} from "./Context.js";

const Provider = Component =>
  function Provider(props) {
    const [state, dispatch] = useReducer(reducer, {
      ...initialState,
      session: { ...initialState.session, ...props.user }
    });

    return (
      <StoreContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Component />
        </DispatchContext.Provider>
      </StoreContext.Provider>
    );
  };

export default Provider;
