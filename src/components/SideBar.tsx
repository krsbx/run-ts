import React, { createRef } from 'react';
import _ from 'lodash';
import { Button, Divider, Flex, Stack } from '@chakra-ui/react';
import { FiHelpCircle } from 'react-icons/fi';
import ThemePicker from './SideBar/ThemePicker';
import FileMenu from './SideBar/FileMenu';
import SettingsMenu from './SideBar/SettingsMenu';
import useHeightObserver from '../hooks/useHeightObserver';
import TabContainer from './SideBar/TabContainer';

const SideBar = () => {
  const menuRef = createRef<HTMLDivElement>();
  const menuHeight = useHeightObserver(menuRef);

  return (
    <Flex flexDirection={'column'} justifyContent={'space-between'}>
      <Stack direction={'column'} spacing={2} ref={menuRef}>
        <FileMenu />
        <ThemePicker />
        <SettingsMenu />
      </Stack>
      <Divider />
      <TabContainer menuHeight={menuHeight} />
      <Divider />
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
    </Flex>
  );
};

export default SideBar;
