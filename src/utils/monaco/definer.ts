import _ from 'lodash';
import { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
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
} from './themes';
import { EDITOR_THEME } from '../constant/editor';

export const defineTheme = (monaco: Monaco, theme?: string) => {
  monaco.editor.defineTheme(
    EDITOR_THEME.amy.theme,
    Amy as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME['all-hallows-eve'].theme,
    AllHalowsEve as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME.blackboard.theme,
    Blackboard as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME['clouds-midnight'].theme,
    Clouds as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME.dracula.theme,
    Dracula as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME['github-dark'].theme,
    Github as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME.monokai.theme,
    Monokai as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME['night-owl'].theme,
    NightOwl as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME.nord.theme,
    Nord as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME.sunburst.theme,
    Sunburst as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME['tomorrow-night-blue'].theme,
    TomorrowNightBlue as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME['tomorrow-night-bright'].theme,
    TomorrowNightBright as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME['tomorrow-night-eighties'].theme,
    TomorrowNightEighties as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME['tomorrow-night'].theme,
    TomorrowNight as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME.twilight.theme,
    Twilight as editor.IStandaloneThemeData
  );
  monaco.editor.defineTheme(
    EDITOR_THEME.vibrant.theme,
    Vibrant as editor.IStandaloneThemeData
  );

  if (!_.isNil(theme) && !_.isEmpty(theme)) monaco.editor.setTheme(theme);
};
