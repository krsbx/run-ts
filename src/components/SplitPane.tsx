import React from 'react';
import OriginalSplitPane from 'split-pane-react';

const SplitPane = (props: Props) => {
  // @ts-ignore
  return <OriginalSplitPane {...props} />;
};

type Props = Omit<
  Parameters<typeof OriginalSplitPane>[0],
  'children' | 'sashRender'
> & {
  children: React.ReactNode;
};

export default SplitPane;
