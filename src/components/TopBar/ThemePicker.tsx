import React from 'react';
import _ from 'lodash';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { EDITOR_THEME } from '../../utils/constant/editor';
import useAppContext from '../../hooks/useAppContext';

const ThemePicker = () => {
  const { theme: currTheme, changeTheme } = useAppContext();

  return (
    <Popover>
      <PopoverTrigger>
        <Button height={'30px'} py={1} bgColor={'whiteAlpha.500'}>
          Themes
        </Button>
      </PopoverTrigger>
      <PopoverContent bgColor={'blackAlpha.300'} maxWidth={'250px'}>
        <PopoverArrow />
        <PopoverBody maxHeight={'40vh'} overflow={'auto'}>
          <Stack spacing={2}>
            {_.map(EDITOR_THEME, ({ name, theme }) => (
              <Button
                onClick={changeTheme(theme)}
                bgColor={
                  currTheme === theme ? 'whiteAlpha.800' : 'whiteAlpha.500'
                }
                key={name}
              >
                {name}
              </Button>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ThemePicker;
