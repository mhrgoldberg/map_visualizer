import React, { createContext } from 'react';

const FileContext = createContext({
  file: null,
  updateFile: () => {}
});

export class FileProvider extends React.Component {
  updateFile = newFile => {
    this.setState({ file: newFile });
  };

  state = {
    file: null,
    updateFile: this.updateFile,
  };

  render() {
    return (
      <FileContext.Provider value={this.state}>
        {this.props.children}
      </FileContext.Provider>
    );
  }
}

export const FileConsumer = FileContext.Consumer;