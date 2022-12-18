import { useCallback } from 'react';
import _ from 'lodash';
import useFileContext from './useContext/useFileContext';
import useDialogIpcEvent from './useDialogIpcEvent';
import useAppIpcEvent from './useAppIpcEvent';
import useUtility from './useUtility';
import useReadWriteIpcEvent from './useReadWriteIpcEvent';

const useFileControl = () => {
  const { currentCode, filePath, setFilePath, updateCode } = useFileContext();
  const { getPath } = useAppIpcEvent();
  const { showOpenDialog, showSaveDialog } = useDialogIpcEvent();
  const { getFileDirPath } = useUtility();
  const { readFile, writeFile, exists } = useReadWriteIpcEvent();

  const openFile = useCallback(
    async (cb?: () => void, defaultPath?: string) => {
      cb?.();

      const { canceled, filePaths } = await showOpenDialog({
        properties: ['openFile'],
        defaultPath: _.isEmpty(defaultPath)
          ? await getPath('home')
          : defaultPath,
      });

      if (
        canceled ||
        _.isEmpty(filePaths) ||
        !filePaths[0] ||
        _.isEmpty(filePaths[0])
      )
        return;

      const content = await readFile(filePaths[0]);

      setFilePath(filePaths[0]);
      updateCode(content);
    },
    [currentCode]
  );

  const saveFileAs = useCallback(
    async (defaultPath?: string) => {
      const { canceled, filePath: fileDestPath } = await showSaveDialog(
        _.isEmpty(defaultPath) ? await getPath('home') : defaultPath
      );

      if (canceled || !fileDestPath || _.isEmpty(fileDestPath)) return;

      writeFile(fileDestPath, currentCode);
      setFilePath(fileDestPath);
    },
    [currentCode]
  );

  const saveFile = useCallback(async () => {
    if (_.isEmpty(filePath) || !(await exists(filePath))) {
      return saveFileAs(await getFileDirPath(filePath));
    }

    return writeFile(filePath, currentCode);
  }, [currentCode]);

  return {
    openFile,
    saveFile,
    saveFileAs,
  };
};

export default useFileControl;
