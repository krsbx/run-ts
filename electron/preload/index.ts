import { contextBridge } from 'electron';
import fs from 'fs';
import path from 'path';
import { execAsync } from '../../src/utils/common';
import { APP_NAME } from '../../src/utils/constant/global';

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

contextBridge.exposeInMainWorld(APP_NAME, {
  execAsync,
  fs,
  path,
  rootPath: path.join(__dirname, '..'),
});
