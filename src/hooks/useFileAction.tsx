import React from 'react';
import _ from 'lodash';
import useFileContext from './useContext/useFileContext';
import useDialogIpcEvent from './useDialogIpcEvent';
import useAppIpcEvent from './useAppIpcEvent';
import useUtility from './useUtility';
import useReadWriteIpcEvent from './useReadWriteIpcEvent';

const useFileAction = () => {
  const { codes, setCodes, filePath, setFilePath, codeIndex } =
    useFileContext();
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
    setCodes((curr) => {
      curr[codeIndex] = content;

      return [...curr];
    });
  };

  const saveFileAs = async (defaultPath?: string) => {
    const { canceled, filePath: fileDestPath } = await showSaveDialog(
      _.isEmpty(defaultPath) ? await getPath('home') : defaultPath
    );

    if (canceled || !fileDestPath || _.isEmpty(fileDestPath)) return;

    writeFile(fileDestPath, codes[codeIndex]);
    setFilePath(fileDestPath);
  };

  const saveFile = async () => {
    if (_.isEmpty(filePath) || !(await exists(filePath))) {
      return saveFileAs(await getFileDirPath(filePath));
    }

    await writeFile(filePath, codes[codeIndex]);
  };

  return {
    saveFile,
    saveFileAs,
    openFile,
  };
};

export default useFileAction;
