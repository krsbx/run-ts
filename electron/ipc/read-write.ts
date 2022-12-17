import { ipcMain } from 'electron';
import _ from 'lodash';
import fs from 'fs-extra';
import { ExecException } from 'child_process';
import { execAsync, getFileDirPath } from '../../src/utils/common';
import { READ_WRITE } from '../../src/utils/constant/ipc';
import { declarationErrorHandler } from '../../src/utils/error';

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
    } catch (err) {
      const isDeclarationError = (err as ExecException).message.includes(
        'error TS7016'
      );

      if (isDeclarationError) {
        return {
          declaration: true,
          message: declarationErrorHandler((err as ExecException).message),
        };
      }

      return;
    }
  }
);

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
