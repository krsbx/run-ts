import React from 'react';
import EditorContextProvider from './EditorContext';
import FileContextProvider from './FileContext';
import SettingContextProvider from './SettingContext';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <EditorContextProvider>
        <FileContextProvider>
          <SettingContextProvider>{children}</SettingContextProvider>
        </FileContextProvider>
      </EditorContextProvider>
    </React.Fragment>
  );
};

export default AppContextProvider;
