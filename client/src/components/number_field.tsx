import { Input, Field } from "@chakra-ui/react";

type NumberFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const NumberField = (props: NumberFieldProps) => {
  const { label, value, onChange } = props;

  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <Input
        size="xs"
        placeholder="Integer"
        value={value}
        onChange={(e) =>
          onChange(
            e.currentTarget.value
              .split("")
              .filter((i) => !isNaN(Number(i)))
              .join(""),
          )
        }
      />
    </Field.Root>
  );
};

export default NumberField;
