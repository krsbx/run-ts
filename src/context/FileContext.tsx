import React from 'react';

type ContextProps = {
  codes: Record<string, string>;
  setCodes: ReactSetter<Record<string, string>>;
  updateCode: (value: string) => void;
  addNewCode: () => void;
  codeIndex: number;
  setCodeIndex: ReactSetter<number>;
  filePath: string;
  setFilePath: ReactSetter<string>;
  isChanging: boolean;
  setIsChanging: ReactSetter<boolean>;
  updateIndex: (index: number) => void;
  removeCode: (index: number) => void;
  codeTotal: number;
  currentCode: string;
};

const FileContext = React.createContext<ContextProps>({} as ContextProps);

export default FileContext;
