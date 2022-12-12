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
import useFileAction from '../../hooks/useFileAction';

const FileMenu = () => {
  const { openFile, saveFile, saveFileAs } = useFileAction();

  return (
    <Popover>
      {({ onClose }) => (
        <React.Fragment>
          <PopoverTrigger>
            <Button height={'30px'} py={1} bgColor={'whiteAlpha.500'}>
              File
            </Button>
          </PopoverTrigger>
          <PopoverContent bgColor={'blackAlpha.300'} maxWidth={'200px'}>
            <PopoverArrow />
            <PopoverBody maxHeight={'40vh'} overflow={'auto'}>
              <Stack spacing={2} position={'relative'}>
                <Button
                  bgColor={'whiteAlpha.500'}
                  onClick={() => openFile(onClose)}
                >
                  Open
                </Button>
                <Button bgColor={'whiteAlpha.500'} onClick={saveFile}>
                  Save
                </Button>
                <Button bgColor={'whiteAlpha.500'} onClick={saveFileAs}>
                  Save As
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </React.Fragment>
      )}
    </Popover>
  );
};

export default FileMenu;
