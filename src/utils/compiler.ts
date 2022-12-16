import _ from 'lodash';
import { APP_NAME } from './constant/global';

export const compiler = async (
  content: string,
  filePath: string,
  configPath: string = ''
) => {
  try {
    const dirPath = window[APP_NAME].getFileDirPath(filePath);

    if (!window.fs.existsSync(dirPath)) await window.fs.mkdirp(dirPath);

    window.fs.writeFileSync(filePath, content);

    let command = 'npx ts-node-esm';

    if (!_.isEmpty(configPath)) command += ` --project ${configPath}`;
    command += ` ${filePath}`;

    const results = await window[APP_NAME].execAsync(command, {
      cwd: dirPath,
    });

    return results.stdout;
  } catch {
    return;
  }
};
