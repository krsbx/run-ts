import _ from 'lodash';
import { useEffect, useState } from 'react';
import useSettingContext from './useContext/useSettingContext';
import useAppIpcEvent from './useAppIpcEvent';
import useDialogIpcEvent from './useDialogIpcEvent';
import useUtility from './useUtility';
import useFileContext from './useContext/useFileContext';

const useCompiler = (content: string, setValue?: ReactSetter<string>) => {
  const [result, setResult] = useState('');

  const { onOpen, setPackageToAdd } = useSettingContext();
  const { getAppDataPath } = useAppIpcEvent();
  const { showMessageDialogBox } = useDialogIpcEvent();
  const { codeIndex } = useFileContext();
  const { compileRun } = useUtility();

  useEffect(() => {
    if (_.isEmpty(content)) return;

    const timeout = setTimeout(async () => {
      const result = await compileRun(
        content,
        window.path.join(await getAppDataPath(), `.files-${codeIndex}.ts`),
        window.path.join(await getAppDataPath(), 'tsconfig.json')
      );

      if (_.isNil(result)) return;
      if (_.isObject(result)) {
        if ((result as { declaration: boolean }).declaration) {
          const error = result as {
            declaration: boolean;
            message: { declaration: string; module: string }[];
          };

          await showMessageDialogBox({
            title: 'Error',
            message: `Missing declarations files`,
            detail: `Please install the following packages from settings \n${_.map(
              error.message,
              (msg) => msg.declaration
            ).join(',')}`,
            type: 'error',
          });

          onOpen();

          setPackageToAdd(
            _.map(error.message, (msg) => msg.declaration).join(' ')
          );
        }

        return;
      }

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
