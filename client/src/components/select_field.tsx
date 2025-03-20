import { NativeSelect, Field } from "@chakra-ui/react";

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const SelectField = (props: SelectFieldProps) => {
  const { label, value, options, onChange } = props;

  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        >
          {options.map((opt) => {
            return (
              <option key={opt === "" ? "empty" : opt} value={opt}>
                {opt === "" ? "--" : opt}
              </option>
            );
          })}
        </NativeSelect.Field>
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default SelectField;
