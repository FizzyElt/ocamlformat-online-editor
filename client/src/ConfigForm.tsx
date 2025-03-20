import { Box, Stack } from "@chakra-ui/react";
import SelectField from "./components/select_field";
import { Config } from "./type";

interface ConfigFormProps {
  config: Config;
  onChange: (config: Config) => void;
}

const ConfigForm = (props: ConfigFormProps) => {
  const { config, onChange } = props;

  return (
    <Box p={4}>
      <Stack>
        <SelectField
          label="module_item_spacing"
          value={config.module_item_spacing}
          onChange={(value) =>
            onChange({
              ...config,
              module_item_spacing: value,
            })
          }
          options={["", "compact", "preserve", "sparse"]}
        />
      </Stack>
    </Box>
  );
};

export default ConfigForm;
