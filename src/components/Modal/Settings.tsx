import React, { useState } from 'react';
import _ from 'lodash';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
  Stack,
  Grid,
  GridItem,
  Checkbox,
} from '@chakra-ui/react';
import { PackageJson } from 'type-fest';

const Settings = ({ isOpen, onClose, packageJson }: Props) => {
  const [removedPackages, setRemovedPackages] = useState<string[]>([]);
  const [addPackages, setAddPackages] = useState<string[]>([]);

  const dropPackage = (name: string) =>
    setRemovedPackages((curr) => {
      const index = curr.findIndex((pkgName) => pkgName === name);

      if (index === -1) {
        curr.push(name);
      } else {
        curr.splice(index, 1);
      }

      return curr;
    });

  const removePackage = (name: string) =>
    setAddPackages((curr) => {
      const index = curr.findIndex((pkgName) => pkgName === name);

      if (index === -1) {
        curr.push(name);
      } else {
        curr.splice(index, 1);
      }

      return curr;
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc isCentered>
      <ModalOverlay />
      <ModalContent bgColor={'gray.800'}>
        <ModalCloseButton color={'whiteAlpha.800'} onClick={onClose} />
        <ModalHeader>
          <Text color={'whiteAlpha.800'}>Package Manager</Text>
        </ModalHeader>
        <ModalBody>
          <Grid templateColumns={'repeat(2, 1fr)'} gap={1} pb={2} px={2}>
            <GridItem>
              <Text color={'whiteAlpha.800'}>Name@Version</Text>
            </GridItem>
            <GridItem display={'flex'} justifyContent={'flex-end'}>
              <Text color={'whiteAlpha.800'}>Remove</Text>
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
            {_.map(addPackages ?? [], (name) => (
              <Grid templateColumns={'repeat(2, 1fr)'} gap={1} key={name}>
                <GridItem px={1}>
                  <Text color={'whiteAlpha.700'}>{name}</Text>
                </GridItem>
                <GridItem px={1} display={'flex'} justifyContent={'flex-end'}>
                  <Checkbox
                    borderRadius={'lg'}
                    onChange={() => removePackage(name)}
                    checked={
                      removedPackages.findIndex(
                        (pkgName) => pkgName === name
                      ) !== -1
                    }
                  />
                </GridItem>
              </Grid>
            ))}
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
                  <Checkbox
                    borderRadius={'lg'}
                    onChange={() => dropPackage(name)}
                    checked={
                      removedPackages.findIndex(
                        (pkgName) => pkgName === name
                      ) !== -1
                    }
                  />
                </GridItem>
              </Grid>
            ))}
          </Stack>
          <Button width={'100%'}>Update</Button>
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
