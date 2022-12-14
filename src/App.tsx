import React from 'react';
import _ from 'lodash';
import { Box } from '@chakra-ui/react';
import { Pane } from 'split-pane-react';
import useAppContext from './hooks/useAppContext';
import TopBar from './components/TopBar';
import EditorView from './components/EditorView';
import SplitPane from './components/SplitPane';
import Editor from './components/Editor';
import { EDITOR_THEME } from './utils/constant/editor';
import useCompiler from './hooks/useCompiler';
import { extensions, readOnlyMode } from './utils/editor/extensions';

const App = () => {
  const { sizes, setSizes, userCode, userCodeImport, theme, bgColor } =
    useAppContext();
  const codeResult = useCompiler(userCode, userCodeImport);

  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      bgColor={bgColor}
      overflowX={'hidden'}
    >
      <TopBar />
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        style={{ height: 'calc(100% - 30px)' }}
      >
        <Pane minSize={'20%'} maxSize={'80%'}>
          <EditorView />
        </Pane>
        <Editor
          value={codeResult}
          theme={EDITOR_THEME[theme].theme}
          fontSize={'22px'}
          height={'100%'}
          width={'100%'}
          extensions={[extensions, readOnlyMode]}
        />
      </SplitPane>
    </Box>
  );
};

export default App;
