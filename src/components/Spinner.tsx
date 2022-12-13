import React from "react";

interface SpinnerProps {
  size?: "xs" | "sm" | "lg";
  theme?: "light" | "dark";
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  let size = "";
  let theme = "";
  switch (props.size) {
    case "xs": {
      size = "h-4 w-4";
      break;
    }
    case "sm": {
      size = "h-8 w-8";
      break;
    }
    default:
      size = "h-12 w-12";
  }

  switch (props.theme) {
    case "light": {
      theme = "border-gray-100";
      break;
    }
    default:
      theme = "border-gray-900";
  }

  return (
    <div className="flex items-center justify-center ">
      <div
        className={`${size} ${theme} animate-spin rounded-full border-2  border-b-transparent`}
      ></div>
    </div>
  );
};

export default Spinner;
