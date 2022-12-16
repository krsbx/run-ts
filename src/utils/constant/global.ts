export const APP_NAME = 'run-ts' as const;

export enum Platform {
  WINDOWS = 'win32',
  MAC = 'darwin',
  LINUX = 'linux',
  SUN = 'sunos',
  OPENBSD = 'openbsd',
  ANDROID = 'android',
  AIX = 'aix',
}

export const LOCAL_STORAGE_KEY = {
  FILE_PATH: 'file-path',
  PANE_SIZE: 'pane-size',
  THEME: 'theme',
  BG_COLOR: 'bg-color',
  USER_CODE: 'user-code',
} as const;
