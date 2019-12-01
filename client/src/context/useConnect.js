import React, { useContext, memo } from "react";
import { StoreContext, DispatchContext } from "./Context.js";

export const useConnect = (state = ({}) => ({})) => {
  return Component => {
    let WrappedComponent = memo(Component);
    return function withContext(props) {
      const store = useContext(StoreContext);
      const dispatch = useContext(DispatchContext);
      const getState = { ...state(store) };

      return <WrappedComponent {...props} {...getState} dispatch={dispatch} />;
    };
  };
};
