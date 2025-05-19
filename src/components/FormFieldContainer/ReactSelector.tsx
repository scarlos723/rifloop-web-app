/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
export const ReactSelector = (props: {
  field: any;
  options: { value: string | number; label: string }[];
  disable?: boolean;
  placeholder?: string;
  isMulti?: boolean;
}) => {
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
    />
  );
};
