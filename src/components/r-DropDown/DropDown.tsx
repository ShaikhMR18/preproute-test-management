import { useEffect, useRef, useState } from "react";
import { ChevronDown, X, Check } from "lucide-react";
import clsx from "clsx";
import type { SelectProps } from "../r-types";

const DropDown = ({
  label,
  placeholder = "Choose from Drop-down",
  options,
  value,
  onChange,
  className,
  multiple = false,
  error,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const selectedValues = Array.isArray(value) ? value : [value];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (selected: string) => {
    if (!multiple) {
      onChange(selected);
      setOpen(false);
      return;
    }

    const exists = selectedValues.includes(selected);

    if (exists) {
      onChange(selectedValues.filter((v) => v !== selected));
    } else {
      onChange([...selectedValues, selected]);
    }
  };

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
        className={clsx(
          "min-h-12 w-full rounded-lg border border-[#D9DDE8] bg-white px-4 py-2 text-left",
          error && "border-red-500",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          {multiple ? (
            selectedValues.length ? (
              selectedValues.map((val) => {
                const option = options.find((o) => o.value === val);

                return (
                  <span
                    key={val}
                    className="flex items-center gap-1 rounded-full bg-[#EEF2FF] px-3 py-1 text-sm text-[#384EC7]"
                  >
                    {option?.label}

                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();

                        onChange(selectedValues.filter((v) => v !== val));
                      }}
                    />
                  </span>
                );
              })
            ) : (
              <span className="text-[#C5CAD5]">{placeholder}</span>
            )
          ) : (
            <span
              className={clsx(
                selectedValues[0] ? "text-[#2E3446]" : "text-[#C5CAD5]",
              )}
            >
              {options.find((o) => o.value === selectedValues[0])?.label ??
                placeholder}
            </span>
          )}
        </div>

        <ChevronDown
          size={18}
          className={clsx(
            "absolute right-4 top-13 -translate-y-1/2 transition-transform cursor-pointer",
            open && "rotate-180",
          )}
        />
      </button>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-[#E5E7EB] bg-white shadow-xl">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-center text-sm text-gray-500">
              No options to select
            </div>
          ) : (
            options.map((option) => {
              const active = selectedValues.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={clsx(
                    "flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[#F5F7FF]",
                    active && "bg-[#F5F7FF] text-[#384EC7]",
                  )}
                >
                  {option.label}

                  {active && <Check size={16} />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;
