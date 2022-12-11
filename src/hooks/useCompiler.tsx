import { useEffect, useState } from 'react';
import { compiler } from '../utils/compiler';

const useCompiler = (userCode: string, setValue?: ReactSetter<string>) => {
  const [result, setResult] = useState('');

  useEffect(() => {
    if (userCode.trim() === '') return;

    const timeout = setTimeout(async () => {
      const result = await compiler(userCode);

      if (!result) return;

      setResult(result);
      setValue?.(result);
    }, 300);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [userCode]);

  return result;
};

export default useCompiler;
