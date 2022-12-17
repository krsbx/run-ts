import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../utils/constant/global';

type ContextProps = {
  codes: string[];
  setCodes: ReactSetter<string[]>;
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
};

export const FileContext = React.createContext<ContextProps>(
  {} as ContextProps
);

const FileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [filePath, setFilePath] = useLocalStorage<string>(
    LOCAL_STORAGE_KEY.FILE_PATH,
    ''
  );
  const [codes, setCodes] = useLocalStorage<string[]>(
    LOCAL_STORAGE_KEY.USER_CODE,
    ['']
  );
  const [codeIndex, setCodeIndex] = useLocalStorage<number>(
    LOCAL_STORAGE_KEY.CODE_INDEX,
    0
  );

  const updateCode = (value: string) => {
    setCodes((curr) => {
      if (isChanging) return curr;

      curr[codeIndex] = value;

      return [...curr];
    });
  };

  const addNewCode = () => {
    setCodes((curr) => {
      curr.push('');

      return [...curr];
    });

    setCodeIndex(codes.length - 1);
  };

  const updateIndex = (index: number) => {
    if (index === codeIndex) return;

    setIsChanging(true);

    setTimeout(() => {
      setIsChanging(false);
      setCodeIndex(index);
    }, 200);
  };

  const removeCode = (index: number) => {
    if (isChanging || (index === 0 && codes.length === 1)) return;

    let toIndex = index;

    if (index === codes.length - 1) {
      toIndex = codes.length - 2;
    }

    setIsChanging(true);

    setTimeout(() => {
      setIsChanging(false);
      setCodeIndex(toIndex);

      setCodes((curr) => {
        curr.splice(index, 1);

        return [...curr];
      });
    }, 200);
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
        addNewCode,
        isChanging,
        setIsChanging,
        updateIndex,
        removeCode,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
