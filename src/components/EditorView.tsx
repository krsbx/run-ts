import React from 'react';
import { Pane } from 'split-pane-react';
import SplitPane from './SplitPane';
import Editor from './Editor';
import useAppContext from '../hooks/useAppContext';
import { chakraColor } from '../utils/theme';
import useFileAction from '../hooks/useFileAction';
import useUtility from '../hooks/useUtility';
import { EditorProps } from '@monaco-editor/react';

const EditorView = () => {
  const { codeSizes, setCodeSizes, filePath } = useAppContext();
  const { userCode, setUserCode, userCodeImport, setUserCodeImport } =
    useAppContext();
  const { saveFile, saveFileAs, openFile } = useFileAction();
  const { getFileDirPath } = useUtility();

  const onMount: EditorProps['onMount'] = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () =>
      saveFile()
    );
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS,
      () => saveFileAs(getFileDirPath(filePath))
    );
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO, () =>
      openFile(undefined, getFileDirPath(filePath))
    );
  };

  return (
    <SplitPane
      split="horizontal"
      sizes={codeSizes}
      onChange={setCodeSizes}
      style={{ height: '100%' }}
    >
      <Editor
        value={userCodeImport}
        setValue={setUserCodeImport}
        fontSize={22}
        onMount={onMount}
        style={{
          borderRight: `2px solid ${chakraColor('gray', '700')}`,
        }}
      />
      <Pane minSize={'20%'} maxSize={'90%'}>
        <Editor
          value={userCode}
          setValue={setUserCode}
          fontSize={22}
          onMount={onMount}
          style={{
            borderRight: `2px solid ${chakraColor('gray', '700')}`,
            borderTop: `2px solid ${chakraColor('gray', '700')}`,
          }}
        />
      </Pane>
    </SplitPane>
  );
};

export default EditorView;
