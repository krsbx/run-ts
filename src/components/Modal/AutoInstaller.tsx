import React from 'react';
import _ from 'lodash';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Spinner,
  ModalHeader,
  Text,
  Stack,
} from '@chakra-ui/react';

const AutoInstaller = ({ isLoading }: Props) => {
  return (
    <Modal
      isOpen={isLoading}
      onClose={() => {}}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={'gray.800'}>
        <ModalHeader>
          <Text color={'whiteAlpha.800'}>Synchronizing...</Text>
        </ModalHeader>
        <ModalBody>
          <Stack alignItems={'center'} justifyContent={'center'} spacing={3}>
            <Text color={'whiteAlpha.800'}>Please wait...</Text>
            <Spinner color="gray.500" size={'lg'} />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

type Props = {
  isLoading: boolean;
};

export default AutoInstaller;
