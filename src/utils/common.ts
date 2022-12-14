import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

export const execAsync = promisify(exec);

export const getFileDirPath = (filePath: string) => {
  const { dir } = path.parse(filePath);

  return dir;
};
