import React from 'react';
import fs from 'fs';
import path from 'path';
import { execAsync } from '../utils/common';
import { APP_NAME } from '../utils/constant/global';

declare global {
  type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

  interface Window {
    [APP_NAME]: {
      execAsync: typeof execAsync;
      path: typeof path;
      fs: typeof fs;
      rootPath: string;
    };
  }
}
