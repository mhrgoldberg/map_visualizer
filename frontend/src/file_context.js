import React, { createContext, useReducer } from "react";

export const FileContext = createContext();

export function FileProvider(props) {
  const initialState = {
    file: null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "reset":
        return initialState;
      case "updateFile":
        return { file: action.payload };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch };

  return (
    <FileContext.Provider value={value}>
      {props.children}
    </FileContext.Provider>
  );
}

