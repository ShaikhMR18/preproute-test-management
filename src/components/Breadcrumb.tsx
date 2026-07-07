import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  action?: React.ReactNode;
}

const Breadcrumb = ({ items, action }: BreadcrumbProps) => {
  

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center text-sm text-gray-500">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {item.path ? (
              <Link
                to={item.path}
                className="hover:text-[#7489FF] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-[#2E3446]">{item.label}</span>
            )}

            {index !== items.length - 1 && (
              <span className="mx-2 text-gray-300">/</span>
            )}
          </div>
        ))}
      </div>

      {action}
    </div>
  );
};

export default Breadcrumb;
