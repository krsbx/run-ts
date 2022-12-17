import React from 'react';
import _ from 'lodash';
import { Button, useDisclosure } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import useAppContext from '../../hooks/useAppContext';
import usePackageJsonReader from '../../hooks/usePackageJsonReader';
import Settings from '../Modal/Settings';

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
      <Settings isOpen={isOpen} onClose={onClose} packageJson={packageJson} />
    </React.Fragment>
  );
};

export default SettingsMenu;
