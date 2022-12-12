import React from 'react';
import _ from 'lodash';
import { APP_NAME } from '../utils/constant/global';
import useAppContext from './useAppContext';
import useDialogIpcEvent from './useDialogIpcEvent';

const useFileAction = () => {
  const { userCode, setUserCode, filePath, setFilePath } = useAppContext();
  const { showOpenDialog, showSaveDialog } = useDialogIpcEvent();

  const openFile = (cb?: () => void) => {
    cb?.();

    const { canceled, filePaths } = showOpenDialog(['openFile']);

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

  const saveFileAs = () => {
    const { canceled, filePath } = showSaveDialog();

    if (canceled || !filePath || _.isEmpty(filePath)) return;

    window[APP_NAME].fs.writeFileSync(filePath, userCode);
    setFilePath(filePath);
  };

  const saveFile = async () => {
    if (_.isEmpty(filePath) || !window[APP_NAME].fs.existsSync(filePath)) {
      return saveFileAs();
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
