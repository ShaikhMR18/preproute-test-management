import clsx from "clsx";

export interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (value: string) => void;
}

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
      {tabs.map((tab) => {
        const active = activeTab === tab.value;

        return (
          <button
            type="button"
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={clsx(
              "rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
              active
                ? "bg-[#F3F6FF] text-[#4F6EF7]"
                : "text-[#8C94A6] hover:text-[#4F6EF7]",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
