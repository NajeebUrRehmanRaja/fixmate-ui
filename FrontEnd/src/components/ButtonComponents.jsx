import React from "react";

const HandleButton = ({ className = "", childern, ...props }) => {
  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
      {...props}
    >
      {childern}
    </button>
  );
};

export default HandleButton;
