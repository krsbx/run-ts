import React from 'react';
import fs from 'fs-extra';
import path from 'path';
import { ipcRenderer } from 'electron';
import { execAsync } from '../utils/common/main';
import { APP_NAME } from '../utils/constant/global';

declare global {
  type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

  interface Window {
    [APP_NAME]: {
      execAsync: typeof execAsync;
    };
    ipcRenderer: typeof ipcRenderer;
    path: typeof path;
    fs: typeof fs;
  }

  interface File {
    path: string;
    size: number;
    type: string;
  }

  type KeyOf<T> = keyof T;
  type ValueOf<T> = T[KeyOf<T>];
}
