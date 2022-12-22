import { app } from 'electron';
import os from 'os';
import path from 'path';
import { Platform } from './global';

export const INSTALLED_PATH = path.parse(path.resolve(app.getPath('exe'))).dir;

export const NPM_PATH = path.join(INSTALLED_PATH, 'npm/bin');

export const IS_WINDOWS = os.platform() === Platform.WINDOWS;

export const NPX = !app.isPackaged
  ? 'npx'
  : path.join(NPM_PATH, IS_WINDOWS ? 'npx.cmd' : 'npx');

export const NPM = !app.isPackaged
  ? 'npm'
  : path.join(NPM_PATH, IS_WINDOWS ? 'npm.cmd' : 'npm');
