import type { InputProps } from "../r-types";

const Input = ({
  label,
  error,
  className = "",
  type = "text",
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-[#4B5563]">
          {label}
        </label>
      )}

      <input
        type={type}
        className={`
          h-12
          w-full
          rounded-lg
          border
          border-[#D1D5DB]
          bg-white
          px-4
          text-base
          text-[#1F2937]
          placeholder:text-[#C5CAD5]
          outline-none
          transition-all
          duration-200
          focus:border-[#7489FF]
          focus:ring-2
          focus:ring-[#7489FF]/20
          disabled:cursor-not-allowed
          disabled:bg-gray-100
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;