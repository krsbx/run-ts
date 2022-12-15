import {
  AllHalowsEve,
  Amy,
  Blackboard,
  Clouds,
  Dracula,
  Github,
  Monokai,
  NightOwl,
  Nord,
  Sunburst,
  TomorrowNight,
  TomorrowNightBlue,
  TomorrowNightBright,
  TomorrowNightEighties,
  Twilight,
  Vibrant,
} from '../monaco/themes';

export const EDITOR_THEME = {
  'vs-dark': {
    name: 'Default',
    theme: 'vs-dark',
    bgColor: '#282c34',
  },
  'all-hallows-eve': {
    name: 'All Hallows Eve',
    theme: 'all-hallows-eve',
    bgColor: AllHalowsEve.colors['editor.background'],
  },
  amy: {
    name: 'Amy',
    theme: 'amy',
    bgColor: Amy.colors['editor.background'],
  },
  blackboard: {
    name: 'Blackboard',
    theme: 'blackboard',
    bgColor: Blackboard.colors['editor.background'],
  },
  'clouds-midnight': {
    name: 'Clouds',
    theme: 'clouds-midnight',
    bgColor: Clouds.colors['editor.background'],
  },
  dracula: {
    name: 'Dracula',
    theme: 'dracula',
    bgColor: Dracula.colors['editor.background'],
  },
  'github-dark': {
    name: 'Github',
    theme: 'github-dark',
    bgColor: Github.colors['editor.background'],
  },
  monokai: {
    name: 'Monokai',
    theme: 'monokai',
    bgColor: Monokai.colors['editor.background'],
  },
  'night-owl': {
    name: 'Night Owl',
    theme: 'night-owl',
    bgColor: NightOwl.colors['editor.background'],
  },
  nord: {
    name: 'Nord',
    theme: 'nord',
    bgColor: Nord.colors['editor.background'],
  },
  sunburst: {
    name: 'sunburst',
    theme: 'sunburst',
    bgColor: Sunburst.colors['editor.background'],
  },
  'tomorrow-night-blue': {
    name: 'Tomorrow Night Blue',
    theme: 'tomorrow-night-blue',
    bgColor: TomorrowNightBlue.colors['editor.background'],
  },
  'tomorrow-night-bright': {
    name: 'Tomorrow Night Bright',
    theme: 'tomorrow-night-bright',
    bgColor: TomorrowNightBright.colors['editor.background'],
  },
  'tomorrow-night-eighties': {
    name: 'Tomorrow Night Eighties',
    theme: 'tomorrow-night-eighties',
    bgColor: TomorrowNightEighties.colors['editor.background'],
  },
  'tomorrow-night': {
    name: 'tomorrow-night',
    theme: 'tomorrow-night',
    bgColor: TomorrowNight.colors['editor.background'],
  },
  twilight: {
    name: 'Twilight',
    theme: 'twilight',
    bgColor: Twilight.colors['editor.background'],
  },
  vibrant: {
    name: 'Vibrant',
    theme: 'vibrant',
    bgColor: Vibrant.colors['editor.background'],
  },
} as const;
