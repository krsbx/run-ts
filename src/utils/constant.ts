import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { nord } from '@uiw/codemirror-theme-nord';

export const EDITOR_THEME = {
  dark: {
    theme: 'dark',
    bgColor: '#282c34',
  },
  vscodeDark: {
    theme: vscodeDark,
    bgColor: '#1e1e1e',
  },
  okaidia: {
    theme: okaidia,
    bgColor: '#272822',
  },
  dracula: {
    theme: dracula,
    bgColor: '#282a36',
  },
  nord: {
    theme: nord,
    bgColor: '#2e3440',
  },
} as const;
