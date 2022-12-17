import _ from 'lodash';
import { useCallback } from 'react';
import { READ_WRITE, UTILITY } from '../utils/constant/ipc';

const useUtility = () => {
  const getFileDirPath = useCallback((filePath: string) => {
    return window.ipcRenderer.invoke(
      UTILITY.FILE_DIR_PATH,
      filePath
    ) as Promise<string>;
  }, []);

  const compileRun = useCallback(
    (content: string, filePath: string, configPath: string = '') => {
      return window.ipcRenderer.invoke(
        READ_WRITE.COMPILE_RUN,
        content,
        filePath,
        configPath
      ) as Promise<string | object | undefined>;
    },
    []
  );

  const isPackageExist = useCallback(async (packageName: string) => {
    return window.ipcRenderer.invoke(
      UTILITY.CHECK_PACKAGE_NAME,
      packageName
    ) as Promise<boolean>;
  }, []);

  const installPackages = useCallback(
    async (packageNames: string[], dirPath: string) => {
      if (_.isEmpty(packageNames)) return;

      return window.ipcRenderer.invoke(
        UTILITY.ADD_PACKAGES,
        packageNames,
        dirPath
      ) as Promise<void>;
    },
    []
  );

  const uninstallPackages = useCallback(
    (packageNames: string[], dirPath: string) => {
      return window.ipcRenderer.invoke(
        UTILITY.REMOVE_PACKAGES,
        packageNames,
        dirPath
      ) as Promise<void>;
    },
    []
  );

  return {
    getFileDirPath,
    compileRun,
    isPackageExist,
    installPackages,
    uninstallPackages,
  };
};

export default useUtility;
