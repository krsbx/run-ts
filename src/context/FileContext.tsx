import React from 'react';

type ContextProps = {
  codes: Record<string, string>;
  updateCode: (value: string) => void;
  addNewCode: () => void;
  codeIndex: number;
  filePath: string;
  setFilePath: ReactSetter<string>;
  isChanging: boolean;
  updateIndex: (index: number) => void;
  removeCode: (index: number) => void;
  removeCurrentCode: () => void;
  quickChangeTab: () => void;
  codeTotal: number;
  currentCode: string;
};

const FileContext = React.createContext<ContextProps>({} as ContextProps);

export default FileContext;
