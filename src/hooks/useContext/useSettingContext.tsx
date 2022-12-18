import { useContext } from 'react';
import SettingContext from '../../context/SettingContext';

const useSettingContext = () => useContext(SettingContext);

export default useSettingContext;
