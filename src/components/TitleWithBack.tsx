import { useRouter } from "next/router";
import React from "react";

interface TitleWithBackProps {
  name: string | React.ReactNode;
}

const TitleWithBack: React.FC<TitleWithBackProps> = (props) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="mb-2 flex flex-row items-center space-x-2">
      <button onClick={handleBack} className="text-blue-700">
        &larr;
      </button>
      <span className="text-lg">{props.name}</span>
    </div>
  );
};

export default TitleWithBack;
