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
        <Button variant={'main'}>
          <FiHelpCircle size={'25px'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent bgColor={'blackAlpha.400'} maxWidth={'200px'}>
        <PopoverArrow />
        <PopoverBody maxHeight={'40vh'} overflow={'auto'}>
          <Stack spacing={2} position={'relative'}>
            <Button
              variant={'main'}
              onClick={() =>
                window.open('https://github.com/krsbx/run-ts/issues')
              }
            >
              Report Issue?
            </Button>
            <Button
              variant={'main'}
              onClick={() =>
                window.open(
                  'https://github.com/krsbx/run-ts/blob/main/CONTRIBUTING.md'
                )
              }
            >
              Want to Contribute?
            </Button>
            <Button
              variant={'main'}
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/muhammad-firdaus-sati-7a0b541b6/'
                )
              }
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
