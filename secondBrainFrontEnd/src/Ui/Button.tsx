import React, { ReactElement } from "react";

interface ButtonInterface {
  title: string;
  startIcon?: ReactElement;
  styleType?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void; 
}

const buttonStyles = {
  base: "flex items-center justify-center rounded-full font-medium transition-all duration-200",
  size: {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  },
  styleType: {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border border-black hover:bg-gray-100",
  },
};

const Button: React.FC<ButtonInterface> = ({ title, startIcon, styleType = "primary", size = "md", onClick }) => {
  return (
    <button
      onClick={onClick} 
      className={`
        ${buttonStyles.base} 
        ${buttonStyles.size[size]} 
        ${buttonStyles.styleType[styleType]}
      `}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {title}
    </button>
  );
};

export default Button;
