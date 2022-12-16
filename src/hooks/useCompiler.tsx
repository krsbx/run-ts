import _ from 'lodash';
import { useEffect, useState } from 'react';
import { compiler } from '../utils/compiler';
import useAppIpcEvent from './useAppIpcEvent';

const useCompiler = (content: string, setValue?: ReactSetter<string>) => {
  const [result, setResult] = useState('');

  const { getAppDataPath } = useAppIpcEvent();

  useEffect(() => {
    if (content.trim() === '') return;

    const timeout = setTimeout(async () => {
      const result = await compiler(
        content,
        window.path.join(getAppDataPath(), '.files.ts'),
        window.path.join(getAppDataPath(), 'tsconfig.json')
      );

      if (!result) return;

      setResult(result);
      setValue?.(result);
    }, 300);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [content]);

  return result;
};

export default useCompiler;
