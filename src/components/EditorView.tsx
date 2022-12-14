import React from 'react';
import _ from 'lodash';
import { Pane } from 'split-pane-react';
import { standardKeymap, historyKeymap } from '@codemirror/commands';
import { keymap, KeyBinding } from '@codemirror/view';
import SplitPane from './SplitPane';
import Editor from './Editor';
import useAppContext from '../hooks/useAppContext';
import { chakraColor } from '../utils/theme';
import { EDITOR_THEME } from '../utils/constant/editor';
import { extensions } from '../utils/editor/extensions';
import useFileAction from '../hooks/useFileAction';
import useUtility from '../hooks/useUtility';

const EditorView = () => {
  const { codeSizes, setCodeSizes, theme, filePath } = useAppContext();
  const { userCode, setUserCode, userCodeImport, setUserCodeImport } =
    useAppContext();
  const { saveFile, saveFileAs, openFile } = useFileAction();
  const { getFileDirPath } = useUtility();

  const keyBinding = keymap.of([
    {
      key: 'Mod-s',
      preventDefault: true,
      run: () => {
        saveFile();

        return true;
      },
    },
    {
      key: 'Mod-S',
      preventDefault: true,
      run: () => {
        saveFileAs(getFileDirPath(filePath));

        return true;
      },
    },
    {
      key: 'Mod-o',
      preventDefault: true,
      run: () => {
        openFile(undefined, getFileDirPath(filePath));

        return true;
      },
    },
    ...standardKeymap,
    ...historyKeymap,
  ] as KeyBinding[]);

  return (
    <SplitPane
      split="horizontal"
      sizes={codeSizes}
      onChange={setCodeSizes}
      style={{ height: '100%' }}
    >
      <Editor
        value={userCodeImport}
        setValue={setUserCodeImport}
        theme={EDITOR_THEME[theme].theme}
        fontSize={'22px'}
        height={'100%'}
        width={'100%'}
        style={{
          borderRight: `2px solid ${chakraColor('gray', '700')}`,
        }}
        extensions={[extensions, keyBinding]}
      />
      <Pane minSize={'20%'} maxSize={'90%'}>
        <Editor
          value={userCode}
          setValue={setUserCode}
          theme={EDITOR_THEME[theme].theme}
          fontSize={'22px'}
          height={'100%'}
          width={'100%'}
          style={{
            borderRight: `2px solid ${chakraColor('gray', '700')}`,
            borderTop: `2px solid ${chakraColor('gray', '700')}`,
          }}
          extensions={[extensions, keyBinding]}
        />
      </Pane>
    </SplitPane>
  );
};

export default EditorView;
