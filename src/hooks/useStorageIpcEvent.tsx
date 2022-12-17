import { useCallback } from 'react';
import { STORAGE } from '../utils/constant/ipc';

const useStorageIpcEvent = () => {
  const getItem = useCallback((key: string) => {
    try {
      const result = window.ipcRenderer.sendSync(
        STORAGE.GET_ITEM,
        key
      ) as string;

      return JSON.parse(result ?? {});
    } catch {
      return {};
    }
  }, []);

  const setItem = useCallback((key: string, value: object) => {
    return window.ipcRenderer.invoke(
      STORAGE.SET_ITEM,
      key,
      JSON.stringify(value)
    ) as Promise<void>;
  }, []);

  return {
    getItem,
    setItem,
  };
};

export default useStorageIpcEvent;
