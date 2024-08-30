import React from "react";

interface ContainerProps {
  children: React.ReactElement;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto">
      <div className="lg:pt-24 lg:pl-80 pt-20">{children}</div>
    </div>
  );
};

export default Container;
