import { ChevronDown } from "lucide-react";
import { STORAGE_KEYS } from "../constants";
import { Bell, UserProfile } from "../assets";

const Header = () => {
  const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "{}");

  return (
    <header className="flex h-20 items-center justify-end border-b border-[#E5E7EB] bg-white px-8">
      <div className="flex items-center gap-4">
        <button className="items-center justify-center rounded-full border border-[#E5E7EB] transition hover:bg-gray-50">
          <Bell width={48} height={48} />
        </button>

        <button className="flex items-center gap-3 ">
          <UserProfile width={46.08} height={46.08} />

          <div className="text-left">
            <h4 className="text-[16px] font-semibold text-[#374151] ">
              {user?.name || "Alex Wando"}
            </h4>

            <p className="text-sm text-[#374151] capitalize">
              {user?.role || "Admin"}
            </p>
          </div>
          <span className="absolute right-3 top-5">
            <ChevronDown size={20} className="text-[#4B5563]" />
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
