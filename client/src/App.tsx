import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Grid,
  GridItem,
  HStack,
  Link,
  Portal,
  Spacer,
  useDialog,
} from "@chakra-ui/react";
import { useState } from "react";
import ConfigForm from "./ConfigForm";
import ConfigBlock from "./components/config_block";
import Editor from "./components/editor";
import { Toaster, toaster } from "./components/ui/toaster";
import { Config, defaultConfig } from "./type";

function App() {
  const [content, setContent] = useState("");
  const [triggerKey, setTriggerKey] = useState(0);
  const [config, setConfig] = useState<Config>(defaultConfig);

  const dialog = useDialog();

  return (
    <>
      <Box w="100vw" h="100vh">
        <Grid
          gap={4}
          p={5}
          w="full"
          h="full"
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, 1fr)"
        >
          <GridItem colSpan={1} rowSpan={2} overflowY="scroll">
            <Box minH="full">
              <Flex
                mb={4}
                px={4}
                pos="sticky"
                top={0}
                bg="white"
                zIndex="sticky"
              >
                <Link
                  variant="underline"
                  href="https://github.com/FizzyElt/ocamlformat-online-editor"
                  target="_blank"
                >
                  Github
                </Link>
                <Spacer />
                <HStack>
                  <Button
                    size="xs"
                    colorPalette="teal"
                    onClick={() => dialog.setOpen(true)}
                  >
                    config
                  </Button>
                  <Button
                    size="xs"
                    colorPalette="blue"
                    onClick={() => {
                      const configEntries = Object.entries(config).filter(
                        ([_, value]) => value !== "",
                      );
                      if (window.ocamlFmt.format) {
                        try {
                          const result = window.ocamlFmt.format(
                            configEntries,
                            content,
                          );
                          console.log(result);
                          if (result !== null) {
                            setContent(result);
                            setTriggerKey(triggerKey + 1);
                            return;
                          }
                          toaster.dismiss();
                          toaster.create({
                            type: "error",
                            description: "format error",
                            duration: 1000,
                          });
                        } catch (e) {
                          toaster.dismiss();
                          toaster.create({
                            type: "error",
                            description: "format error",
                            duration: 1000,
                          });
                        }
                      }
                    }}
                  >
                    format
                  </Button>
                </HStack>
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
          {/* <GridItem colSpan={1} rowSpan={1} overflowY="auto" pos="relative">
            <ConfigBlock config={config} />
          </GridItem> */}
        </Grid>
      </Box>
      <Dialog.RootProvider
        value={dialog}
        placement="center"
        scrollBehavior="inside"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
              <Dialog.Header>
                <Dialog.Title>Config file</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <ConfigBlock config={config} />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
      <Toaster />
    </>
  );
}

export default App;
