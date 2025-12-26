'use client'
import React from 'react';
// import {
//     createEditorSystem,
//     boldExtension,
//     italicExtension,
//     underlineExtension,
//     listExtension,
//     imageExtension,
//     linkExtension,
//     historyExtension,
//     htmlExtension,
//     markdownExtension,
//     tableExtension,
//     codeExtension,
//     codeFormatExtension,
//     blockFormatExtension,
//     RichText,
//     defaultLexKitTheme,
// } from "@lexkit/editor";
// import "./advanced-editor.css";
//
// // 1. Define your extensions (as const for type safety)
// const extensions = [
//     boldExtension,
//     italicExtension,
//     underlineExtension,
//     listExtension,
//     imageExtension,
//     linkExtension.configure({ pasteListener: { insert: true, replace: true } }),
//     tableExtension,
//     codeExtension,
//     codeFormatExtension,
//     blockFormatExtension,
//     htmlExtension,
//     markdownExtension,
//     historyExtension,
// ] as const;

const { Provider, useEditor } = createEditorSystem<typeof extensions>()

const Page = () => {

    return (
        <div>

        </div>
    )
};

export default Page;