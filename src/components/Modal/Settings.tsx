import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  Text,
  Stack,
  Grid,
  GridItem,
  Checkbox,
  Input,
  InputGroup,
  InputRightElement,
  chakra,
  Box,
} from '@chakra-ui/react';
import { PackageJson } from 'type-fest';
import { FaTimes } from 'react-icons/fa';
import useUtility from '../../hooks/useUtility';
import useAppIpcEvent from '../../hooks/useAppIpcEvent';
import useSettingContext from '../../hooks/useContext/useSettingContext';
import usePackageJsonReader from '../../hooks/usePackageJsonReader';
import useDialogIpcEvent from '../../hooks/useDialogIpcEvent';
import { EXCLUDED_PACKAGE } from '../../utils/constant/setting';

const Form = chakra('form');

const Settings = ({ isOpen, onClose, packageJson }: Props) => {
  const [packageName, setPackageName] = useState('');
  const [removedPackages, setRemovedPackages] = useState<string[]>([]);
  const [toAddPackages, setToAddPackages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const { setPackageJson, packageToAdd, setPackageToAdd } = useSettingContext();
  const { installPackages, uninstallPackages } = useUtility();
  const { showMessageDialogBox } = useDialogIpcEvent();
  const { getAppDataPath } = useAppIpcEvent();
  const jsonReader = usePackageJsonReader();

  useEffect(() => {
    setPackageName('');
    setToAddPackages([]);
    setRemovedPackages([]);
  }, [isOpen]);

  useEffect(() => {
    if (_.isEmpty(packageToAdd) || !isOpen) return;

    setPackageName(packageToAdd);
    setPackageToAdd('');
  }, [packageToAdd, isOpen]);

  const dropPackage = (name: string) =>
    setRemovedPackages((curr) => {
      const index = curr.findIndex((pkgName) => pkgName === name);

      if (index === -1) {
        curr.push(name);
      } else {
        curr.splice(index, 1);
      }

      return [...curr];
    });

  const addPackage = () =>
    setToAddPackages((curr) => {
      if (_.isEmpty(curr)) curr = [];
      const names = packageName.split(' ');

      _.forEach(names, (name) => {
        name = name.trim();

        const index = curr.findIndex((pkgName) => pkgName === name);

        if (index !== -1) return;

        curr.push(name);
      });

      setPackageName('');

      return [...curr];
    });

  const removePackage = (name: string) =>
    setToAddPackages((curr) => {
      const index = curr.findIndex((pkgName) => pkgName === name);

      if (index !== -1) curr.splice(index, 1);

      return [...curr];
    });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (packageName.trim() === '') return;

    addPackage();
  };

  const onUpdate = async () => {
    if (_.isEmpty(removedPackages) && _.isEmpty(toAddPackages)) {
      onClose();
      return;
    }

    setIsProcessing(true);

    try {
      const dirPath = await getAppDataPath();

      if (!_.isEmpty(removedPackages))
        await uninstallPackages(removedPackages, dirPath);

      if (!_.isEmpty(toAddPackages))
        await installPackages(toAddPackages, dirPath);

      setPackageJson(
        ((await jsonReader())['devDependencies'] ?? {}) as Record<
          string,
          string
        >
      );
      onClose();
    } catch {
      await showMessageDialogBox({
        title: 'Error',
        message: 'Something wrong just happen',
        detail:
          'Please check the name of the package that you want to install or your internet connections before continuing!',
        type: 'error',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={!isProcessing}
      closeOnOverlayClick={!isProcessing}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={'gray.800'}>
        <Button
          variant={'main'}
          p={0}
          size={'sm'}
          {...(!isProcessing && { onClick: onClose })}
          position={'absolute'}
          right={1}
          top={1}
          w={'40px'}
          h={'40px'}
        >
          <FaTimes size={'15px'} />
        </Button>
        <ModalHeader>
          <Text color={'whiteAlpha.800'} userSelect={'none'}>
            Package Manager
          </Text>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <InputGroup mb={4}>
              <Input
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder={'Package Name...'}
                autoFocus
              />
              <InputRightElement width={'75px'}>
                <Button
                  width={'100%'}
                  type={'submit'}
                  variant={'main'}
                  bgColor={'whiteAlpha.100'}
                  _hover={{
                    bgColor: 'whiteAlpha.300',
                  }}
                >
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
          </Form>
          <Grid templateColumns={'repeat(2, 1fr)'} gap={1} pb={2} px={2}>
            <GridItem>
              <Text color={'whiteAlpha.800'} userSelect={'none'}>
                Name@Version
              </Text>
            </GridItem>
            <GridItem display={'flex'} justifyContent={'flex-end'}>
              <Text color={'whiteAlpha.800'} userSelect={'none'}>
                Remove
              </Text>
            </GridItem>
          </Grid>
          <Stack
            width={'100%'}
            px={1}
            py={1}
            minH={'30vh'}
            maxH={'45vh'}
            overflowY={'auto'}
            overflowX={'hidden'}
          >
            {_.map(toAddPackages ?? [], (name) => (
              <Grid templateColumns={'repeat(2, 1fr)'} gap={1} key={name}>
                <GridItem px={1}>
                  <Text color={'whiteAlpha.700'}>{name}</Text>
                </GridItem>
                <GridItem
                  px={1}
                  display={'flex'}
                  justifyContent={'flex-end'}
                  alignItems={'center'}
                >
                  <Box
                    display={'flex'}
                    justifyContent={'flex-end'}
                    alignItems={'center'}
                    onClick={() => {
                      if (isProcessing) return;
                      removePackage(name);
                    }}
                    cursor={isProcessing ? 'not-allowed' : 'pointer'}
                  >
                    <FaTimes />
                  </Box>
                </GridItem>
              </Grid>
            ))}
            {_.map(packageJson ?? {}, (version, name) =>
              !_.includes(_.values(EXCLUDED_PACKAGE), name) ? (
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
                    <Checkbox
                      borderRadius={'lg'}
                      onChange={() => dropPackage(name)}
                      disabled={isProcessing}
                      checked={
                        removedPackages.findIndex(
                          (pkgName) => pkgName === name
                        ) !== -1
                      }
                    />
                  </GridItem>
                </Grid>
              ) : null
            )}
          </Stack>
          <Button
            width={'100%'}
            onClick={onUpdate}
            isLoading={isProcessing}
            disabled={isProcessing}
            variant={'main'}
            bgColor={'whiteAlpha.100'}
            _hover={{
              bgColor: 'whiteAlpha.300',
            }}
          >
            Update
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  packageJson: PackageJson['devDependencies'];
};

export default Settings;
