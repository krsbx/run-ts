import { ipcMain } from 'electron';
import _ from 'lodash';
import fs from 'fs-extra';
import { ExecException } from 'child_process';
import {
  checkPackageExist,
  execAsync,
  getFileDirPath,
} from '../../src/utils/common/main';
import { UTILITY } from '../../src/utils/constant/ipc';
import { declarationErrorHandler } from '../../src/utils/error';
import { YARN } from '../../src/utils/constant/main';

ipcMain.handle(UTILITY.FILE_DIR_PATH, (event, filePath) => {
  return getFileDirPath(filePath);
});

ipcMain.handle(
  UTILITY.CHECK_PACKAGE_NAME,
  async (event, packageName: string) => {
    return checkPackageExist(packageName);
  }
);

ipcMain.handle(
  UTILITY.ADD_PACKAGES,
  async (event, packageNames: string[], cwd: string) => {
    if (_.isEmpty(packageNames)) return;

    const validPackages = await Promise.all(
      _.map(packageNames, async (packageName) => {
        if (await checkPackageExist(packageName)) return packageName;

        return;
      })
    );

    return execAsync(`${YARN} add -D ${validPackages.join(' ')}`, {
      cwd,
    });
  }
);

ipcMain.handle(
  UTILITY.REMOVE_PACKAGES,
  async (event, packageNames: string[], cwd: string) => {
    if (_.isEmpty(packageNames)) return;

    return execAsync(`${YARN} remove ${packageNames.join(' ')}`, {
      cwd,
    });
  }
);

ipcMain.handle(UTILITY.SYNCHRONIZE_PACKAGE, async (event, cwd: string) => {
  return execAsync(`${YARN}`, {
    cwd,
  });
});

ipcMain.handle(
  UTILITY.COMPILE_RUN,
  async (event, content: string, filePath: string, configPath: string = '') => {
    try {
      const dirPath = getFileDirPath(filePath);

      if (!fs.existsSync(dirPath)) await fs.mkdirp(dirPath);

      await fs.writeFile(filePath, content);

      const commands = [`${YARN} ts-node-esm`];

      if (!_.isEmpty(configPath)) commands.push(`--project ${configPath}`);
      commands.push(filePath);

      const results = (
        await execAsync(commands.join(' '), {
          cwd: dirPath,
        })
      ).stdout.split('\n');

      const result = results.slice(2, -2);
      result.push('\n');

      return result.join('\n');
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
