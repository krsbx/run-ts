import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import SettingContext from '../context/SettingContext';
import { LOCAL_STORAGE_KEY } from '../utils/constant/global';
import useJsonStorage from '../hooks/useJsonStorage';

const SettingProvider = ({ children }: { children: React.ReactNode }) => {
  const settingsModal = useDisclosure();
  const [packageJson, setPackageJson] = useJsonStorage<Record<string, string>>(
    LOCAL_STORAGE_KEY.PACKAGE_JSON
  );
  const [packageToAdd, setPackageToAdd] = useState<string>('');

  return (
    <SettingContext.Provider
      value={{
        ...settingsModal,
        packageJson,
        setPackageJson,
        packageToAdd,
        setPackageToAdd,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
