import React from 'react';
import fs from 'fs';
import path from 'path';
import { ipcRenderer } from 'electron';
import { execAsync, getFileDirPath } from '../utils/common';
import { APP_NAME } from '../utils/constant/global';

declare global {
  type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

  interface Window {
    [APP_NAME]: {
      execAsync: typeof execAsync;
      getFileDirPath: typeof getFileDirPath;
      path: typeof path;
      fs: typeof fs;
      rootPath: string;
      ipcRenderer: typeof ipcRenderer;
    };
  }

  interface File {
    path: string;
    size: number;
    type: string;
  }
}
