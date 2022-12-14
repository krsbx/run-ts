export const SHOW_DIALOG = {
  ERROR: 'show.error.dialog',
  MESSAGE: 'show.message.dialog',
  SAVE: 'show.save.dialog',
  OPEN: 'show.open.dialog',
} as const;

export const APP_VARIABLE = {
  PATH: 'get.path',
  APP_PATH: 'get.app.path',
  IS_PACKAGED: 'is.app.packaged',
  APP_DATA: 'get.app.data.path',
} as const;

export const Platform = {
  WINDOWS: 'win32',
  MAC: 'darwin',
  LINUX: 'linux',
  SUN: 'sunos',
  OPENBSD: 'openbsd',
  ANDROID: 'android',
  AIX: 'aix',
} as const;

export const PlatformName = {
  WINDOWS: Platform.WINDOWS,
  MAC: Platform.MAC,
  LINUX: Platform.LINUX,
  SUN: Platform.SUN,
  OPENBSD: Platform.OPENBSD,
  ANDROID: Platform.ANDROID,
  AIX: Platform.AIX,
} as const;
