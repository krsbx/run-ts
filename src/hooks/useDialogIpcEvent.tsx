import { useCallback } from 'react';
import { APP_NAME } from '../utils/constant/global';
import { SHOW_DIALOG } from '../utils/constant/ipc';

const useDialogIpcEvent = () => {
  const showSaveDialog = useCallback((defaultPath?: string) => {
    const result = window[APP_NAME].ipcRenderer.sendSync(
      SHOW_DIALOG.SAVE,
      defaultPath
    );

    return result as Electron.SaveDialogReturnValue;
  }, []);

  const showOpenDialog = useCallback(
    ({
      properties = [],
      defaultPath = undefined,
    }: {
      properties: Electron.OpenDialogOptions['properties'];
      defaultPath?: string;
    }) => {
      const result = window[APP_NAME].ipcRenderer.sendSync(SHOW_DIALOG.OPEN, {
        properties,
        defaultPath,
      });

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
