import React from 'react';
import { Flex } from '@chakra-ui/react';
import GitHubCorners from '@uiw/react-github-corners';
import { Pane } from 'split-pane-react';
import useAppContext from './hooks/useAppContext';
import TopBar from './components/SideBar';
import SplitPane from './components/SplitPane';
import Editor from './components/Editor';
import useCompiler from './hooks/useCompiler';
import useFileAction from './hooks/useFileAction';
import useUtility from './hooks/useUtility';
import { EditorProps } from '@monaco-editor/react';
import { chakraColor } from './utils/theme';
import usePackageComparator from './hooks/usePackageComparator';

const App = () => {
  const { sizes, setSizes, userCode, setUserCode } = useAppContext();
  const { filePath, bgColor } = useAppContext();
  const codeResult = useCompiler(userCode);

  const { saveFile, saveFileAs, openFile } = useFileAction();
  const isHasChange = usePackageComparator();
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
            value={userCode}
            setValue={setUserCode}
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
          options={{
            readOnly: true,
            domReadOnly: true,
          }}
        />
      </SplitPane>
      <GitHubCorners
        position="right"
        bottom
        href="https://github.com/krsbx/run-ts"
      />
    </Flex>
  );
};

export default App;
