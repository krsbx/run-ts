import React, { createRef } from 'react';
import * as CSS from 'csstype';
import { ResponsiveValue } from '@chakra-ui/styled-system/dist';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { javascript, autoCloseTags } from '@codemirror/lang-javascript';
import { Box } from '@chakra-ui/react';

const Editor = ({
  fontSize = '16px',
  setValue,
  value,
  theme,
  width = '100%',
  height = '100%',
  borderLeft,
  borderRight,
  extensions = [],
}: Props) => {
  const codemirrorRef = createRef<ReactCodeMirrorRef>();

  const extraExt = EditorView.baseTheme({
    '&': {
      fontSize,
    },
    '.cm-gutters': {
      fontSize: '15px',
    },
  });

  return (
    <Box
      borderLeft={borderLeft}
      borderRight={borderRight}
      borderTop={'none'}
      borderBottom={'none'}
      width={'100%'}
      height={'100%'}
    >
      <CodeMirror
        value={value}
        theme={theme}
        height={'100%'}
        width={'100%'}
        extensions={[
          extraExt,
          javascript({ jsx: true, typescript: true }),
          autoCloseTags,
          ...extensions,
        ]}
        lang="javascript"
        style={{
          height,
          width,
        }}
        ref={codemirrorRef}
        onChange={setValue}
      />
    </Box>
  );
};

type Props = {
  value: string;
  setValue: ReactSetter<string>;
  theme: 'dark' | 'light' | Extension;
  fontSize?: string;
  width?: string;
  height?: string;
  borderLeft?: ResponsiveValue<CSS.Property.BorderLeft | number>;
  borderRight?: ResponsiveValue<CSS.Property.BorderLeft | number>;
  extensions?: Extension[];
};

export default Editor;
