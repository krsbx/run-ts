import React from 'react';

declare global {
  type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;
}
