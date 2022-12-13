import _ from 'lodash';
import { useEffect, useState } from 'react';
import { compiler } from '../utils/compiler';
import { APP_NAME } from '../utils/constant/global';
import useAppIpcEvent from './useAppIpcEvent';

const useCompiler = (
  userCode: string,
  userCodeImport: string,
  setValue?: ReactSetter<string>
) => {
  const [result, setResult] = useState('');

  const { getAppPath } = useAppIpcEvent();

  useEffect(() => {
    if (userCode.trim() === '') return;

    const { path } = window[APP_NAME];

    const timeout = setTimeout(async () => {
      let content = '';

      if (!_.isEmpty(userCodeImport)) {
        content += userCodeImport;
        content += '\n';
      }

      content += `(async () => {\n${userCode}\n})()`;

      const result = await compiler(
        content,
        path.join(getAppPath(), '.files.ts')
      );

      if (!result) return;

      setResult(result);
      setValue?.(result);
    }, 300);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [userCode, userCodeImport]);

  return result;
};

export default useCompiler;
