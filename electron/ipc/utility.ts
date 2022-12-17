import { ipcMain } from 'electron';
import _ from 'lodash';
import {
  checkPackageExist,
  execAsync,
  getFileDirPath,
} from '../../src/utils/common/main';
import { UTILITY } from '../../src/utils/constant/ipc';

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

    return execAsync(`npm i -D ${validPackages.join(' ')}`, {
      cwd,
    });
  }
);

ipcMain.handle(
  UTILITY.REMOVE_PACKAGES,
  async (event, packageNames: string[], cwd: string) => {
    if (_.isEmpty(packageNames)) return;

    return execAsync(`npm un ${packageNames.join(' ')}`, {
      cwd,
    });
  }
);

ipcMain.handle(UTILITY.SYNCHRONIZE_PACKAGE, async (event, cwd: string) => {
  return execAsync(`npm i`, {
    cwd,
  });
});
