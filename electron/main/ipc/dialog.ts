import { dialog, ipcMain } from 'electron';
import { SHOW_DIALOG } from '../../../src/utils/constant/ipc';

ipcMain.on(SHOW_DIALOG.SAVE, async (event) => {
  try {
    const result = await dialog.showSaveDialog({
      title: 'Save File...',
      buttonLabel: 'Save',
      filters: [
        { name: 'js', extensions: ['js'] },
        { name: 'jsx', extensions: ['jsx'] },
        { name: 'ts', extensions: ['ts'] },
        { name: 'tsx', extensions: ['tsx'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });

    return (event.returnValue = result);
  } catch {
    dialog.showErrorBox(
      'Failed to open Browser',
      'Failed to open the file browser/explorer'
    );
  }
});

ipcMain.on(
  SHOW_DIALOG.OPEN,
  async (event, properties: Electron.OpenDialogOptions['properties'] = []) => {
    try {
      const result = await dialog.showOpenDialog({
        title: 'Open File...',
        buttonLabel: 'Open',
        filters: [
          { name: 'js', extensions: ['js'] },
          { name: 'jsx', extensions: ['jsx'] },
          { name: 'ts', extensions: ['ts'] },
          { name: 'tsx', extensions: ['tsx'] },
          { name: 'All Files', extensions: ['*'] },
        ],
        properties,
      });

      return (event.returnValue = result);
    } catch {
      dialog.showErrorBox(
        'Failed to open Browser',
        'Failed to open the file browser/explorer'
      );
    }
  }
);

ipcMain.on(
  SHOW_DIALOG.MESSAGE,
  async (event, options: Electron.MessageBoxOptions) => {
    try {
      const result = await dialog.showMessageBox(options);

      return (event.returnValue = result);
    } catch {}
  }
);

ipcMain.on(
  SHOW_DIALOG.ERROR,
  async (event, { title, content }: { title: string; content: string }) => {
    try {
      dialog.showErrorBox(title, content);
    } catch {}
  }
);
