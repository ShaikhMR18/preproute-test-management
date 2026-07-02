import type { StatusBadgeProps } from "../../types";

const statusStyles: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-700",
  published: "bg-green-100 text-green-700",
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const value = status?.toLowerCase() ?? "unknown";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${
        statusStyles[value] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status ?? "Unknown"}
    </span>
  );
};

export default StatusBadge;