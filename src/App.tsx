import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { EditorProps } from '@monaco-editor/react';
import { Pane } from 'split-pane-react';
import useEditorContext from './hooks/useContext/useEditorContext';
import useFileContext from './hooks/useContext/useFileContext';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import SplitPane from './components/SplitPane';
import Editor from './components/Editor';
import useCompiler from './hooks/useCompiler';
import useFileAction from './hooks/useFileAction';
import useUtility from './hooks/useUtility';
import { chakraColor } from './utils/theme';
import useAutoInstaller from './hooks/useAutoInstaller';
import useWindowAction from './hooks/useWindowAction';

const App = () => {
  const { sizes, setSizes, bgColor } = useEditorContext();
  const { filePath, currentCode } = useFileContext();
  const { updateCode, removeCurrentCode, quickChangeTab } = useFileContext();
  const { saveFile, saveFileAs, openFile } = useFileAction();
  const { closeApp } = useWindowAction();
  const { getFileDirPath } = useUtility();
  const codeResult = useCompiler(currentCode);

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
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyW,
      () => closeApp()
    );
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Tab, () =>
      quickChangeTab()
    );
  };

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      bgColor={bgColor}
      overflowX={'hidden'}
    >
      <SideBar />
      <Box width={'100%'} height={'100%'}>
        <TopBar />
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={setSizes}
          style={{
            height: 'calc(100vh - 40px)',
          }}
        >
          <Pane minSize={'20%'} maxSize={'80%'}>
            <Editor
              value={currentCode}
              setValue={updateCode}
              fontSize={22}
              onMount={onMount}
              style={{
                borderRight: `1px solid ${chakraColor('gray', '700')}`,
                height: 'calc(100vh - 40px)',
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
            style={{
              height: 'calc(100vh - 40px)',
            }}
          />
        </SplitPane>
      </Box>
      {useAutoInstaller()}
    </Flex>
  );
};

export default App;
