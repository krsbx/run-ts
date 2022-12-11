import { EditorView } from '@codemirror/view';

export const readOnlyMode = EditorView.editable.of(false);
