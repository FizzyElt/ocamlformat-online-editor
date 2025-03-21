import { Box, SimpleGrid } from "@chakra-ui/react";
import SelectField from "./components/select_field";
import { Config, selectList } from "./type";

interface ConfigFormProps {
  config: Config;
  onChange: (config: Config) => void;
}

const ConfigForm = (props: ConfigFormProps) => {
  const { config, onChange } = props;

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap={4}>
        {selectList.map((item) => {
          if (item.valueType === "str") {
            return (
              <SelectField
                key={item.label}
                label={item.label}
                value={config[item.label]}
                onChange={(value) =>
                  onChange({
                    ...config,
                    [item.label]: value,
                  })
                }
                options={item.options}
              />
            );
          }
          return null;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default ConfigForm;
