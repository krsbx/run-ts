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

  const readFile = useCallback(
    (filePath: string, encoding: EncodingOption = 'utf-8') => {
      return window.ipcRenderer.invoke(
        READ_WRITE.READ_FILE,
        filePath,
        encoding
      ) as Promise<string>;
    },
    []
  );

  const writeFile = useCallback((filePath: string, content: string) => {
    return window.ipcRenderer.invoke(
      READ_WRITE.WRITE_FILE,
      filePath,
      content
    ) as Promise<void>;
  }, []);

  const exists = useCallback((filePath: string) => {
    return window.ipcRenderer.invoke(
      READ_WRITE.EXISTS,
      filePath
    ) as Promise<boolean>;
  }, []);

  return {
    readJsonFile,
    readFile,
    writeFile,
    exists,
  };
};

export default useReadWriteIpcEvent;
