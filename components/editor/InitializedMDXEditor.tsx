"use client";

import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  CreateLink,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { basicDark } from "cm6-theme-basic-dark";
import { useTheme } from "next-themes";
import type { ForwardedRef } from "react";
import "./dark-editor.css";

type InitializedEditorProps = {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
  fieldChange: (value: string) => void;
} & MDXEditorProps;

const codeBlockLanguages = {
  css: "css",
  txt: "txt",
  sql: "sql",
  html: "html",
  saas: "sass",
  scss: "scss",
  bash: "bash",
  json: "json",
  js: "javascript",
  ts: "typescript",
  "": "unspecified",
  tsx: "TypeScript (React)",
  jsx: "Javascript (React)",
};

export default function InitializedMDXEditor({
  editorRef,
  fieldChange,
  ...props
}: InitializedEditorProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? basicDark : [];

  return (
    <MDXEditor
      key={resolvedTheme}
      ref={editorRef}
      className="grid border light-border-2 w-full background-light800_dark200 markdown-editor dark-editor"
      onChange={fieldChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
        codeMirrorPlugin({
          codeBlockLanguages,
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: [theme],
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />

                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
    />
  );
}
