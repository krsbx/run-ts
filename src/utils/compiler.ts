import { APP_NAME } from './constant/global';

export const compiler = async (content: string, filePath: string) => {
  try {
    const dirPath = window[APP_NAME].getFileDirPath(filePath);

    if (!window.fs.existsSync(dirPath)) await window.fs.mkdirp(dirPath);

    window.fs.writeFileSync(filePath, content);

    const results = await window[APP_NAME].execAsync(
      `npx ts-node-esm ${filePath}`,
      {
        cwd: dirPath,
      }
    );

    return results.stdout;
  } catch {
    return;
  }
};
