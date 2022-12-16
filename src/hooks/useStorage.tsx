import { useEffect, useState } from 'react';
import { APP_NAME } from '../utils/constant/global';

const useStorage =
  (storage: Storage, keyPrefix = `${APP_NAME}-`) =>
  <T,>(storageKey: string, defaultValue: T): [T, ReactSetter<T>] => {
    const storedString = storage.getItem(keyPrefix + storageKey);
    let parsedObject = null;

    if (storedString !== null && typeof storedString !== 'undefined')
      parsedObject = JSON.parse(storedString);

    const [value, setValue] = useState<T>(parsedObject ?? defaultValue);

    useEffect(() => {
      if (!storage) return;
      if (typeof value === 'undefined') return;

      storage.setItem(keyPrefix + storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
  };

export default useStorage;
