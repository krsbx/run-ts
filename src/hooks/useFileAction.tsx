import React from 'react';
import _ from 'lodash';
import { APP_NAME } from '../utils/constant/global';
import useAppContext from './useAppContext';
import useDialogIpcEvent from './useDialogIpcEvent';
import useAppIpcEvent from './useAppIpcEvent';
import useUtility from './useUtility';

const useFileAction = () => {
  const { userCode, setUserCode, filePath, setFilePath } = useAppContext();
  const { getPath } = useAppIpcEvent();
  const { showOpenDialog, showSaveDialog } = useDialogIpcEvent();
  const { getFileDirPath } = useUtility();

  const openFile = (cb?: () => void, defaultPath?: string) => {
    cb?.();

    const { canceled, filePaths } = showOpenDialog({
      properties: ['openFile'],
      defaultPath: _.isEmpty(defaultPath) ? getPath('home') : defaultPath,
    });

    if (
      canceled ||
      _.isEmpty(filePaths) ||
      !filePaths[0] ||
      _.isEmpty(filePaths[0])
    )
      return;

    const content = window[APP_NAME].fs.readFileSync(filePaths[0], 'utf-8');
    setFilePath(filePath);
    setUserCode(content);
  };

  const saveFileAs = (defaultPath?: string) => {
    const { canceled, filePath: fileDestPath } = showSaveDialog(
      _.isEmpty(defaultPath) ? getPath('home') : defaultPath
    );

    if (canceled || !fileDestPath || _.isEmpty(fileDestPath)) return;

    window[APP_NAME].fs.writeFileSync(fileDestPath, userCode);
    setFilePath(fileDestPath);
  };

  const saveFile = async () => {
    if (_.isEmpty(filePath) || !window[APP_NAME].fs.existsSync(filePath)) {
      return saveFileAs(getFileDirPath(filePath));
    }

    window[APP_NAME].fs.writeFileSync(filePath, userCode);
  };

  return {
    saveFile,
    saveFileAs,
    openFile,
  };
};

export default useFileAction;
