/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl } from "../ui/form";
import { Textarea } from "../ui/textarea";

export const FieldTextArea = (props: { field: any; placeholder?: string }) => {
  const { field, placeholder } = props;
  return (
    <FormControl>
      <Textarea placeholder={placeholder} className="resize-none" {...field} />
    </FormControl>
  );
};
