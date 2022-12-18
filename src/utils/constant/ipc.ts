import { Platform } from './global';

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

export const PlatformName = {
  WINDOWS: Platform.WINDOWS,
  MAC: Platform.MAC,
  LINUX: Platform.LINUX,
  SUN: Platform.SUN,
  OPENBSD: Platform.OPENBSD,
  ANDROID: Platform.ANDROID,
  AIX: Platform.AIX,
} as const;

export const READ_WRITE = {
  COMPILE: 'read-write.compile',
  COMPILE_RUN: 'read-write.compile-run',
  RUN: 'read-write.run',
  READ_FILE: 'read-write.read',
  READ_JSON_FILE: 'read-write.read.json',
  WRITE_FILE: 'read-write.write',
  EXISTS: 'read-write.exits',
} as const;

export const UTILITY = {
  FILE_DIR_PATH: 'utility.file-dir.path',
  CHECK_PACKAGE_NAME: 'utility.package.name',
  REMOVE_PACKAGES: 'utility.remove.packages',
  ADD_PACKAGES: 'utility.add.packages',
  SYNCHRONIZE_PACKAGE: 'utility.synchronize.packages',
} as const;

export const STORAGE = {
  GET_ITEM: 'storage.item.get',
  SET_ITEM: 'storage.item.set',
} as const;
