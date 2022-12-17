import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../utils/constant/global';

type ContextProps = {
  codes: string[];
  setCodes: ReactSetter<string[]>;
  updateCode: (value: string) => void;
  codeIndex: number;
  setCodeIndex: ReactSetter<number>;
  filePath: string;
  setFilePath: ReactSetter<string>;
};

export const FileContext = React.createContext<ContextProps>(
  {} as ContextProps
);

const FileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [filePath, setFilePath] = useLocalStorage<string>(
    LOCAL_STORAGE_KEY.FILE_PATH,
    ''
  );
  const [codes, setCodes] = useLocalStorage<string[]>(
    LOCAL_STORAGE_KEY.USER_CODE,
    []
  );
  const [codeIndex, setCodeIndex] = useLocalStorage<number>(
    LOCAL_STORAGE_KEY.CODE_INDEX,
    0
  );

  const updateCode = (value: string) => {
    setCodes((curr) => {
      curr[codeIndex] = value;

      return [...curr];
    });
  };

  return (
    <FileContext.Provider
      value={{
        codes,
        setCodes,
        codeIndex,
        setCodeIndex,
        filePath,
        setFilePath,
        updateCode,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
