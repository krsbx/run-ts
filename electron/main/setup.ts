import { app } from 'electron';
import path from 'path';
import fs from 'fs-extra';
import { getAppDataPath, getFileDirPath } from '../../src/utils/common/main';
import { INSTALLED_PATH } from '../../src/utils/constant/main';

const copyResourceFile = async (fileName: string) => {
  let src = path.resolve('electron/resources', fileName);

  if (app.isPackaged) {
    src = path.join(INSTALLED_PATH, 'resources', fileName);
  }

  const dest = path.join(getAppDataPath(), fileName);
  const dirPath = getFileDirPath(dest);

  if (!fs.existsSync(dirPath)) await fs.mkdirp(dirPath);

  if (fs.existsSync(dest)) return;
  return fs.copyFile(src, dest);
};

export const setupPackageJson = () => copyResourceFile('package.json');

export const setupTsConfig = () => copyResourceFile('tsconfig.json');
