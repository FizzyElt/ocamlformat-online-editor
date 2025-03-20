import { Box, SimpleGrid, Button } from "@chakra-ui/react";
import Editor from "./components/editor";
import { useState } from "react";
import ConfigForm from "./ConfigForm";
import { Config } from "./type";

declare global {
  interface Window {
    format?: (conf: [string, string][], content: string) => string;
  }
}
function App() {
  const [content, setContent] = useState("");
  const [triggerKey, setTriggerKey] = useState(0);
  const [config, setConfig] = useState<Config>({ module_item_spacing: "" });

  return (
    <SimpleGrid columns={2}>
      <ConfigForm config={config} onChange={setConfig} />
      <Box>
        <Button
          onClick={() => {
            const configEntries = Object.entries(config).filter(
              ([_, value]) => value !== "",
            );
            if (window.format) {
              const result = window.format(configEntries, content);
              setContent(result);
              setTriggerKey(triggerKey + 1);
            }
          }}
        >
          format
        </Button>
        <Editor
          triggerKey={triggerKey}
          boxSizing="content-box"
          minH="600px"
          w="full"
          codeContent={content}
          onCodeChange={setContent}
        />
      </Box>
    </SimpleGrid>
  );
}

export default App;
