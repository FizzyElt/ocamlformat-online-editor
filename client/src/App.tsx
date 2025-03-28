import {
  Flex,
  Spacer,
  Box,
  Button,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";
import Editor from "./components/editor";
import { useState } from "react";
import ConfigForm from "./ConfigForm";
import { Config, defaultConfig } from "./type";
import ConfigBlock from "./components/config_block";

if (!import.meta.env.DEV) {
  // @ts-ignore
  import("./main.bc.js").then(() => console.log("load success"));
}

declare global {
  interface Window {
    format?: (conf: [string, string][], content: string) => string;
  }
}
function App() {
  const [content, setContent] = useState("");
  const [triggerKey, setTriggerKey] = useState(0);
  const [config, setConfig] = useState<Config>(defaultConfig);

  return (
    <Box w="100vw" h="100vh">
      <Grid
        gap={4}
        p={5}
        w="full"
        h="full"
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
      >
        <GridItem colSpan={1} rowSpan={1} overflowY="scroll">
          <Box minH="full">
            <Flex mb={4} px={4} pos="sticky" top={0} bg="white" zIndex="sticky">
              <Link
                variant="underline"
                href="https://github.com/FizzyElt/ocamlformat-online-editor"
                target="_blank"
              >
                Github
              </Link>
              <Spacer />
              <Button
                size="xs"
                colorPalette="blue"
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
            </Flex>
            <ConfigForm config={config} onChange={setConfig} />
          </Box>
        </GridItem>
        <GridItem colSpan={1} rowSpan={2}>
          <Box h="full">
            <Editor
              triggerKey={triggerKey}
              boxSizing="content-box"
              h="full"
              w="full"
              codeContent={content}
              onCodeChange={setContent}
            />
          </Box>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} overflowY="auto" pos="relative">
          <ConfigBlock config={config} />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default App;
