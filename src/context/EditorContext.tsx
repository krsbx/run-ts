import React, { useRef } from 'react';
import { Monaco } from '@monaco-editor/react';
import useLocalStorage from '../hooks/useLocalStorage';
import { EDITOR_THEME } from '../utils/constant/editor';
import { LOCAL_STORAGE_KEY } from '../utils/constant/global';

type ContextProps = {
  sizes: number[];
  setSizes: ReactSetter<number[]>;
  theme: string;
  setTheme: ReactSetter<string>;
  bgColor: string;
  setBgColor: ReactSetter<string>;
  monacosRef: React.MutableRefObject<Monaco[]>;
  changeTheme: (theme: KeyOf<typeof EDITOR_THEME>) => () => void;
};

export const EditorContext = React.createContext<ContextProps>(
  {} as ContextProps
);

const EditorContextProvider = ({ children }: { children: React.ReactNode }) => {
  const monacosRef = useRef<Monaco[]>([]);
  const [sizes, setSizes] = useLocalStorage<number[]>(
    LOCAL_STORAGE_KEY.PANE_SIZE,
    [50, 50]
  );
  const [theme, setTheme] = useLocalStorage<string>(
    LOCAL_STORAGE_KEY.THEME,
    EDITOR_THEME['vs-dark'].theme
  );
  const [bgColor, setBgColor] = useLocalStorage<string>(
    LOCAL_STORAGE_KEY.BG_COLOR,
    EDITOR_THEME['vs-dark'].bgColor
  );

  const changeTheme = (theme: KeyOf<typeof EDITOR_THEME>) => () =>
    setTheme((curr) => {
      if (curr === theme) {
        monacosRef.current.forEach((monaco) => {
          monaco.editor.setTheme(EDITOR_THEME['vs-dark'].theme);
        });

        setBgColor(EDITOR_THEME['vs-dark'].bgColor);

        return EDITOR_THEME['vs-dark'].theme;
      }

      monacosRef.current.forEach((monaco) => {
        monaco.editor.setTheme(theme);
      });

      setBgColor(EDITOR_THEME[theme].bgColor);

      return theme;
    });

  return (
    <EditorContext.Provider
      value={{
        sizes,
        setSizes,
        theme,
        setTheme,
        bgColor,
        setBgColor,
        changeTheme,
        monacosRef,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
