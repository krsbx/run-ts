import { contextBridge, ipcRenderer } from 'electron';
import fs from 'fs-extra';
import path from 'path';
import { execAsync } from '../src/utils/common/main';
import { APP_NAME } from '../src/utils/constant/global';

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

contextBridge.exposeInMainWorld(APP_NAME, {
  execAsync,
});

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
contextBridge.exposeInMainWorld('path', path);
contextBridge.exposeInMainWorld('fs', fs);
