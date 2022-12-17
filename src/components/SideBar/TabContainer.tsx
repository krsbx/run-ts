import React, { createRef, useCallback, useState } from 'react';
import _ from 'lodash';
import { Box, Button, Stack, useInterval } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import useFileContext from '../../hooks/useContext/useFileContext';
import Tab from './Tab';

const TabContainer = ({ menuHeight }: Props) => {
  const tabContainerRef = createRef<HTMLDivElement>();

  const [isMouseDownOnUp, setIsMouseDownOnUp] = useState(false);
  const [isMouseDownOnDown, setIsMouseDownOnDown] = useState(false);
  const { codes, addNewCode } = useFileContext();

  const moveTabs = useCallback(
    (offset: number) => {
      if (!tabContainerRef.current) return;

      tabContainerRef.current.scrollTop += offset;
    },
    [tabContainerRef]
  );

  useInterval(() => moveTabs(-50), isMouseDownOnUp ? 100 : null);
  useInterval(() => moveTabs(50), isMouseDownOnDown ? 100 : null);

  return (
    <Stack
      direction={'column'}
      spacing={2}
      height={`calc(100vh - calc(${menuHeight}px + 60px))`}
      justifyContent={'flex-start'}
    >
      <Button
        bgColor={'whiteAlpha.300'}
        _hover={{
          bgColor: 'whiteAlpha.500',
        }}
        p={1}
        color={'gray.300'}
        onMouseDown={() => setIsMouseDownOnUp(true)}
        onMouseUp={() => setIsMouseDownOnUp(false)}
      >
        <FaChevronUp size={'25px'} />
      </Button>
      <Stack
        spacing={2}
        justifyContent={'flex-start'}
        scrollBehavior={'smooth'}
        overflow={'auto'}
        id={'tab-container'}
        ref={tabContainerRef}
      >
        {_.map(codes, (code, index) => (
          <Tab
            key={`code-${index}`}
            containerRef={tabContainerRef}
            index={index}
          />
        ))}
      </Stack>
      <Button
        bgColor={'whiteAlpha.300'}
        _hover={{
          bgColor: 'whiteAlpha.500',
        }}
        p={1}
        color={'gray.300'}
        onMouseDown={() => setIsMouseDownOnDown(true)}
        onMouseUp={() => setIsMouseDownOnDown(false)}
      >
        <FaChevronDown size={'25px'} />
      </Button>
      <Button
        bgColor={'whiteAlpha.300'}
        _hover={{
          bgColor: 'whiteAlpha.500',
        }}
        onClick={addNewCode}
        p={1}
        color={'gray.300'}
      >
        <FiPlus size={'25px'} />
      </Button>
    </Stack>
  );
};

type Props = {
  menuHeight: number;
};

export default TabContainer;
