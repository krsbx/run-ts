import { app, ipcMain } from 'electron';
import { APP_VARIABLE } from '../../src/utils/constant/ipc';
import { getAppDataPath } from '../../src/utils/common';

ipcMain.on(
  APP_VARIABLE.PATH,
  (event, type: Parameters<typeof app.getPath>[0]) => {
    event.returnValue = app.getPath(type);
  }
);

ipcMain.on(APP_VARIABLE.APP_PATH, (event) => {
  event.returnValue = app.getAppPath();
});

ipcMain.on(APP_VARIABLE.IS_PACKAGED, (event) => {
  event.returnValue = app.isPackaged;
});

ipcMain.on(APP_VARIABLE.APP_DATA, (event) => {
  event.returnValue = getAppDataPath();
});
