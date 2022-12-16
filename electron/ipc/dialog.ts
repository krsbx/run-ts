import { dialog, ipcMain } from 'electron';
import { SHOW_DIALOG } from '../../src/utils/constant/ipc';

ipcMain.handle(SHOW_DIALOG.SAVE, async (event, defaultPath?: string) => {
  try {
    return dialog.showSaveDialog({
      title: 'Save File...',
      buttonLabel: 'Save',
      filters: [
        { name: 'ts', extensions: ['ts'] },
        { name: 'tsx', extensions: ['tsx'] },
        { name: 'js', extensions: ['js'] },
        { name: 'jsx', extensions: ['jsx'] },
      ],
      defaultPath,
    });
  } catch {
    dialog.showErrorBox(
      'Failed to open Browser',
      'Failed to open the file browser/explorer'
    );
  }
});

ipcMain.handle(
  SHOW_DIALOG.OPEN,
  async (
    event,
    {
      properties = [],
      defaultPath,
    }: {
      properties: Electron.OpenDialogOptions['properties'];
      defaultPath?: string;
    }
  ) => {
    try {
      return dialog.showOpenDialog({
        title: 'Open File...',
        buttonLabel: 'Open',
        filters: [
          { name: 'ts', extensions: ['ts'] },
          { name: 'tsx', extensions: ['tsx'] },
          { name: 'js', extensions: ['js'] },
          { name: 'jsx', extensions: ['jsx'] },
        ],
        properties,
        defaultPath,
      });
    } catch {
      dialog.showErrorBox(
        'Failed to open Browser',
        'Failed to open the file browser/explorer'
      );
    }
  }
);

ipcMain.handle(
  SHOW_DIALOG.MESSAGE,
  async (event, options: Electron.MessageBoxOptions) => {
    try {
      return dialog.showMessageBox(options);
    } catch {}
  }
);

ipcMain.handle(
  SHOW_DIALOG.ERROR,
  async (event, { title, content }: { title: string; content: string }) => {
    try {
      dialog.showErrorBox(title, content);
    } catch {}
  }
);
