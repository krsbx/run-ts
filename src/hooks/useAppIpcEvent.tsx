import { app } from 'electron';
import { useCallback } from 'react';
import { APP_VARIABLE } from '../utils/constant/ipc';

const useAppIpcEvent = () => {
  const getAppPath = useCallback(() => {
    const result = window.ipcRenderer.sendSync(APP_VARIABLE.APP_PATH);

    return result as string;
  }, []);

  const getPath = useCallback((type: Parameters<typeof app.getPath>[0]) => {
    const result = window.ipcRenderer.sendSync(APP_VARIABLE.APP_PATH, type);

    return result as string;
  }, []);

  const getAppDataPath = useCallback(() => {
    const result = window.ipcRenderer.sendSync(APP_VARIABLE.APP_DATA);

    return result as string;
  }, []);

  const getIsPackaged = useCallback(() => {
    const result = window.ipcRenderer.sendSync(APP_VARIABLE.IS_PACKAGED);

    return result as boolean;
  }, []);

  return {
    getAppPath,
    getPath,
    getIsPackaged,
    getAppDataPath,
  };
};

export default useAppIpcEvent;
