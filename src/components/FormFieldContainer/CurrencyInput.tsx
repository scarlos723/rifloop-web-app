/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export const CurrencyInput = (props: { field: any; placeholder?: string }) => {
  const { field, placeholder } = props;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    const formattedValue = new Intl.NumberFormat("es-Co").format(
      parseInt(rawValue || "0", 10)
    );
    field.onChange(formattedValue);
  };
  return (
    <FormControl>
      <Input
        placeholder={placeholder}
        type={"text"}
        {...field}
        onChange={onChange}
        className="appearance-none text-right"
      />
    </FormControl>
  );
};
