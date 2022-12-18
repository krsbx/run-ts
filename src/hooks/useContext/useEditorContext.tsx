import { useContext } from 'react';
import EditorContext from '../../context/EditorContext';

const useEditorContext = () => useContext(EditorContext);

export default useEditorContext;
