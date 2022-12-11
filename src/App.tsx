import React, { useState } from 'react';
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
import { Pane } from 'split-pane-react';
import SplitPane from './components/SplitPane';
import Editor from './components/Editor';
import { EDITOR_THEME } from './utils/constant';
import useLocalStorage from './hooks/useLocalStorage';
import { chakraColor } from './utils/theme';
import { readOnlyMode } from './utils/editor/extensions';

const App = () => {
  const [sizes, setSizes] = useLocalStorage<number[]>('PANE_SIZE', [50, 50]);
  const [theme, setTheme] = useLocalStorage<keyof typeof EDITOR_THEME>(
    'THEME',
    'dark'
  );
  const [bgColor, setBgColor] = useLocalStorage<string>(
    'BG_COLOR',
    EDITOR_THEME.dark.bgColor
  );
  const [userCode, setUserCode] = useState('');

  const changeTheme = (theme: keyof typeof EDITOR_THEME) => () =>
    setTheme((curr) => {
      if (curr === theme) {
        setBgColor(EDITOR_THEME.dark.bgColor);
        return 'dark';
      }

      setBgColor(EDITOR_THEME[theme].bgColor);
      return theme;
    });

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
        {/* 
        <Button onClick={changeTheme('vscodeDark')}>Vs Code</Button>
        <Button onClick={changeTheme('okaidia')}>Okaidia</Button>
        <Button onClick={changeTheme('dracula')}>Dracula</Button>
        <Button onClick={changeTheme('nord')}>Nord</Button> */}
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
          value={userCode}
          setValue={setUserCode}
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
