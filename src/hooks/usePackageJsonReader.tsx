import { useCallback } from 'react';
import { PackageJson } from 'type-fest';
import useAppIpcEvent from './useAppIpcEvent';
import useReadWriteIpcEvent from './useReadWriteIpcEvent';

const usePackageJsonReader = () => {
  const { readJsonFile } = useReadWriteIpcEvent();
  const { getAppDataPath } = useAppIpcEvent();

  const packageJsonReader = useCallback(async () => {
    return readJsonFile(
      window.path.join(await getAppDataPath(), 'package.json')
    ) as Promise<PackageJson>;
  }, []);

  return packageJsonReader;
};

export default usePackageJsonReader;
