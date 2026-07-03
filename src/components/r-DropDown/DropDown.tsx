import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import type { SelectProps } from "../r-types";
const DropDown = ({
  label,
  placeholder = "Choose from Drop-down",
  options,
  value,
  onChange,
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((item) => item.value === value);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={clsx("relative w-full", className)} ref={ref}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-[#2E3446]">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-lg border border-[#D9DDE8] bg-white px-4 text-left"
      >
        <span
          className={clsx(selectedOption ? "text-[#2E3446]" : "text-[#C5CAD5]")}
        >
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={clsx("transition-transform cursor-pointer", open && "rotate-180 ")}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-lg border border-[#E5E7EB] bg-white shadow-xl ">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={clsx(
                "w-full px-4 py-3 text-left hover:bg-[#F5F7FF]",
                value === option.value && "bg-[#F5F7FF] text-[#384EC7]",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
