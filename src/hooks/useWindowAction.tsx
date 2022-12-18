import { useCallback } from 'react';
import { WINDOW_ACTION } from '../utils/constant/ipc';

const useWindowAction = () => {
  const maximizeWindow = useCallback(() => {
    window.ipcRenderer.invoke(WINDOW_ACTION.MAXIMIZE);
  }, []);

  const minimizeWindow = useCallback(() => {
    window.ipcRenderer.invoke(WINDOW_ACTION.MINIMIZE);
  }, []);

  const closeApp = useCallback(() => {
    window.ipcRenderer.invoke(WINDOW_ACTION.QUIT);
  }, []);

  return {
    maximizeWindow,
    minimizeWindow,
    closeApp,
  };
};

export default useWindowAction;
