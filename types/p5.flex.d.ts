/*!
 * p5.flex
 * Version: 0.0.0
 * Author: Zaron Chen
 * License: MIT
 *
 * Copyright (c) 2023 Zaron Chen
 */
declare const RESET_BOX_MODEL: "padding: 0; margin: 0; border: 0;";
declare const FULL_SIZE: "width: 100%; height: 100%;";
declare const FLEX_CENTER: "display: flex; justify-content: center; align-items: center;";
declare const BORDER_BOX: "box-sizing: border-box;";
declare const STATIC: "position: static;";
declare const HIDDEN: "overflow: hidden;";
declare const BLOCK: "display: block;";
declare namespace __p5flexStyle__ {
    function pageCSS(): void;
    function containerCSS(container: any, OPTIONS: any): void;
    function canvasScaleCSS(OPTIONS: any): string;
    function innerContainerCSS(innerContainer: any, OPTIONS: any): void;
    function canvasCSS(canvas: any, OPTIONS: any): void;
}
declare namespace DEFAULT_OPTIONS {
    namespace container {
        let id: any;
        let parent: any;
        let width: string;
        let height: string;
        let margin: string;
        let padding: string;
        let border: string;
        let customBoxModel: boolean;
    }
    namespace canvas {
        let scale: number;
        let fit: string;
    }
    let stylePage: boolean;
}
declare function mergeOptions(defaultOpts: any, userOpts: any): any;
declare function p5flex(canvas: any, options: any): void;
declare function mountFlex(p5: any): void;
