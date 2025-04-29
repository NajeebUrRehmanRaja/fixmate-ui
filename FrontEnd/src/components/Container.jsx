// src/components/Container.jsx
import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className={` mx-auto px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
