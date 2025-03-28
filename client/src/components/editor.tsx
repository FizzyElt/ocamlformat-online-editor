import { Box, BoxProps } from "@chakra-ui/react";

import { shikiToMonaco } from "@shikijs/monaco";
import * as monaco from "monaco-editor-core";
import { useEffect, useRef } from "react";
import { createHighlighter } from "shiki";

(async () => {
  // Create the highlighter, it can be reused
  const highlighter = await createHighlighter({
    themes: ["one-dark-pro", "one-light"],
    langs: ["ocaml"],
  });

  monaco.languages.register({ id: "ocaml" });

  shikiToMonaco(highlighter, monaco);
})();

interface EditorProps extends BoxProps {
  codeContent: string;
  triggerKey: number;
  onCodeChange: (code: string) => void;
}

const Editor = (props: EditorProps) => {
  const { codeContent, onCodeChange, triggerKey, ...restProps } = props;
  const boxRef = useRef(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);

  useEffect(() => {
    if (boxRef.current) {
      const editor = monaco.editor.create(boxRef.current, {
        value: codeContent,
        language: "ocaml",
        theme: "one-dark-pro",
        autoDetectHighContrast: false,
      });

      editor.onEndUpdate(() => {
        onCodeChange(editor.getValue());
      });

      editorRef.current = editor;
    }
  }, []);

  useEffect(() => {
    if (triggerKey) {
      editorRef.current?.setValue(codeContent);
    }
  }, [triggerKey]);

  return <Box {...restProps} ref={boxRef}></Box>;
};

export default Editor;
