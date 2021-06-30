import * as actionTypes from '../constants/actionTypes';
import useSound from 'use-sound';

import SwitchSFX from '../assets/sounds/Switch.mp3';

export const themeChange = (theme: any) => async (dispatch: Function) => {

    try {
        
        const [switchSound] = useSound(SwitchSFX, { volume: 1 });
        dispatch({ type: actionTypes.THEME, data: theme });
        switchSound();
    } catch (error) {
        
        console.log(error);
    }
}