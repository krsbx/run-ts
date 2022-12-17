import React, { useRef } from 'react';
import MonacoEditor, { EditorProps, Monaco } from '@monaco-editor/react';
import { Box, BoxProps } from '@chakra-ui/react';
import { editor, languages } from 'monaco-editor/esm/vs/editor/editor.api';
import { setupJavaScript, setupTypeScript } from '../utils/monaco/language';
import useEditorContext from '../hooks/useContext/useEditorContext';
import { defineTheme } from '../utils/monaco/definer';

const Editor = ({
  fontSize = 16,
  setValue,
  value,
  options = {},
  language = 'typescript',
  style,
  onMount: _onMount,
}: Props) => {
  const { monacosRef, theme } = useEditorContext();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const modelRef = useRef<editor.ITextModel | null>(null);
  const tsWorkerRef = useRef<languages.typescript.TypeScriptWorker>();
  const monacoRef = useRef<Monaco>();

  const onBeforeMount: EditorProps['beforeMount'] = (monaco) => {
    setupJavaScript(monaco);
    setupTypeScript(monaco);

    monacoRef.current = monaco;
  };

  const onMount: EditorProps['onMount'] = async (editor, monaco) => {
    _onMount?.(editor, monaco);

    editorRef.current = editor;
    modelRef.current = editor.getModel();

    if (!monacosRef.current) {
      monacosRef.current = [] as Monaco[];
      monacosRef.current.push(monaco);
    } else {
      monacosRef.current.push(monaco);
    }

    defineTheme(monaco, theme);

    if (!modelRef.current) return;

    const tsWorker = await monaco.languages.typescript.getTypeScriptWorker();
    tsWorkerRef.current = await tsWorker(modelRef.current.uri);
  };

  const onChange: EditorProps['onChange'] = (value) => {
    if (!value) return;

    setValue?.(value);
  };

  return (
    <Box width={'100%'} height={'100%'} {...style}>
      <MonacoEditor
        value={value}
        theme={theme}
        height={'100%'}
        width={'100%'}
        language={language}
        beforeMount={onBeforeMount}
        onMount={onMount}
        onChange={onChange}
        options={{
          fontSize,
          ...options,
        }}
      />
    </Box>
  );
};

type Props = {
  value: string;
  setValue?: (value: string) => void;
  fontSize?: number;
  onMount?: EditorProps['onMount'];
  language?: string;
  style?: BoxProps;
  options?: EditorProps['options'];
};

export default Editor;
