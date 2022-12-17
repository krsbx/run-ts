import React, { useMemo, useState } from 'react';
import FileContext from '../context/FileContext';
import useJsonStorage from '../hooks/useJsonStorage';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../utils/constant/global';

const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [filePath, setFilePath] = useLocalStorage<string>(
    LOCAL_STORAGE_KEY.FILE_PATH,
    ''
  );
  const [codes, setCodes] = useJsonStorage<Record<string, string>>(
    LOCAL_STORAGE_KEY.USER_CODE
  );
  const [codeIndex, setCodeIndex] = useLocalStorage<number>(
    LOCAL_STORAGE_KEY.CODE_INDEX,
    0
  );
  const codeTotal = useMemo(() => Object.values(codes).length, [codes]);
  const currentCode = useMemo(() => codes[codeIndex], [codes, codeIndex]);

  const addNewCode = () => {
    if (codeTotal > 14) return;

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

    setCodeIndex(codeTotal);
  };

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

  const updateIndex = (index: number) => {
    if (index === codeIndex) return;

    setIsChanging(true);

    setTimeout(() => {
      setIsChanging(false);
      setCodeIndex(index);
    }, 200);
  };

  return (
    <FileContext.Provider
      value={{
        codes,
        setCodes,
        codeIndex,
        setCodeIndex,
        addNewCode,
        updateCode,
        removeCode,
        filePath,
        setFilePath,
        isChanging,
        setIsChanging,
        updateIndex,
        codeTotal,
        currentCode,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;
