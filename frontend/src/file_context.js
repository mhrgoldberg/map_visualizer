import React, { createContext, useState } from "react";

export const FileContext = createContext({
  file: null,
  updateFile: () => {},
});

export function FileProvider(props) {
  const updateFile = (newFile) => {
    setfileState({ file: newFile });
  };
  const [fileState, setfileState] = useState({
    file: null,
    updateFile: updateFile,
  })


    return (
      <FileContext.Provider value={fileState}>
        {props.children}
      </FileContext.Provider>
    );
}
