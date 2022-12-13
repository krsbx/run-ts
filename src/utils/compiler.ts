import { APP_NAME } from './constant/global';

export const compiler = async (content: string, filePath: string) => {
  try {
    window[APP_NAME].fs.writeFileSync(filePath, content);

    const results = await window[APP_NAME].execAsync(
      `npx ts-node-esm ${filePath}`
    );

    return results.stdout;
  } catch {
    return;
  }
};
