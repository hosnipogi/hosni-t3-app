import React from "react";
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

type InputProps<T extends FieldValues> = Props & UseControllerProps<T>;

const InputComponent = <T extends FieldValues>(props: InputProps<T>) => {
  const { control, name, defaultValue, rules, label, ...rest } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, defaultValue, rules });
  const className =
    `block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none h-16 rounded-md ${
      error ? "border-red-500" : "border-gray-300 focus:border-blue-600"
    } ${rest.disabled && "bg-gray-200"} ${rest.className ?? ""}`.trim();

  return (
    <div>
      {label && <label className="text-lg text-gray-600">{label}</label>}
      <input type="text" className={className} {...rest} {...field} />
      <p className="mt-1 h-6 text-red-500">{error?.message}</p>
    </div>
  );
};

export default InputComponent;
