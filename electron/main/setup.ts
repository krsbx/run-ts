import { app } from 'electron';
import path from 'path';
import fs from 'fs-extra';
import { getAppDataPath } from '../../src/utils/common/main';

const copyResourceFile = (fileName: string) => {
  const src = path.join(
    path.resolve(app.isPackaged ? app.getAppPath() : 'electron'),
    'resources',
    fileName
  );
  const dest = path.join(getAppDataPath(), fileName);

  if (fs.existsSync(dest)) return;
  return fs.copyFile(src, dest);
};

export const setupPackageJson = () => copyResourceFile('package.json');

export const setupTsConfig = () => copyResourceFile('tsconfig.json');
