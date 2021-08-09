/// <reference types="react-scripts" />

declare module 'react-file-base64';
declare module 'styled-components';
declare module 'react-reveal/Fade';
declare module 'react-reveal/Zoom';
declare module 'react-reveal/Spin';
declare module 'react-reveal/Pulse';
declare module 'react-reveal/Slide';
declare module 'react-reveal/Rotate';
declare module 'react-datetime-picker';
declare module 'react-custom-scrollbars';


declare module '*.mp3';
declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}
declare module "*.svg" {
    const content: string;
    export = content;
}