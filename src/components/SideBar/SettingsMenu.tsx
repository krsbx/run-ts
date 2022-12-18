import React from 'react';
import _ from 'lodash';
import { Button } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import useSettingContext from '../../hooks/useContext/useSettingContext';
import usePackageJsonReader from '../../hooks/usePackageJsonReader';
import Settings from '../Modal/Settings';

const SettingsMenu = () => {
  const { packageJson, setPackageJson } = useSettingContext();
  const { isOpen, onClose, onOpen } = useSettingContext();
  const jsonReader = usePackageJsonReader();

  const showModal = async () => {
    try {
      const pkgJson = await jsonReader();

      setPackageJson(
        (pkgJson?.devDependencies ?? {}) as Record<string, string>
      );

      onOpen();
    } catch {
      setPackageJson({});
    }
  };

  return (
    <React.Fragment>
      <Button variant={'main'} onClick={() => showModal()}>
        <FiSettings size={'25px'} />
      </Button>
      <Settings isOpen={isOpen} onClose={onClose} packageJson={packageJson} />
    </React.Fragment>
  );
};

export default SettingsMenu;
