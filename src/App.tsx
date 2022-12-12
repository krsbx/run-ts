import React from 'react';
import { Box } from '@chakra-ui/react';
import _ from 'lodash';
import useAppContext from './hooks/useAppContext';
import TopBar from './components/TopBar';
import EditorView from './components/EditorView';

const App = () => {
  const { bgColor } = useAppContext();

  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      bgColor={bgColor}
      overflowX={'hidden'}
    >
      <TopBar />
      <EditorView />
    </Box>
  );
};

export default App;
