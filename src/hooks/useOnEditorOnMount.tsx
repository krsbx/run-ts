import { EditorProps } from '@monaco-editor/react';
import useFileContext from './useContext/useFileContext';
import useSettingContext from './useContext/useSettingContext';
import useWindowAction from './useWindowAction';
import useFileAction from './useFileAction';
import useUtility from './useUtility';

const useOnEditorOnMount = () => {
  const { filePath, removeCurrentCode, quickChangeTab } = useFileContext();
  const { saveFile, saveFileAs, openFile } = useFileAction();
  const { onOpen } = useSettingContext();
  const { closeApp } = useWindowAction();
  const { getFileDirPath } = useUtility();

  const onMount: EditorProps['onMount'] = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () =>
      saveFile()
    );
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS,
      async () => saveFileAs(await getFileDirPath(filePath))
    );
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO, async () =>
      openFile(undefined, await getFileDirPath(filePath))
    );
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyW, () =>
      removeCurrentCode()
    );
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyQ, () =>
      onOpen()
    );
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyW,
      () => closeApp()
    );
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Tab, () =>
      quickChangeTab()
    );
  };

  return onMount;
};

export default useOnEditorOnMount;
