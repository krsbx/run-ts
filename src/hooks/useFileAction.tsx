import React from 'react';
import _ from 'lodash';
import useAppContext from './useAppContext';
import useDialogIpcEvent from './useDialogIpcEvent';
import useAppIpcEvent from './useAppIpcEvent';
import useUtility from './useUtility';
import useReadWriteIpcEvent from './useReadWriteIpcEvent';

const useFileAction = () => {
  const { userCode, setUserCode, filePath, setFilePath } = useAppContext();
  const { getPath } = useAppIpcEvent();
  const { showOpenDialog, showSaveDialog } = useDialogIpcEvent();
  const { getFileDirPath } = useUtility();
  const { readFile, writeFile, exists } = useReadWriteIpcEvent();

  const openFile = async (cb?: () => void, defaultPath?: string) => {
    cb?.();

    const { canceled, filePaths } = await showOpenDialog({
      properties: ['openFile'],
      defaultPath: _.isEmpty(defaultPath) ? await getPath('home') : defaultPath,
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
    setUserCode(content);
  };

  const saveFileAs = async (defaultPath?: string) => {
    const { canceled, filePath: fileDestPath } = await showSaveDialog(
      _.isEmpty(defaultPath) ? await getPath('home') : defaultPath
    );

    if (canceled || !fileDestPath || _.isEmpty(fileDestPath)) return;

    writeFile(fileDestPath, userCode);
    setFilePath(fileDestPath);
  };

  const saveFile = async () => {
    if (_.isEmpty(filePath) || !(await exists(filePath))) {
      return saveFileAs(getFileDirPath(filePath));
    }

    await writeFile(filePath, userCode);
  };

  return {
    saveFile,
    saveFileAs,
    openFile,
  };
};

export default useFileAction;
