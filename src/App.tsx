import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Pane } from 'split-pane-react';
import useEditorContext from './hooks/useContext/useEditorContext';
import useFileContext from './hooks/useContext/useFileContext';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import SplitPane from './components/SplitPane';
import Editor from './components/Editor';
import useCompiler from './hooks/useCompiler';
import { chakraColor } from './utils/theme';
import useAutoInstaller from './hooks/useAutoInstaller';
import useOnEditorOnMount from './hooks/useOnEditorOnMount';

const App = () => {
  const { sizes, setSizes, bgColor } = useEditorContext();
  const { currentCode } = useFileContext();
  const { updateCode } = useFileContext();
  const onEditorMount = useOnEditorOnMount();
  const codeResult = useCompiler(currentCode);

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
              onMount={onEditorMount}
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
