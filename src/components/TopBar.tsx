import React from 'react';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { MdMinimize } from 'react-icons/md';
import { FiMaximize2 } from 'react-icons/fi';
import { APP_NAME } from '../utils/constant/global';
import useWindowAction from '../hooks/useWindowAction';

const TopBar = () => {
  const { maximizeWindow, minimizeWindow, closeApp } = useWindowAction();

  const handleResize = (e: React.MouseEvent) => {
    switch (e.detail) {
      case 2:
        maximizeWindow();
        break;
      default:
        break;
    }
  };

  return (
    <Flex
      width={'100%'}
      height={'32px'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'relative'}
      onClick={handleResize}
    >
      <Text
        color={'whiteAlpha.800'}
        textAlign={'center'}
        mr={'20px'}
        visibility={{ base: 'hidden', sm: 'visible' }}
        userSelect={'none'}
      >
        Run TS
      </Text>
      <Stack
        position={'absolute'}
        top={0}
        right={0}
        translateX={0}
        direction={'row'}
        spacing={1}
        px={1}
      >
        <Button variant={'main'} p={0} size={'sm'} onClick={minimizeWindow}>
          <MdMinimize size={'15px'} />
        </Button>
        <Button variant={'main'} p={0} size={'sm'} onClick={maximizeWindow}>
          <FiMaximize2 size={'15px'} />
        </Button>
        <Button variant={'main'} p={0} size={'sm'} onClick={closeApp}>
          <FaTimes size={'15px'} />
        </Button>
      </Stack>
    </Flex>
  );
};

export default TopBar;
