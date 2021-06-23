/// <reference types="react-scripts" />

declare module 'react-reveal/Fade';
declare module 'react-reveal/Wobble';

declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}
declare module "*.svg" {
    const content: string;
    export = content;
}