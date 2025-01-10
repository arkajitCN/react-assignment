import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

const CustomTextField = ({ control, name, placeholder }: any) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input id="name" placeholder={placeholder} {...field} />}
    />
  );
};

export default CustomTextField;
