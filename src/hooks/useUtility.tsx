import React, { useCallback } from 'react';
import { APP_NAME } from '../utils/constant/global';

const useUtility = () => {
  const readJsonFile = useCallback((filePath: string) => {
    return window.fs.readJSON(filePath);
  }, []);

  const getFileDirPath = useCallback((filePath: string) => {
    return window[APP_NAME].getFileDirPath(filePath);
  }, []);

  return {
    getFileDirPath,
    readJsonFile,
  };
};

export default useUtility;
