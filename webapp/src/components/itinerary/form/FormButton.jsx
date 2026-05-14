import React from "react";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",

  secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",

  danger: "bg-red-600 text-white hover:bg-red-700",
};

const FormButton = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`cursor-pointer rounded-xl px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default FormButton;
