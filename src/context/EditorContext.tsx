import React from 'react';
import { Monaco } from '@monaco-editor/react';
import { EDITOR_THEME } from '../utils/constant/editor';

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

const EditorContext = React.createContext<ContextProps>({} as ContextProps);

export default EditorContext;
