import React from 'react';

declare module 'ReactSplitViews' {
  interface IProps {
    children?: React.ReactNode;
    style?: object;
    className?: string;
    onDragEnd?: any;
    gutterSize?: number;
    minSize?: number;
    sizes: any;
    direction?: string;
  }

  export declare function ReactSplitViews({
    children,
    style,
    className,
    onDragEnd,
    gutterSize,
    minSize,
    sizes,
    direction,
  }: IProps): JSX.Element;
}
