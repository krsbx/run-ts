import React from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import _ from 'lodash';
import { Pane } from 'split-pane-react';
import SplitPane from './components/SplitPane';
import Editor from './components/Editor';
import { EDITOR_THEME } from './utils/constant/editor';
import { chakraColor } from './utils/theme';
import { readOnlyMode } from './utils/editor/extensions';
import useCompiler from './hooks/useCompiler';
import useAppContext from './hooks/useAppContext';

const App = () => {
  const {
    sizes,
    setSizes,
    theme,
    setTheme,
    bgColor,
    setBgColor,
    userCode,
    setUserCode,
    changeTheme,
  } = useAppContext();
  const codeResult = useCompiler(userCode);

  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      bgColor={bgColor}
      overflowX={'hidden'}
    >
      <Stack direction={'row'} spacing={1} height={'30px'}>
        <Popover>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>
              Are you sure you want to have that milkshake?
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {_.map(EDITOR_THEME, ({ name }, key) => (
          <Button
            onClick={changeTheme(key as keyof typeof EDITOR_THEME)}
            key={name}
          >
            {name}
          </Button>
        ))}
      </Stack>
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        style={{ height: 'calc(100% - 30px)' }}
      >
        <Pane minSize={'20%'} maxSize={'80%'}>
          <Editor
            value={userCode}
            setValue={setUserCode}
            theme={EDITOR_THEME[theme].theme}
            fontSize={'22px'}
            height={'100%'}
            width={'100%'}
            borderRight={`2px solid ${chakraColor('gray', '800')}`}
          />
        </Pane>
        <Editor
          value={codeResult}
          theme={EDITOR_THEME[theme].theme}
          fontSize={'22px'}
          height={'100%'}
          width={'100%'}
          extensions={[readOnlyMode]}
        />
      </SplitPane>
    </Box>
  );
};

export default App;
