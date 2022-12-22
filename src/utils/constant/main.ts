import { app } from 'electron';
import os from 'os';
import path from 'path';
import { Platform } from './global';

export const INSTALLED_PATH = path.parse(path.resolve(app.getPath('exe'))).dir;

export const YARN_PATH = path.join(INSTALLED_PATH, 'yarn/bin');

export const IS_WINDOWS = os.platform() === Platform.WINDOWS;

export const YARN = !app.isPackaged
  ? 'yarn'
  : `${path.join(YARN_PATH, IS_WINDOWS ? 'yarn.cmd' : 'yarn')}`.replace(
      /\ /,
      '\\ '
    );
