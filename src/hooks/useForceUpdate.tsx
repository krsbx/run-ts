import { useState } from 'react';

const useForceUpdate = () => {
  const [value, setValue] = useState(false);

  const forceUpdate = () => setValue(!value);

  return forceUpdate;
};

export default useForceUpdate;
