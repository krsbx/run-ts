import React from 'react';
import {
  Button,
  Popover,
  Stack,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import { FiHelpCircle } from 'react-icons/fi';

const HelpMenu = () => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
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
      </PopoverTrigger>
      <PopoverContent bgColor={'blackAlpha.400'} maxWidth={'200px'}>
        <PopoverArrow />
        <PopoverBody maxHeight={'40vh'} overflow={'auto'}>
          <Stack spacing={2} position={'relative'}>
            <Button
              bgColor={'whiteAlpha.300'}
              _hover={{
                bgColor: 'whiteAlpha.600',
              }}
              onClick={() =>
                window.open('https://github.com/krsbx/run-ts/issues')
              }
              color={'gray.300'}
            >
              Report Issue?
            </Button>
            <Button
              bgColor={'whiteAlpha.300'}
              _hover={{
                bgColor: 'whiteAlpha.600',
              }}
              onClick={() =>
                window.open(
                  'https://github.com/krsbx/run-ts/blob/main/CONTRIBUTING.md'
                )
              }
              color={'gray.300'}
            >
              Want to Contribute?
            </Button>
            <Button
              bgColor={'whiteAlpha.300'}
              _hover={{
                bgColor: 'whiteAlpha.600',
              }}
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/muhammad-firdaus-sati-7a0b541b6/'
                )
              }
              color={'gray.300'}
            >
              Connect with Me!
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HelpMenu;
