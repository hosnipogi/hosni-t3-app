import React from "react";
import Spinner from "./Spinner";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: "default" | "success" | "error";
  isLoading?: boolean;
  title: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { color, title, isLoading, ...rest } = props;
    let theme;

    switch (color) {
      case "error": {
        theme =
          "bg-red-500 hover:bg-red-700 focus:bg-red-700 active:bg-red-800";
        break;
      }
      case "success": {
        theme =
          "bg-green-500 hover:bg-green-700 focus:bg-green-700 active:bg-green-800";
        break;
      }
      default: {
        theme =
          "bg-gradient-to-tr from-blue-400 to-blue-700 focus:bg-blue-700 active:bg-blue-800 hover:from-blue-500 hover:to-blue-800";
      }
    }

    if (props.disabled) {
      theme = "bg-gray-400";
    }

    const className =
      `inline-block min-h-12 px-6 py-2.5 text-white font-medium uppercase rounded-lg shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out ${theme} ${
        rest.className ?? ""
      }`.trim();

    return (
      <button
        ref={ref}
        {...{
          ...rest,
          className,
        }}
      >
        {isLoading ? <Spinner size="xs" theme="light" /> : title}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
