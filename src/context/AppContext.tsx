import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { EDITOR_THEME } from '../utils/constant/editor';

type ContextProps = {
  sizes: number[];
  setSizes: ReactSetter<number[]>;
  codeSizes: number[];
  setCodeSizes: ReactSetter<number[]>;
  theme: keyof typeof EDITOR_THEME;
  setTheme: ReactSetter<keyof typeof EDITOR_THEME>;
  bgColor: string;
  setBgColor: ReactSetter<string>;
  userCode: string;
  setUserCode: ReactSetter<string>;
  userCodeImport: string;
  setUserCodeImport: ReactSetter<string>;
  filePath: string;
  setFilePath: ReactSetter<string>;
  changeTheme: (theme: keyof typeof EDITOR_THEME) => () => void;
};

export const AppContext = React.createContext<ContextProps>({} as ContextProps);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [filePath, setFilePath] = useLocalStorage<string>('FILE_PATH', '');
  const [sizes, setSizes] = useLocalStorage<number[]>('PANE_SIZE', [50, 50]);
  const [codeSizes, setCodeSizes] = useLocalStorage<number[]>(
    'CODE_PANE_SIZE',
    [30, 70]
  );
  const [theme, setTheme] = useLocalStorage<keyof typeof EDITOR_THEME>(
    'THEME',
    'dark'
  );
  const [bgColor, setBgColor] = useLocalStorage<string>(
    'BG_COLOR',
    EDITOR_THEME.dark.bgColor
  );
  const [userCode, setUserCode] = useLocalStorage<string>('USER_CODE', '');
  const [userCodeImport, setUserCodeImport] = useLocalStorage<string>(
    'USER_CODE_IMPORT',
    ''
  );

  const changeTheme = (theme: keyof typeof EDITOR_THEME) => () =>
    setTheme((curr) => {
      if (curr === theme) {
        setBgColor(EDITOR_THEME.dark.bgColor);
        return 'dark';
      }

      setBgColor(EDITOR_THEME[theme].bgColor);
      return theme;
    });

  return (
    <AppContext.Provider
      value={{
        sizes,
        setSizes,
        codeSizes,
        setCodeSizes,
        theme,
        setTheme,
        bgColor,
        setBgColor,
        userCode,
        setUserCode,
        userCodeImport,
        setUserCodeImport,
        filePath,
        setFilePath,
        changeTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
