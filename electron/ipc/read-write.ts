import { ipcMain } from 'electron';
import _ from 'lodash';
import fs from 'fs-extra';
import { READ_WRITE } from '../../src/utils/constant/ipc';

ipcMain.handle(
  READ_WRITE.READ_FILE,
  (event, filePath: string, encoding: BufferEncoding = 'utf-8') => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
          reject(err);

          return;
        }

        resolve(data);
      });
    });
  }
);

ipcMain.handle(READ_WRITE.READ_JSON_FILE, (event, filePath: string) => {
  return fs.readJson(filePath);
});

ipcMain.handle(
  READ_WRITE.WRITE_FILE,
  (event, filePath: string, content: string) => {
    fs.writeFile(filePath, content);
  }
);

ipcMain.handle(READ_WRITE.EXISTS, (event, filePath: string) => {
  return fs.existsSync(filePath);
});
