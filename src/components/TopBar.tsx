import React from 'react';
import _ from 'lodash';
import { Button, Stack } from '@chakra-ui/react';
import { FiHelpCircle, FiSettings } from 'react-icons/fi';
import ThemePicker from './TopBar/ThemePicker';
import FileMenu from './TopBar/FileMenu';

const TopBar = () => {
  return (
    <Stack direction={'column'} spacing={2} height={'30px'}>
      <FileMenu />
      <ThemePicker />
      <Button
        bgColor={'whiteAlpha.300'}
        _hover={{
          bgColor: 'whiteAlpha.600',
        }}
        p={1}
        color={'gray.300'}
      >
        <FiSettings size={'25px'} />
      </Button>
      <Button
        bgColor={'whiteAlpha.300'}
        _hover={{
          bgColor: 'whiteAlpha.600',
        }}
        p={1}
        color={'gray.300'}
      >
        <FiHelpCircle size={'25px'} />
      </Button>
    </Stack>
  );
};

export default TopBar;
