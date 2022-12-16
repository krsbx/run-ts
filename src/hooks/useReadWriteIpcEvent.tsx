import { useCallback } from 'react';
import { JsonObject } from 'type-fest';
import { EncodingOption } from 'fs-extra';
import { READ_WRITE } from '../utils/constant/ipc';

const useReadWriteIpcEvent = () => {
  const readJsonFile = useCallback((filePath: string) => {
    return window.ipcRenderer.invoke(
      READ_WRITE.READ_JSON_FILE,
      filePath
    ) as Promise<JsonObject>;
  }, []);

  const readFileSync = useCallback(
    (filePath: string, encoding: EncodingOption = 'utf-8') => {
      const content: string = window.ipcRenderer.sendSync(
        READ_WRITE.READ_FILE,
        filePath,
        encoding
      );

      return content;
    },
    []
  );

  const writeFile = useCallback((filePath: string, content: string) => {
    return window.ipcRenderer.invoke(READ_WRITE.WRITE_FILE, filePath, content);
  }, []);

  const existsSync = useCallback((filePath: string) => {
    const isExist: boolean = window.ipcRenderer.sendSync(
      READ_WRITE.EXISTS,
      filePath
    );

    return isExist;
  }, []);

  return {
    readJsonFile,
    readFileSync,
    writeFile,
    existsSync,
  };
};

export default useReadWriteIpcEvent;
