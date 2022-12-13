import React, { useCallback } from 'react';
import { APP_NAME } from '../utils/constant/global';

const useUtility = () => {
  const getFileDirPath = useCallback((filePath: string) => {
    return window[APP_NAME].getFileDirPath(filePath);
  }, []);

  return {
    getFileDirPath,
  };
};

export default useUtility;
