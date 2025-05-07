import React from "react";
import { Icons } from "react-toastify";

const Button = ({
  type = "button",
  variant = "primary",
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  let variantStyles = "";

  switch (variant) {
    case "primary":
      variantStyles =
        "bg-transparent  text-white font-bold py-1 px-2 rounded-full transition duration-300 ease-in-out cursor-pointer";
      break;
    case "secondary":
      variantStyles = "bg-gray-300 text-black hover:bg-gray-400 cursor-pointer";
      break;
    case "danger":
      variantStyles = "bg-red-600 text-white hover:bg-red-700 cursor-pointer";
      break;
    default:
      variantStyles = "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer";
      break;
  }

  const baseStyles = `p rounded-lg font-semibold transition duration-200 ${variantStyles} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {children}
    </button>
  );
};

export default Button;
