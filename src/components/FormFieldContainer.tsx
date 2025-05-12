/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
type FormFieldContainerProps = {
  form: UseFormReturn<any>;
  placeholder?: string;
  label?: string;
  name: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date_picker"
    | "tel"
    | "textarea"
    | "currency";
  description?: string;
};
const CustomDatePicker = (props: { field: any }) => {
  const { field } = props;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date < new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const CurrencyInput = (props: { field: any; placeholder?: string }) => {
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

export const BasicInput = (props: {
  field: any;
  placeholder?: string;
  type: "text" | "email" | "password" | "number" | "date_picker" | "tel";
}) => {
  const { field, placeholder, type } = props;
  return (
    <FormControl>
      <Input placeholder={placeholder} type={type} {...field} />
    </FormControl>
  );
};
export const TextArea = (props: { field: any; placeholder?: string }) => {
  const { field, placeholder } = props;
  return (
    <FormControl>
      <Textarea placeholder={placeholder} className="resize-none" {...field} />
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
  const { form, name, type, label, placeholder, description } = props;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          {isBasicInput(type) && (
            <BasicInput field={field} placeholder={placeholder} type={type} />
          )}
          {type === "date_picker" && <CustomDatePicker field={field} />}
          {type === "textarea" && (
            <TextArea field={field} placeholder={placeholder} />
          )}
          {type === "currency" && (
            <CurrencyInput field={field} placeholder={placeholder} />
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
