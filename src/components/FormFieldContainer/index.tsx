/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { UseFormReturn } from "react-hook-form";

import { Input } from "../ui/input";
import { CurrencyInput } from "./CurrencyInput";
import { CustomDatePicker } from "./CustomDataPicker";
import { FieldTextArea } from "./FieldTextArea";
import { ReactSelector } from "./ReactSelector";
type FormFieldContainerProps = {
  form: UseFormReturn<any>;
  placeholder?: string;
  label?: string;
  disable?: boolean;
  name: string;
  readOnly?: boolean;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date_picker"
    | "tel"
    | "textarea"
    | "currency"
    | "react-select";

  description?: string;
  isMulti?: boolean;
  options?: { value: string | number; label: string }[];
};

export const BasicInput = (props: {
  field: any;
  placeholder?: string;
  type: "text" | "email" | "password" | "number" | "date_picker" | "tel";
  readOnly?: boolean;
}) => {
  const { field, placeholder, type, readOnly } = props;
  return (
    <FormControl>
      <Input
        placeholder={placeholder}
        type={type}
        {...field}
        readOnly={readOnly}
      />
    </FormControl>
  );
};

const isBasicInput = (type: string) => {
  const value =
    type === "text" ||
    type === "email" ||
    type === "password" ||
    type === "number" ||
    type === "tel";
  return value;
};

export const FormFieldContainer = (props: FormFieldContainerProps) => {
  const {
    form,
    name,
    type,
    label,
    placeholder,
    description,
    disable,
    options,
    isMulti,
    readOnly,
  } = props;
  return (
    <FormField
      disabled={disable}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          {isBasicInput(type) && (
            <BasicInput
              field={field}
              placeholder={placeholder}
              type={type}
              readOnly={readOnly}
            />
          )}
          {type === "date_picker" && (
            <CustomDatePicker field={field} placeholder={placeholder} />
          )}
          {type === "textarea" && (
            <FieldTextArea field={field} placeholder={placeholder} />
          )}
          {type === "currency" && (
            <CurrencyInput field={field} placeholder={placeholder} />
          )}
          {type === "react-select" && (
            <ReactSelector
              field={field}
              placeholder={placeholder}
              options={options ?? []}
              isMulti={isMulti}
            />
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
