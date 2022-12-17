import { useEffect, useState } from 'react';
import useSettingContext from './useContext/useSettingContext';
import usePackageJsonReader from './usePackageJsonReader';

const usePackageComparator = () => {
  const { packageJson } = useSettingContext();
  const jsonReader = usePackageJsonReader();
  const [isHasChange, setIsHasChange] = useState(false);

  useEffect(() => {
    jsonReader().then((pkg) => {
      const isHasChange =
        Object.values(pkg.devDependencies ?? {}).length !==
        Object.values(packageJson ?? {}).length;

      setIsHasChange(isHasChange);
    });
  });

  return isHasChange;
};

export default usePackageComparator;
