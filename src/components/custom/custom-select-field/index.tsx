import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlowCreationFormValues } from "@/validations/form-schema";
import { Control, Controller, FieldValues } from "react-hook-form";

// type TCustomTextFieldProps<T> = {
//   name: keyof T;
//   control: Control<FlowCreationFormValues>;
//   options: Array<{ value: string; label: string }>;
//   placeholder: string;
// };

const CustomSelectField = ({
  name,
  control,
  options,
  placeholder = "Select...",
}: any) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger id={name as string}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map(({ value, label }: any) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default CustomSelectField;
