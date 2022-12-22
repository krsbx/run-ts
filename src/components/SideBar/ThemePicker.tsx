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
import { GiPaintRoller } from 'react-icons/gi';
import { EDITOR_THEME } from '../../utils/constant/editor';
import useEditorContext from '../../hooks/useContext/useEditorContext';

const ThemePicker = () => {
  const { theme: currTheme, changeTheme } = useEditorContext();

  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button variant={'main'}>
          <GiPaintRoller size={'25px'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent bgColor={'blackAlpha.400'} maxWidth={'250px'}>
        <PopoverArrow />
        <PopoverBody maxHeight={'40vh'} overflow={'auto'}>
          <Stack spacing={2}>
            {_.map(EDITOR_THEME, ({ name, theme }) => (
              <Button
                variant={'main'}
                onClick={changeTheme(theme)}
                bgColor={currTheme === theme ? 'whiteAlpha.600' : 'transparent'}
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
