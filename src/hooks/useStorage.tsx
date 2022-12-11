import { useEffect, useState } from 'react';

const STORAGE_KEYS_PREFIX = 'RUN_TS_';

const useStorage =
  (storage: Storage, keyPrefix = STORAGE_KEYS_PREFIX) =>
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
