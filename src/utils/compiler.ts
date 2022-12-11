import { APP_NAME } from './constant/global';

export const compiler = async (content: string) => {
  try {
    window[APP_NAME].fs.writeFileSync(
      `${window[APP_NAME].rootPath}/.files.ts`,
      content
    );

    const results = await window[APP_NAME].execAsync(
      `npx ts-node-esm ${window[APP_NAME].rootPath}/.files.ts`
    );

    return results.stdout;
  } catch {
    return;
  }
};
