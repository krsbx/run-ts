import os from 'os';
import path from 'path';
import _ from 'lodash';
import npmName from 'npm-name';
import { app } from 'electron';
import { promisify } from 'util';
import { exec } from 'child_process';
import { APP_NAME, Platform } from './constant/global';

export const execAsync = promisify(exec);

export const getFileDirPath = (filePath: string) => {
  const { dir } = path.parse(filePath);

  return dir;
};

export const getAppDataPath = () => {
  switch (os.platform()) {
    case Platform.WINDOWS:
      return path.join(app.getPath('appData'), APP_NAME);

    case Platform.MAC:
    case Platform.LINUX:
      return path.join(app.getPath('home'), `.local/share/${APP_NAME}`);

    default:
      return app.getAppPath();
  }
};

export const checkPackageExist = async (packageName: string) => {
  const splitByAt = _.compact(packageName.split('@'));

  const isWithOrgs = packageName.startsWith('@');
  const isHasVersion = splitByAt.length === 2;

  if (isHasVersion) splitByAt.pop();

  const pkgName = `${isWithOrgs ? '@' : ''}${splitByAt.join('@')}`;

  return !(await npmName(pkgName));
};
