import { NavLink, useNavigate } from "react-router-dom";

import {
  DashBoardIcon,
  Logo,
  TestCreationIcon,
  TestTrackingIcon,
} from "../../assets";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Test Creation",
    path: "/tests/create",
  },
  {
    name: "Test Tracking",
    path: "/tracking",
  },
];

const Sidebar = () => {
  const navigate= useNavigate();
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-gray-100 px-6 py-6 cursor-pointer" onClick={() => navigate("/")}>
        <Logo width={140} height={30} />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            return (
              <li key={item.path}>
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <div
                      className={`relative flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200
                      ${
                       isActive
                       ? "bg-[#EEF3FF] text-[#384EC7]"
                        : "text-[#6B7180] hover:bg-gray-100 hover:text-[#384EC7]"
                    }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-1.5 rounded-l-[22px] bg-[#384EC7] hover:text-[#384EC7]" />
                      )}

                      {item.name === "Dashboard" ? (
                        <DashBoardIcon
                          width={20}
                          height={20}
                         
                        />
                      ) : item.name === "Test Creation" ? (
                        <TestCreationIcon
                          width={20}
                          height={20}
                          
                        />
                      ) :  (
                        <TestTrackingIcon
                          width={20}
                          height={20}
                          color={isActive ? "#384EC7" : "#6B7180"}
                        />
                      )}

                      <span className="text-base font-medium">{item.name}</span>
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
