import { Field, Input } from "@chakra-ui/react";

type NumberFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

const NumberField = (props: NumberFieldProps): React.ReactNode => {
    const { label, value, onChange } = props;

    return (
        <Field.Root>
            <Field.Label fontSize="lg">{label}</Field.Label>
            <Input
                size="lg"
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
