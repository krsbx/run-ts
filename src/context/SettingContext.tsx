import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { LOCAL_STORAGE_KEY } from '../utils/constant/global';
import useJsonStorage from '../hooks/useJsonStorage';

type ContextProps = ReturnType<typeof useDisclosure> & {
  packageJson: Record<string, string>;
  setPackageJson: ReactSetter<Record<string, string>>;
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
  const [packageJson, setPackageJson] = useJsonStorage<Record<string, string>>(
    LOCAL_STORAGE_KEY.PACKAGE_JSON,
    {}
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

export default SettingContextProvider;
