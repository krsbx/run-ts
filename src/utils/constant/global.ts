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
