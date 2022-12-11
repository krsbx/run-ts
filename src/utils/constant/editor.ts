import {
  vscodeDark,
  okaidia,
  dracula,
  nord,
  aura,
  darcula,
  eclipse,
  githubDark,
  materialDark,
  xcodeDark,
  tokyoNight,
  tokyoNightStorm,
  duotoneDark,
} from '@uiw/codemirror-themes-all';

export const EDITOR_THEME = {
  dark: {
    name: 'Default',
    theme: 'dark',
    bgColor: '#282c34',
  },
  aura: {
    name: 'Aura',
    theme: aura,
    bgColor: '#21202e',
  },
  darcula: {
    name: 'Darcula',
    theme: darcula,
    bgColor: '#2B2B2B',
  },
  dracula: {
    name: 'Dracula',
    theme: dracula,
    bgColor: '#282a36',
  },
  duotoneDark: {
    name: 'Duo Tone',
    theme: duotoneDark,
    bgColor: '#2a2734',
  },
  eclipse: {
    name: 'Eclipse',
    theme: eclipse,
    bgColor: '#fff',
  },
  githubDark: {
    name: 'Github',
    theme: githubDark,
    bgColor: '#0d1117',
  },
  materialDark: {
    name: 'Material',
    theme: materialDark,
    bgColor: '#2e3235',
  },
  nord: {
    name: 'Nord',
    theme: nord,
    bgColor: '#2e3440',
  },
  okaidia: {
    name: 'Okaidia',
    theme: okaidia,
    bgColor: '#272822',
  },
  tokyoNight: {
    name: 'Tokyo Night',
    theme: tokyoNight,
    bgColor: '#1a1b26',
  },
  tokyoNightStorm: {
    name: 'Tokyo Night Storm',
    theme: tokyoNightStorm,
    bgColor: '#24283b',
  },
  vscodeDark: {
    name: 'VS Code',
    theme: vscodeDark,
    bgColor: '#1e1e1e',
  },
  xcodeDark: {
    name: 'XCode',
    theme: xcodeDark,
    bgColor: '#292A30',
  },
} as const;
