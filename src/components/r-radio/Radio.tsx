import type { RadioProps } from "../r-types";

const Radio = ({
  name,
  options,
  value,
  onChange,
  direction = "column",
  className = "",
  ...props
}: RadioProps) => {
  return (
    <div
      className={`flex ${
        direction === "row"
          ? "flex-row gap-6"
          : "flex-col gap-5"
      } ${className}`}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-4"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="h-5 w-5 cursor-pointer accent-[#7489FF]"
            {...props}
          />

          <span className="text-base font-normal text-[#374151]">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default Radio;