import { useState } from "react";
import Button from "./r-Buttton/Button";

interface PublishConfirmationProps {
  onCancel: () => void;
  onConfirm: () => void;
}

type PublishOption =
  | "always"
  | "1week"
  | "2weeks"
  | "3weeks"
  | "1month"
  | "custom";

const PublishConfirmation = ({
  onCancel,
  onConfirm,
}: PublishConfirmationProps) => {
  const [activeTab, setActiveTab] = useState<"publish" | "schedule">(
    "publish",
  );

  const [publishOption, setPublishOption] =
    useState<PublishOption>("custom");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const options = [
    { label: "Always Available", value: "always" },
    { label: "1 Week", value: "1week" },
    { label: "2 Weeks", value: "2weeks" },
    { label: "3 Weeks", value: "3weeks" },
    { label: "1 Month", value: "1month" },
    { label: "Custom Duration", value: "custom" },
  ];

  return (
    <div className="mt-4 mb-1">
      {/* Tabs */}
      <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
        <button
          type="button"
          onClick={() => setActiveTab("publish")}
          className={`rounded-md px-5 py-2 text-sm font-medium transition ${
            activeTab === "publish"
              ? "bg-[#F3F5FF] text-[#4F6EF7]"
              : "text-gray-500"
          }`}
        >
          Publish Now
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("schedule")}
          className={`rounded-md px-5 py-2 text-sm font-medium transition ${
            activeTab === "schedule"
              ? "bg-[#F3F5FF] text-[#4F6EF7]"
              : "text-gray-500"
          }`}
        >
          Schedule Publish
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-[#2E3446]">
          Live Until
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Choose how long this test should remain available on the platform.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-y-6">
          {options.map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                checked={publishOption === item.value}
                onChange={() =>
                  setPublishOption(item.value as PublishOption)
                }
                className="h-5 w-5 accent-[#6678FF]"
              />

              <span className="text-sm text-[#2E3446]">
                {item.label}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-4">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-12 rounded-lg border border-gray-300 px-4 outline-none focus:border-[#6678FF]"
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="h-12 rounded-lg border border-gray-300 px-4 outline-none focus:border-[#6678FF]"
          />
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishConfirmation;