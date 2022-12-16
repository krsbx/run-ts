import { app, ipcMain } from 'electron';
import _ from 'lodash';
import fs, { EncodingOption } from 'fs-extra';
import { execAsync, getFileDirPath } from '../../src/utils/common';
import { READ_WRITE } from '../../src/utils/constant/ipc';

ipcMain.handle(
  READ_WRITE.COMPILE_RUN,
  async (event, content: string, filePath: string, configPath: string = '') => {
    try {
      const dirPath = getFileDirPath(filePath);

      if (!fs.existsSync(dirPath)) await fs.mkdirp(dirPath);

      await fs.writeFile(filePath, content);

      let command = 'npx ts-node-esm';

      if (!_.isEmpty(configPath)) command += ` --project ${configPath}`;
      command += ` ${filePath}`;

      const results = await execAsync(command, {
        cwd: dirPath,
      });

      return results.stdout;
    } catch {
      return;
    }
  }
);

ipcMain.on(
  READ_WRITE.READ_FILE,
  (event, filePath: string, encoding: EncodingOption = 'utf-8') => {
    event.returnValue = fs.readFileSync(filePath, encoding);
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

ipcMain.on(READ_WRITE.EXISTS, (event, filePath: string) => {
  event.returnValue = fs.existsSync(filePath);
});
