import React from 'react';
import _ from 'lodash';
import { Button, Stack } from '@chakra-ui/react';
import ThemePicker from './TopBar/ThemePicker';
import FileMenu from './TopBar/FileMenu';

const TopBar = () => {
  return (
    <Stack direction={'row'} spacing={1} height={'30px'}>
      <FileMenu />
      <ThemePicker />
      <Button height={'30px'} py={1} bgColor={'whiteAlpha.500'}>
        Help
      </Button>
    </Stack>
  );
};

export default TopBar;
