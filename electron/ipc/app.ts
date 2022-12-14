import os from 'os';
import path from 'path';
import { app, ipcMain } from 'electron';
import { APP_VARIABLE } from '../../src/utils/constant/ipc';
import { APP_NAME } from '../../src/utils/constant/global';
import { Platform } from '../../src/utils/constant/ipc';

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
  switch (os.platform()) {
    case Platform.WINDOWS:
      event.returnValue = path.join(app.getPath('appData'), APP_NAME);
      break;

    case Platform.MAC:
    case Platform.LINUX:
      event.returnValue = path.join(
        app.getPath('home'),
        `.local/share/${APP_NAME}`
      );
      break;

    default:
      event.returnValue = app.getAppPath();
      break;
  }
});
