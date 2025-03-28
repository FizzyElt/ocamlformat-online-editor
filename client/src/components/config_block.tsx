import { Box, Text, Clipboard, IconButton } from "@chakra-ui/react";

import { Config, selectList } from "../type";

interface ConfigBlockProps {
  config: Config;
}

const ConfigBlock = ({ config }: ConfigBlockProps) => {
  const configContent = selectList
    .map((item) => [item.label, config[item.label]])
    .filter(([_, value]) => value !== "")
    .map(
      ([key, value]) =>
        `${key.replaceAll("_", "-")}=${value.replaceAll("_", "-")}`,
    )
    .join("\n");

  return (
    <Box
      p={4}
      h="full"
      w="full"
      minH="full"
      rounded="sm"
      border="solid 1px"
      borderColor="gray.300"
      overflowY="scroll"
    >
      <Text color="gray.600" as="pre">
        {configContent}
      </Text>
      <Clipboard.Root pos="absolute" top="2" right="2" value={configContent}>
        <Clipboard.Trigger asChild>
          <IconButton variant="surface" size="xs">
            <Clipboard.Indicator />
          </IconButton>
        </Clipboard.Trigger>
      </Clipboard.Root>
    </Box>
  );
};

export default ConfigBlock;
