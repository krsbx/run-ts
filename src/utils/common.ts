import { promisify } from 'util';
import { exec } from 'child_process';
import { APP_NAME } from './constant/global';

export const execAsync = promisify(exec);

export const getFileDirPath = (filePath: string) => {
  const { dir } = window[APP_NAME].path.parse(filePath);

  return dir;
};
