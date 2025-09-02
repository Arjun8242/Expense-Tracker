import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }
    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-[calc(100vh-61px)] bg-gradient-to-b from-gray-900 to-gray-800 
      text-gray-200 border-r border-gray-700 p-4 sticky top-[61px] z-20 shadow-xl 
      transition-all duration-300`}
    >
      {/* Collapse / Expand Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-shadow duration-200 hover:shadow-lg hover:shadow-green-500/40"
        >
          {isCollapsed ? <LuChevronRight /> : <LuChevronLeft />}
        </button>
      </div>

      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7 transition-opacity duration-300">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full ring-4 ring-primary shadow-lg object-cover"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white text-2xl font-bold shadow-lg">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <h5 className="text-lg font-semibold text-white">
            {user?.fullName || "User"}
          </h5>
          <p className="text-sm text-gray-400">@{user?.username || "username"}</p>
        </div>
      )}

      {/* Menu Items */}
      <div className="space-y-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] transition-all duration-200 py-3 px-3 rounded-xl 
              ${
                activeMenu === item.label
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-gray-700 hover:text-white text-gray-300 hover:shadow-lg hover:shadow-green-500/40"
              }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
