import { useEffect, useState } from 'react';
import useSettingContext from './useContext/useSettingContext';
import usePackageJsonReader from './usePackageJsonReader';

const usePackageComparator = () => {
  const { packageJson } = useSettingContext();
  const jsonReader = usePackageJsonReader();
  const [isHasChange, setIsHasChange] = useState(false);

  useEffect(() => {
    jsonReader().then((pkg) => {
      const newerDevDeop = Object.keys(pkg.devDependencies ?? {});
      const olderDevDep = Object.keys(packageJson ?? {});

      const isHasChange = newerDevDeop.length !== olderDevDep.length;

      setIsHasChange(isHasChange);
    });
  });

  return isHasChange;
};

export default usePackageComparator;
