import React from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { FiHelpCircle } from 'react-icons/fi';
import ThemePicker from './SideBar/ThemePicker';
import FileMenu from './SideBar/FileMenu';
import SettingsMenu from './SideBar/SettingsMenu';

const SideBar = () => {
  return (
    <Stack direction={'column'} spacing={2} height={'30px'}>
      <FileMenu />
      <ThemePicker />
      <SettingsMenu />
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

export default SideBar;
