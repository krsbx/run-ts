import React from 'react';
import { Flex } from '@chakra-ui/react';
import { EditorProps } from '@monaco-editor/react';
import { Pane } from 'split-pane-react';
import useEditorContext from './hooks/useContext/useEditorContext';
import useFileContext from './hooks/useContext/useFileContext';
import TopBar from './components/SideBar';
import SplitPane from './components/SplitPane';
import Editor from './components/Editor';
import useCompiler from './hooks/useCompiler';
import useFileAction from './hooks/useFileAction';
import useUtility from './hooks/useUtility';
import { chakraColor } from './utils/theme';
import useAutoInstaller from './hooks/useAutoInstaller';

const App = () => {
  const { sizes, setSizes, bgColor } = useEditorContext();
  const { filePath, codes, updateCode, codeIndex } = useFileContext();
  const codeResult = useCompiler(codes[codeIndex]);

  const { saveFile, saveFileAs, openFile } = useFileAction();
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
  };

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      bgColor={bgColor}
      overflowX={'hidden'}
    >
      <TopBar />
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize={'20%'} maxSize={'80%'}>
          <Editor
            value={codes[codeIndex]}
            setValue={updateCode}
            fontSize={22}
            onMount={onMount}
            style={{
              borderRight: `1px solid ${chakraColor('gray', '700')}`,
            }}
          />
        </Pane>
        <Editor
          value={codeResult}
          fontSize={22}
          language={'bash'}
          options={{
            readOnly: true,
            domReadOnly: true,
          }}
        />
      </SplitPane>
      {useAutoInstaller()}
    </Flex>
  );
};

export default App;
