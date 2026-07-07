import type { Difficulty } from "../../types";
import DropDown from "../r-DropDown/DropDown";

export interface DropdownOption {
  label: string;
  value: string;
}

type QuestionSettingsProps = {
  difficulty: Difficulty | undefined;
  topic: string;
  subTopic: string;
  mediaUrl?: string;

  difficultyOptions: DropdownOption[];
  topicOptions: DropdownOption[];
  subTopicOptions: DropdownOption[];

  onDifficultyChange: (value: Difficulty) => void;
  onTopicChange: (value: string) => void;
  onSubTopicChange: (value: string) => void;
  onMediaUrlChange?: (value: string) => void;
};

const QuestionSettings = ({
  difficulty,
  topic,
  subTopic,
  mediaUrl = "",

  difficultyOptions,
  topicOptions,
  subTopicOptions,

  onDifficultyChange,
  onTopicChange,
  onSubTopicChange,
  onMediaUrlChange,
}: QuestionSettingsProps) => {
  return (
    <div className="mt-8 rounded-xl border border-[#E8ECF4] bg-white p-6">
      <h3 className="mb-6 text-lg font-semibold text-[#2E3446]">
        Question Settings
      </h3>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <DropDown
          label="Level of Difficulty"
          placeholder="Select from Drop-down"
          value={difficulty ?? ""}
          options={difficultyOptions}
          onChange={(value) => onDifficultyChange(value as Difficulty)}
        />

        <DropDown
          label="Topic"
          placeholder="Select from Drop-down"
          value={topic}
          options={topicOptions}
          onChange={(value) => onTopicChange(value as string)}
        />

        <DropDown
          label="Sub-topic"
          placeholder="Select from Drop-down"
          value={subTopic}
          options={subTopicOptions}
          onChange={(value) => onSubTopicChange(value as string)}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-[#2E3446]">
            Media URL (Optional)
          </label>

          <input
            type="text"
            value={mediaUrl}
            onChange={(e) => onMediaUrlChange?.(e.target.value)}
            placeholder="https://example.com/image.png"
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 outline-none focus:border-[#7489FF]"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionSettings;
