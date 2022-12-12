import { useCallback } from 'react';
import { APP_NAME } from '../utils/constant/global';
import { SHOW_DIALOG } from '../utils/constant/ipc';

const useDialogIpcEvent = () => {
  const showSaveDialog = useCallback(() => {
    const result = window[APP_NAME].ipcRenderer.sendSync(SHOW_DIALOG.SAVE);

    return result as Electron.SaveDialogReturnValue;
  }, []);

  const showOpenDialog = useCallback(
    (properties: Electron.OpenDialogOptions['properties'] = []) => {
      const result = window[APP_NAME].ipcRenderer.sendSync(
        SHOW_DIALOG.OPEN,
        properties
      );

      return result as Electron.OpenDialogReturnValue;
    },
    []
  );

  const showMessageDialogBox = useCallback(
    (options: Electron.MessageBoxOptions) => {
      const result = window[APP_NAME].ipcRenderer.sendSync(
        SHOW_DIALOG.MESSAGE,
        options
      );

      return result as Electron.MessageBoxReturnValue;
    },
    []
  );

  const showErrorDialogBox = useCallback(
    (options: { title: string; content: string }) => {
      window[APP_NAME].ipcRenderer.sendSync(SHOW_DIALOG.ERROR, options);
    },
    []
  );

  return {
    showSaveDialog,
    showOpenDialog,
    showMessageDialogBox,
    showErrorDialogBox,
  };
};

export default useDialogIpcEvent;
