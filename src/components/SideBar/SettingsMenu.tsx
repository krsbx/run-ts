import React, { useState } from 'react';
import _ from 'lodash';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  ModalHeader,
  Text,
  Stack,
} from '@chakra-ui/react';
import { PackageJson } from 'type-fest';
import { FiSettings } from 'react-icons/fi';
import useUtility from '../../hooks/useUtility';
import useAppIpcEvent from '../../hooks/useAppIpcEvent';

const SettingsMenu = () => {
  const { readJsonFile } = useUtility();
  const { getAppDataPath } = useAppIpcEvent();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [pkgJson, setPkgJson] = useState<PackageJson>({});

  const showModal = async () => {
    try {
      const pkgJson: PackageJson = await readJsonFile(
        window.path.join(getAppDataPath(), 'package.json')
      );

      setPkgJson(pkgJson);

      onOpen();
    } catch {}
  };

  return (
    <React.Fragment>
      <Button
        bgColor={'whiteAlpha.300'}
        _hover={{
          bgColor: 'whiteAlpha.600',
        }}
        p={1}
        color={'gray.300'}
        onClick={() => showModal()}
      >
        <FiSettings size={'25px'} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc isCentered>
        <ModalOverlay />
        <ModalContent bgColor={'gray.800'}>
          <ModalCloseButton color={'whiteAlpha.800'} onClick={onClose} />
          <ModalHeader>
            <Text color={'whiteAlpha.800'}>Package Manager</Text>
          </ModalHeader>
          <ModalBody>
            <Stack width={'100%'} px={1} py={1}>
              {_.map(pkgJson.devDependencies ?? {}, (version, name) => (
                <Text key={`${name}@${version}`} color={'whiteAlpha.700'}>
                  {name}@{version}
                </Text>
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default SettingsMenu;
