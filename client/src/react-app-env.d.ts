/// <reference types="react-scripts" />

declare module 'react-reveal/Fade';
declare module 'react-reveal/Pulse';
declare module 'react-reveal/Zoom';
declare module 'react-reveal/Slide';
declare module 'react-custom-scrollbars';

declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}
declare module "*.svg" {
    const content: string;
    export = content;
}