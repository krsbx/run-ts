import { autoCloseTags, javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';

export const readOnlyMode = EditorView.editable.of(false);

export const extensions = [
  javascript({ jsx: true, typescript: true }),
  autoCloseTags,
];
