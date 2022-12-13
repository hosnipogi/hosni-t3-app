import React from "react";

interface SpinnerProps {
  size?: "sm" | "lg";
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  let size = "";
  switch (props.size) {
    case "sm": {
      size = "h-8 w-8";
      break;
    }
    default:
      size = "h-12 w-12";
  }

  return (
    <div className="flex items-center justify-center ">
      <div
        className={`${size} animate-spin rounded-full border-2 border-gray-900 border-b-transparent`}
      ></div>
    </div>
  );
};

export default Spinner;
