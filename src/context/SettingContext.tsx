import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

type ContextProps = ReturnType<typeof useDisclosure> & {
  packageJson: Record<string, string>;
  setPackageJson: ReactSetter<Record<string, string>>;
  packageToAdd: string;
  setPackageToAdd: ReactSetter<string>;
};

const SettingContext = React.createContext<ContextProps>({} as ContextProps);

export default SettingContext;
