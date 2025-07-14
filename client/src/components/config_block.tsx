import { Box, Clipboard, IconButton, Stack, Text } from "@chakra-ui/react";

import { Config, selectList } from "../type";

interface ConfigBlockProps {
  config: Config;
}

const ConfigBlock = ({ config }: ConfigBlockProps) => {
  const configPair = selectList
    .map((item) => [item.label, config[item.label]])
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => [
      key.replaceAll("_", "-"),
      value.replaceAll("_", "-"),
    ]);

  const configContent = configPair
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  return (
    <Box
      p={4}
      h="full"
      w="full"
      minH="200px"
      rounded="sm"
      border="solid 1px"
      borderColor="gray.300"
      pos="relative"
    >
      <Stack gap={1}>
        {configPair.map(([key, value]) => (
          <Box as="p" key={key}>
            <Text fontSize="md" as="span" color="blue.500">
              {key}
            </Text>
            <Text fontSize="md" as="span" color="gray.600">
              =
            </Text>
            <Text fontSize="md" as="span" color="orange.600">
              {value}
            </Text>
          </Box>
        ))}
      </Stack>
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
