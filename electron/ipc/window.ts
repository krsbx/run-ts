import { ipcMain, BrowserWindow } from 'electron';
import { WINDOW_ACTION } from '../../src/utils/constant/ipc';

export const setupWindowAction = async (win: BrowserWindow) => {
  ipcMain.handle(WINDOW_ACTION.MAXIMIZE, () => {
    win.isMaximized() ? win.restore() : win.maximize();
  });

  ipcMain.handle(WINDOW_ACTION.MINIMIZE, () => {
    win.minimize();
  });

  ipcMain.handle(WINDOW_ACTION.QUIT, () => {
    win.close();
  });
};
