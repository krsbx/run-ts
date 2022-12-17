import { useEffect, useState } from 'react';
import { APP_NAME } from '../utils/constant/global';
import useStorageIpcEvent from './useStorageIpcEvent';

const useJsonStorage = <T extends object>(
  storageKey: string,
  defaultValue: T,
  keyPrefix = `${APP_NAME}-`
): [T, ReactSetter<T>] => {
  const { getItem, setItem } = useStorageIpcEvent();

  const storedData = getItem(keyPrefix + storageKey) as T;
  const [value, setValue] = useState<T>(storedData ?? defaultValue);

  useEffect(() => {
    if (typeof value === 'undefined') return;

    setItem(keyPrefix + storageKey, value);
  }, [value, storageKey]);

  return [value, setValue];
};

export default useJsonStorage;
