import { STORAGE_KEYS } from "../constants";
import { Bell, ChevronDownIcon, UserProfile } from "../assets";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../utils/toast";
import { LogOut } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = (): void => {
    localStorage.clear();
    setIsOpen(false);
    navigate("/login", { replace: true });
    showSuccess("Logged out successfully");
  };

  return (
    <header className="flex h-20 items-center justify-end border-b border-[#E5E7EB] bg-white px-8">
      <div className="flex items-center gap-4"   ref={dropdownRef}>
        <button className="items-center justify-center rounded-full border border-[#E5E7EB] transition hover:bg-gray-50 cursor-pointer">
          <Bell width={48} height={48} />
        </button>

        <button className="flex items-center gap-3 cursor-pointer ">
          <UserProfile width={46.08} height={46.08} />

          <div className="text-left">
            <h4 className="text-[16px] font-semibold text-[#374151] ">
              {user?.name}
            </h4>

            <p className="text-sm text-[#374151] capitalize">{user?.role}</p>
          </div>
          <span
            className="absolute right-3 top-4 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDownIcon width={24} height={24} />
          </span>
        </button>
        {isOpen && (
          <div
            className="absolute right-3 top-12 z-50 w-20 rounded-lg border border-gray-200 bg-white shadow-lg cursor-pointer"
            onClick={handleLogout}
          >
           <div className="flex items-center justify-center  px-2 py-2 gap-1 hover:bg-gray-100 ">
            <span
              className="block w-full  text-left text-sm cursor-pointer"
            >
              Logout
            </span>
             <LogOut size={25} />
            
           </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
