import React, { createRef, useCallback, useState } from 'react';
import _ from 'lodash';
import { Button, Stack, useInterval } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import useFileContext from '../../hooks/useContext/useFileContext';
import Tab from './Tab';

const TabContainer = ({ menuHeight }: Props) => {
  const tabContainerRef = createRef<HTMLDivElement>();

  const [isMouseDownOnUp, setIsMouseDownOnUp] = useState(false);
  const [isMouseDownOnDown, setIsMouseDownOnDown] = useState(false);
  const [isMoveUpDisabled, setIsMoveUpDisabled] = useState(false);
  const [isMoveDownDisabled, setIsMoveDownDisabled] = useState(false);

  const { codes, addNewCode, codeTotal } = useFileContext();

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
      py={2}
    >
      <Button
        variant={'main'}
        onMouseDown={() => setIsMouseDownOnUp(true)}
        onMouseUp={() => setIsMouseDownOnUp(false)}
        disabled={isMoveUpDisabled}
      >
        <FaChevronUp size={'25px'} />
      </Button>
      <Stack
        spacing={2}
        justifyContent={'flex-start'}
        scrollBehavior={'smooth'}
        height={`100%`}
        overflow={'auto'}
        id={'tab-container'}
        ref={tabContainerRef}
      >
        {_.map(codes, (code, index) => (
          <Tab
            key={`code-${index}`}
            containerRef={tabContainerRef}
            index={Number(index)}
            setIsMoveUpDisabled={setIsMoveUpDisabled}
            setIsMoveDownDisabled={setIsMoveDownDisabled}
          />
        ))}
      </Stack>
      <Button
        variant={'main'}
        onMouseDown={() => setIsMouseDownOnDown(true)}
        onMouseUp={() => setIsMouseDownOnDown(false)}
        disabled={isMoveDownDisabled}
      >
        <FaChevronDown size={'25px'} />
      </Button>
      <Button variant={'main'} onClick={addNewCode} disabled={codeTotal >= 15}>
        <FiPlus size={'25px'} />
      </Button>
    </Stack>
  );
};

type Props = {
  menuHeight: number;
};

export default TabContainer;
