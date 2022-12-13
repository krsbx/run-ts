import React, { createRef } from 'react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { javascript, autoCloseTags } from '@codemirror/lang-javascript';
import { Box, BoxProps } from '@chakra-ui/react';

const Editor = ({
  fontSize = '16px',
  setValue,
  value,
  theme,
  width = '100%',
  height = '100%',
  extensions = [],
  style,
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
    <Box width={'100%'} height={'100%'} {...style}>
      <CodeMirror
        value={value}
        theme={theme}
        height={'100%'}
        width={'100%'}
        basicSetup={{
          defaultKeymap: false,
        }}
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
  setValue?: ReactSetter<string>;
  theme: 'dark' | 'light' | Extension;
  fontSize?: string;
  width?: string;
  height?: string;
  style?: BoxProps;
  extensions?: Extension[];
};

export default Editor;
