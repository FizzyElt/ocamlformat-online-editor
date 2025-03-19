import { Box, Text } from "@chakra-ui/react";
import Editor from "./components/editor";
import { useState } from "react";

function App() {
  const [content, setContent] = useState("");

  return (
    <Box>
      <Editor h="500px" codeContent={content} onCodeChange={setContent} />
    </Box>
  );
}

export default App;
