import _ from 'lodash';
import React, { createRef, useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import useFileContext from '../../hooks/useContext/useFileContext';
import useOnHover from '../../hooks/useOnHover';
import { getCodeIndex } from '../../utils/common/renderer';

const Tab = ({ index, containerRef }: Props) => {
  const [isOnHover, setIsOnHover] = useState(false);
  const tabRef = createRef<HTMLDivElement>();
  const { codes, codeTotal, codeIndex, updateIndex, removeCode } =
    useFileContext();

  useOnHover(
    tabRef,
    () => setIsOnHover(true),
    () => setIsOnHover(false)
  );

  useEffect(() => {
    if (!containerRef.current || !tabRef.current) return;
    if (codeIndex !== index) return;

    containerRef.current.scrollTo({
      behavior: 'smooth',
      top: tabRef.current.offsetTop,
    });
  }, [tabRef.current, containerRef.current]);

  return (
    <Box position={'relative'} ref={tabRef}>
      <Button
        bgColor={codeIndex === index ? 'whiteAlpha.600' : 'whiteAlpha.300'}
        _hover={{
          bgColor: 'whiteAlpha.500',
        }}
        onClick={() => updateIndex(index)}
        color={'gray.300'}
        p={1}
      >
        <Text fontSize={'22px'}>{getCodeIndex(codes, index)}</Text>
      </Button>
      {codeTotal > 1 ? (
        <Flex
          visibility={isOnHover ? 'visible' : 'hidden'}
          _hover={{
            bgColor: 'red.600',
          }}
          position={'absolute'}
          bgColor={'red.500'}
          borderRadius={'2xl'}
          width={'17.5px'}
          height={'17.5px'}
          justifyContent={'center'}
          alignItems={'center'}
          cursor={'pointer'}
          right={0}
          top={0}
          onClick={() => removeCode(index)}
        >
          <FaTimes size={'12.5px'} />
        </Flex>
      ) : null}
    </Box>
  );
};

type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
  index: number;
};

export default Tab;
