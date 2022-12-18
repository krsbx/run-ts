import { ipcMain } from 'electron';
import storage from 'electron-json-storage';
import { STORAGE } from '../../src/utils/constant/ipc';

ipcMain.on(STORAGE.GET_ITEM, (event, key: string) => {
  event.returnValue = JSON.stringify(storage.getSync(key));
});

ipcMain.handle(STORAGE.SET_ITEM, (event, key: string, value: string) => {
  try {
    return storage.set(key, JSON.parse(value), (err: unknown) => {
      if (!err) return;

      console.log(`Error: ${err}`);
    });
  } catch {}
});
