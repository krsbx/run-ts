import { useCallback, useEffect, useState } from 'react';
import AutoInstaller from '../components/Modal/AutoInstaller';
import { APP_NAME } from '../utils/constant/global';
import useAppIpcEvent from './useAppIpcEvent';
import useSettingContext from './useContext/useSettingContext';
import useDialogIpcEvent from './useDialogIpcEvent';
import usePackageComparator from './usePackageComparator';
import usePackageJsonReader from './usePackageJsonReader';
import useUtility from './useUtility';

const useAutoInstaller = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setPackageJson } = useSettingContext();
  const { showMessageDialogBox } = useDialogIpcEvent();
  const { synchronizePackages } = useUtility();
  const { getAppDataPath } = useAppIpcEvent();
  const isHasChange = usePackageComparator();
  const jsonReader = usePackageJsonReader();

  const autoInstall = useCallback(async () => {
    setIsLoading(true);

    try {
      const dirPath = await getAppDataPath();

      await synchronizePackages(dirPath);

      setPackageJson(
        ((await jsonReader())['devDependencies'] ?? {}) as Record<
          string,
          string
        >
      );

      return;
    } catch {
      showMessageDialogBox({
        title: 'Error',
        message: `Failed to synchronize pacakges`,
        detail: `Please re-install the packages from ${APP_NAME}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isHasChange) return;

    showMessageDialogBox({
      title: 'Package Updated Externally',
      message: `Package is not updated from ${APP_NAME}`,
      detail:
        'It could lead to some kind of error while using the app. We recommend to re-synchronize the packages',
      type: 'info',
    }).then(autoInstall);
  }, [isHasChange]);

  if (!isLoading) return null;

  return <AutoInstaller isLoading={isLoading} />;
};

export default useAutoInstaller;
