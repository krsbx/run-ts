import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../utils/constant/global';

type ContextProps = {
  userCode: string;
  setUserCode: ReactSetter<string>;
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
  const [userCode, setUserCode] = useLocalStorage<string>(
    LOCAL_STORAGE_KEY.USER_CODE,
    ''
  );

  return (
    <FileContext.Provider
      value={{
        userCode,
        setUserCode,
        filePath,
        setFilePath,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
