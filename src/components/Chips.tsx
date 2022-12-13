import React, { useState } from "react";

interface ChipProps {
  text: string;
  onClick: () => void;
}

const Chip: React.FC<ChipProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    props.onClick();
    setIsActive(!isActive);
  };
  const className = `align-center ease flex w-max cursor-pointer rounded-full  px-4 py-2 text-sm font-semibold transition duration-300 active:bg-gray-300 ${
    isActive ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-500"
  }`;

  return (
    <span className={className} onClick={handleClick}>
      {props.text}
    </span>
  );
};

export default Chip;
