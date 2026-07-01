import type { InputHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}


export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}


export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  direction?: "row" | "column";
  className?: string;
}