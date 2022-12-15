import React from 'react';
import _ from 'lodash';
import { Box, Flex } from '@chakra-ui/react';
import GitHubCorners from '@uiw/react-github-corners';
import { Pane } from 'split-pane-react';
import useAppContext from './hooks/useAppContext';
import TopBar from './components/TopBar';
import EditorView from './components/EditorView';
import SplitPane from './components/SplitPane';
import Editor from './components/Editor';
import useCompiler from './hooks/useCompiler';

const App = () => {
  const { sizes, setSizes, userCode, userCodeImport, bgColor } =
    useAppContext();
  const codeResult = useCompiler(userCode, userCodeImport);

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
          <EditorView />
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
