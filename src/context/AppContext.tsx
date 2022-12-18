import React from 'react';
import EditorProvider from '../provider/EditorProvider';
import FileContextProvider from '../provider/FileProvider';
import SettingContextProvider from '../provider/SettingProvider';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EditorProvider>
      <FileContextProvider>
        <SettingContextProvider>{children}</SettingContextProvider>
      </FileContextProvider>
    </EditorProvider>
  );
};

export default AppContextProvider;
