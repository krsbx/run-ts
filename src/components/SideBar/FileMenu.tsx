import React from 'react';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import useFileAction from '../../hooks/useFileAction';
import useAppContext from '../../hooks/useAppContext';
import useUtility from '../../hooks/useUtility';

const FileMenu = () => {
  const { filePath } = useAppContext();
  const { openFile, saveFile, saveFileAs } = useFileAction();
  const { getFileDirPath } = useUtility();

  return (
    <Popover placement="right">
      {({ onClose }) => (
        <React.Fragment>
          <PopoverTrigger>
            <Button
              bgColor={'whiteAlpha.300'}
              _hover={{
                bgColor: 'whiteAlpha.600',
              }}
              p={1}
              color={'gray.300'}
            >
              <HiOutlineDocumentText size={'25px'} />
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
                  onClick={() => openFile(onClose)}
                  color={'gray.300'}
                >
                  Open
                </Button>
                <Button
                  bgColor={'whiteAlpha.300'}
                  _hover={{
                    bgColor: 'whiteAlpha.600',
                  }}
                  onClick={saveFile}
                  color={'gray.300'}
                >
                  Save
                </Button>
                <Button
                  bgColor={'whiteAlpha.300'}
                  _hover={{
                    bgColor: 'whiteAlpha.600',
                  }}
                  onClick={() => saveFileAs(getFileDirPath(filePath))}
                  color={'gray.300'}
                >
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
