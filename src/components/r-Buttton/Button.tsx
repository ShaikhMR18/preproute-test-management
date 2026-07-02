import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const buttonVariants = {
  primary:
    "bg-[#7489FF] text-white hover:bg-[#657BFF] active:bg-[#5A70F5]",

  secondary:
    "bg-[#F8FAFF] text-[#384EC7] border border-[#D9E2FF] hover:bg-[#EEF3FF]",

  danger:
    "bg-[#FF7F7F] text-white hover:bg-[#FF6B6B] active:bg-[#F85C5C]",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "cursor-pointer",
        "px-5", 
        "py-2.5",                 
        "rounded-lg",            
        "text-sm",             
        "font-medium",           
        "font-inter",
        "transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-[#7489FF] focus:ring-offset-2",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        buttonVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;