import React, { createRef } from 'react';
import _ from 'lodash';
import { Divider, Flex, Stack } from '@chakra-ui/react';
import ThemePicker from './SideBar/ThemePicker';
import FileMenu from './SideBar/FileMenu';
import SettingsMenu from './SideBar/SettingsMenu';
import useHeightObserver from '../hooks/useHeightObserver';
import TabContainer from './SideBar/TabContainer';
import HelpMenu from './SideBar/HelpMenu';

const SideBar = () => {
  const menuRef = createRef<HTMLDivElement>();
  const menuHeight = useHeightObserver(menuRef);

  return (
    <Flex flexDirection={'column'} justifyContent={'space-between'} py={2}>
      <Stack direction={'column'} spacing={2} ref={menuRef} pb={2}>
        <FileMenu />
        <ThemePicker />
        <SettingsMenu />
      </Stack>
      <Divider borderColor={'whiteAlpha.600'} />
      <TabContainer menuHeight={menuHeight} />
      <Divider borderColor={'whiteAlpha.600'} mb={2} />
      <HelpMenu />
    </Flex>
  );
};

export default SideBar;
