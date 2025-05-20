/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@/context/ThemeProvider";
import Select from "react-select";
export const ReactSelector = (props: {
  field: any;
  options: { value: string | number; label: string }[];
  disable?: boolean;
  placeholder?: string;
  isMulti?: boolean;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  // Personaliza los colores según el modo
  const customTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: isDark ? "#374151" : "#f3f4f6", // hover option
      primary: isDark ? "#2563eb" : "#2563eb", // selected
      neutral0: isDark ? "#1f2937" : "#fff", // control background
      neutral80: isDark ? "#ececec" : "#1f2937", // text
      neutral20: isDark ? "#4b5563" : "#d1d5db", // border
      neutral30: isDark ? "#6b7280" : "#a1a1aa", // border hover
    },
  });
  const { options, disable, placeholder, isMulti, field } = props;
  return (
    <Select
      {...field}
      options={options}
      isDisabled={disable}
      placeholder={placeholder}
      isMulti={isMulti}
      className="w-full"
      classNamePrefix="react-select"
      theme={customTheme}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: "0.375rem",
          backgroundColor: isDark ? "#adadad16" : "transparent",
        }),
      }}
    />
  );
};
