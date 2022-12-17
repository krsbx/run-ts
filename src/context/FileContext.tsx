import React, { useMemo, useState } from 'react';
import useJsonStorage from '../hooks/useJsonStorage';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../utils/constant/global';

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
  const [codes, setCodes] = useJsonStorage<Record<string, string>>(
    LOCAL_STORAGE_KEY.USER_CODE,
    { 0: '' }
  );
  const codeTotal = useMemo(() => Object.values(codes).length, [codes]);
  const [codeIndex, setCodeIndex] = useLocalStorage<number>(
    LOCAL_STORAGE_KEY.CODE_INDEX,
    0
  );

  const updateCode = (value: string) => {
    setCodes((curr) => {
      if (isChanging) return curr;

      const clone = Object.values(curr);
      const codes = clone.reduce(
        (prev, curr, index) => ({
          ...prev,
          [index]: curr,
        }),
        {} as Record<string, string>
      );

      codes[codeIndex] = value;

      return {
        ...codes,
      };
    });
  };

  const addNewCode = () => {
    setCodes((curr) => {
      const clone = Object.values(curr);
      const codes = clone.reduce(
        (prev, curr, index) => ({
          ...prev,
          [index]: curr,
        }),
        {} as Record<string, string>
      );

      codes[clone.length] = '';

      return {
        ...codes,
      };
    });

    setCodeIndex(codeTotal - 1);
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
    if (isChanging || (index === 0 && codeTotal === 1)) return;

    let toIndex = index;

    if (index === codeTotal - 1) {
      toIndex = codeTotal - 2;
    }

    setIsChanging(true);

    setTimeout(() => {
      setIsChanging(false);
      setCodeIndex(toIndex);

      setCodes((curr) => {
        const clone = Object.values(curr);
        clone.splice(index, 1);

        const codes = clone.reduce(
          (prev, curr, index) => ({
            ...prev,
            [index]: curr,
          }),
          {} as Record<string, string>
        );

        return {
          ...codes,
        };
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
        codeTotal,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
