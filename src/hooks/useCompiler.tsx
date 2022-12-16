import _ from 'lodash';
import { useEffect, useState } from 'react';
import useAppIpcEvent from './useAppIpcEvent';
import useUtility from './useUtility';

const useCompiler = (content: string, setValue?: ReactSetter<string>) => {
  const [result, setResult] = useState('');

  const { getAppDataPath } = useAppIpcEvent();
  const { compileRun } = useUtility();

  useEffect(() => {
    if (content.trim() === '') return;

    const timeout = setTimeout(async () => {
      const result: string | undefined = await compileRun(
        content,
        window.path.join(await getAppDataPath(), '.files.ts'),
        window.path.join(await getAppDataPath(), 'tsconfig.json')
      );

      if (_.isNil(result)) return;

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
