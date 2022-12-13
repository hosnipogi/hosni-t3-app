import React from "react";

type MainComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Main: React.FC<MainComponentProps> = (props) => {
  const className = `border-2 border-gray-500 rounded-xl ${
    props.className ?? ""
  }`.trim();
  return <div {...{ ...props, className }} />;
};

export default Main;
