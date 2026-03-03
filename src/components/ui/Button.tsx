import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

export default function Button({ 
  children, 
  variant = "primary", 
  fullWidth = false,
  className = "", 
  ...props 
}: ButtonProps) {
  const baseClasses = "py-2.5 px-4 rounded-lg font-medium transition duration-200 shadow-md";
  
  const variantClasses = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-slate-600 text-white hover:bg-slate-700",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
