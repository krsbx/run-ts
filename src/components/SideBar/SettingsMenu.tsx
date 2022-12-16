import React from 'react';
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
  Grid,
  GridItem,
  Checkbox,
} from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import useAppContext from '../../hooks/useAppContext';
import usePackageJsonReader from '../../hooks/usePackageJsonReader';

const SettingsMenu = () => {
  const { packageJson, setPackageJson } = useAppContext();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const jsonReader = usePackageJsonReader();

  const showModal = async () => {
    try {
      const pkgJson = await jsonReader();

      setPackageJson(pkgJson?.devDependencies ?? {});

      onOpen();
    } catch {
      setPackageJson({});
    }
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
              {_.map(packageJson ?? {}, (version, name) => (
                <Grid
                  templateColumns={'repeat(2, 1fr)'}
                  gap={1}
                  key={`${name}@${version}`}
                >
                  <GridItem px={1}>
                    <Text color={'whiteAlpha.700'}>
                      {name}@{version}
                    </Text>
                  </GridItem>
                  <GridItem px={1} display={'flex'} justifyContent={'flex-end'}>
                    <Checkbox borderRadius={'lg'} />
                  </GridItem>
                </Grid>
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default SettingsMenu;
