import React from "react";
import clsx from "clsx";

const HandleButton = ({ type = "button", variant = 'primary', className = "", childern, ...props }) => {
   const baseStyles = "px-4 py-2 rounded-md font-semibold text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
    const variantStyles = {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      danger: "bg-red-500 text-white hover:bg-red-600",
    }

    const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  return (
   
    <button
      type="{type}"
      className={clsx(
        baseStyles,
        variantStyles[variant],
        disabledStyles,
        className
      )}
      {...props}
      disabled={props.disabled}
    >
      {childern}
    </button>
  );
};

export default HandleButton;
