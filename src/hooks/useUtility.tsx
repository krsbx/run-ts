import { useCallback } from 'react';
import { APP_NAME } from '../utils/constant/global';
import { READ_WRITE } from '../utils/constant/ipc';

const useUtility = () => {
  const getFileDirPath = useCallback((filePath: string) => {
    return window[APP_NAME].getFileDirPath(filePath);
  }, []);

  const compileRun = useCallback(
    (content: string, filePath: string, configPath: string = '') => {
      return window.ipcRenderer.invoke(
        READ_WRITE.COMPILE_RUN,
        content,
        filePath,
        configPath
      ) as Promise<string | undefined>;
    },
    []
  );

  return {
    getFileDirPath,
    compileRun,
  };
};

export default useUtility;
