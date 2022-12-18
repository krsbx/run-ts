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
import useFileContext from '../../hooks/useContext/useFileContext';
import useUtility from '../../hooks/useUtility';

const FileMenu = () => {
  const { filePath } = useFileContext();
  const { openFile, saveFile, saveFileAs } = useFileAction();
  const { getFileDirPath } = useUtility();

  return (
    <Popover placement="right">
      {({ onClose }) => (
        <React.Fragment>
          <PopoverTrigger>
            <Button variant={'main'}>
              <HiOutlineDocumentText size={'25px'} />
            </Button>
          </PopoverTrigger>
          <PopoverContent bgColor={'blackAlpha.400'} maxWidth={'200px'}>
            <PopoverArrow />
            <PopoverBody maxHeight={'40vh'} overflow={'auto'}>
              <Stack spacing={2} position={'relative'}>
                <Button variant={'main'} onClick={() => openFile(onClose)}>
                  Open
                </Button>
                <Button variant={'main'} onClick={saveFile}>
                  Save
                </Button>
                <Button
                  variant={'main'}
                  onClick={async () =>
                    saveFileAs(await getFileDirPath(filePath))
                  }
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
