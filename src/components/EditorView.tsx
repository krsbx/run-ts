import React from 'react';
import _ from 'lodash';
import { Pane } from 'split-pane-react';
import { emacsStyleKeymap } from '@codemirror/commands';
import { keymap, KeyBinding } from '@codemirror/view';
import SplitPane from './SplitPane';
import Editor from './Editor';
import useAppContext from '../hooks/useAppContext';
import useCompiler from '../hooks/useCompiler';
import { readOnlyMode } from '../utils/editor/extensions';
import { chakraColor } from '../utils/theme';
import { EDITOR_THEME } from '../utils/constant/editor';
import useFileAction from '../hooks/useFileAction';

const EditorView = () => {
  const { sizes, setSizes, theme, userCode, setUserCode } = useAppContext();
  const { saveFile } = useFileAction();
  const codeResult = useCompiler(userCode);

  const keyBinding = keymap.of([
    {
      key: 'Mod-s',
      preventDefault: true,
      run: () => {
        if (!_.isEmpty(userCode)) saveFile();

        return true;
      },
    } as KeyBinding,
    ...emacsStyleKeymap,
  ]);

  return (
    <SplitPane
      split="vertical"
      sizes={sizes}
      onChange={setSizes}
      style={{ height: 'calc(100% - 30px)' }}
    >
      <Pane minSize={'20%'} maxSize={'80%'}>
        <Editor
          value={userCode}
          setValue={setUserCode}
          theme={EDITOR_THEME[theme].theme}
          fontSize={'22px'}
          height={'100%'}
          width={'100%'}
          borderRight={`2px solid ${chakraColor('gray', '800')}`}
          extensions={[keyBinding]}
        />
      </Pane>
      <Editor
        value={codeResult}
        theme={EDITOR_THEME[theme].theme}
        fontSize={'22px'}
        height={'100%'}
        width={'100%'}
        extensions={[readOnlyMode]}
      />
    </SplitPane>
  );
};

export default EditorView;
