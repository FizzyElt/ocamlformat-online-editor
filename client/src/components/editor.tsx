import { Box, BoxProps } from "@chakra-ui/react";

import { shikiToMonaco } from "@shikijs/monaco";
import * as monaco from "monaco-editor-core";
import { useEffect, useRef } from "react";
import { createHighlighter } from "shiki";

// Create the highlighter, it can be reused
const highlighter = await createHighlighter({
  themes: ["vitesse-dark", "vitesse-light"],
  langs: ["javascript", "typescript", "ocaml"],
});

monaco.languages.register({ id: "javascript" });
monaco.languages.register({ id: "typescript" });
monaco.languages.register({ id: "ocaml" });

shikiToMonaco(highlighter, monaco);

interface EditorProps extends BoxProps {
  codeContent: string;
  onCodeChange: (code: string) => void;
}

const Editor = (props: EditorProps) => {
  const { codeContent, onCodeChange, ...restProps } = props;
  const boxRef = useRef(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);

  useEffect(() => {
    if (boxRef.current) {
      const editor = monaco.editor.create(boxRef.current, {
        value: codeContent,
        language: "ocaml",
        theme: "vitesse-dark",
      });

      editor.onEndUpdate(() => {
        onCodeChange(editor.getValue());
      });

      editorRef.current = editor;
    }
  }, []);

  return (
    <Box {...restProps} h="500px">
      <div ref={boxRef} style={{ height: "500px" }}></div>
    </Box>
  );
};

export default Editor;
