import { Trash2 } from "lucide-react";
import type { OptionsSectionProps } from "../../types";

const OptionsSection = ({
  options,
  correctOption,
  onOptionChange,
  onCorrectOptionChange,
  onDeleteOption,
}: OptionsSectionProps) => {
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-sm font-medium text-[#2E3446]">
        Type the options below
      </h3>

      <div className="space-y-5">
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-4">
            <input
              type="radio"
              checked={correctOption === option.id}
              onChange={() => onCorrectOptionChange(option.id)}
              className="h-5 w-5 cursor-pointer accent-[#5B6CFF]"
            />

            <div className="relative flex-1">
              <input
                value={option.text}
                onChange={(e) => onOptionChange(option.id, e.target.value)}
                placeholder="Type Option here"
                className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 pr-12 text-sm outline-none transition focus:border-[#7489FF]"
              />

              <button
                type="button"
                onClick={() => onDeleteOption?.(option.id)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9CED8] hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsSection;
