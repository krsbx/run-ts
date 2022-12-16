import { useEffect, useState } from 'react';
import useAppContext from './useAppContext';
import usePackageJsonReader from './usePackageJsonReader';

const usePackageComparator = () => {
  const { packageJson } = useAppContext();
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
