import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../utils/constant/global';
import { PackageJson } from 'type-fest';

type ContextProps = ReturnType<typeof useDisclosure> & {
  packageJson: PackageJson['devDependencies'];
  setPackageJson: ReactSetter<PackageJson['devDependencies']>;
  packageToAdd: string;
  setPackageToAdd: ReactSetter<string>;
};

export const SettingContext = React.createContext<ContextProps>(
  {} as ContextProps
);

const SettingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const settingsModal = useDisclosure();
  const [packageJson, setPackageJson] = useLocalStorage<
    PackageJson['devDependencies']
  >(LOCAL_STORAGE_KEY.PACKAGE_JSON, {});
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

export default SettingContextProvider;
