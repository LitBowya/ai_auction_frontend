import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiUsers, FiCalendar,
} from "react-icons/fi";
import {MdCategory, MdLibraryBooks, MdLocalShipping, MdOutlinePayments, MdReviews} from "react-icons/md";
import { useSelector } from "react-redux";
import {FaGavel} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const auth = useSelector((state) => state.auth);
  const user = auth?.user || {};

  const navItems = [
    // Core Dashboard
    { path: "/admin", name: "Dashboard", icon: <FiGrid size={20} />, exact: true },

    // Feature Routes
    { path: "/admin/artworks", name: "Artworks", icon: <MdLibraryBooks size={20} /> },
    { path: "/admin/auctions", name: "Auctions", icon: <FaGavel size={20} /> },
    { path: "/admin/audits", name: "Audits", icon: <FaGavel size={20} /> },
    { path: "/admin/categories", name: "Categories", icon: <MdCategory size={20} /> },
    { path: "/admin/orders", name: "Orders", icon: <FiCalendar size={20} /> },
    { path: "/admin/payments", name: "Payments", icon: <MdOutlinePayments size={20} /> },
    { path: "/admin/users", name: "Users", icon: <FiUsers size={20} /> },
  ];


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path) &&
      (path === "/" || location.pathname === path ||
        location.pathname.indexOf(`${path}/`) === 0 ||
        location.pathname.split("/")[2] === path.split("/")[2]);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed md:hidden z-50 top-4 left-4 p-2 rounded-lg bg-primary-dark text-white"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed z-40 h-screen transition-all duration-300 ease-in-out bg-secondary 
        ${isMobile
        ? `w-64 ${isOpen ? "translate-x-0" : "-translate-x-full"}`
        : collapsed
          ? "w-20"
          : "w-72"
      }
      `}>
        {/* Actual Sidebar */}
        <aside
          className={`
            h-full pt-4 shadow-xl rounded-xl overflow-hidden
            bg-primary-dark text-white flex flex-col
          `}
        >
          {/* User Profile Section */}
          <div className={`px-4 py-4 border-b border-white/10 ${collapsed ? "text-center" : ""}`}>
            <div className={`flex ${collapsed ? "flex-col items-center" : "items-center"}`}>
              <div className="relative">
                {user?.profileImage ? (
                  <div className={`w-[75px] h-[75px] rounded-full object-cover border-2 border-white/30`}>
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                ) : (
                  <div
                    className="w-12 h-12 rounded-full bg-primary-accent flex items-center justify-center border-2 border-white/30">
                    <FiUser className="text-white text-xl" />
                  </div>
                )}
                {!collapsed && (
                  <div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              {!collapsed && (
                <div className="ml-4 overflow-hidden">
                  <h3 className="font-medium text-primary truncate">
                    {user?.name || "User Name"}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">

                      <span className="text-xs px-2 py-0.5 bg-primary/10 rounded-full text-primary/80">
                        {user.phone}
                      </span>

                  </div>
                  <p className="text-xs text-primary/60 mt-1 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Toggle Button for Desktop */}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-primary-dark p-1 rounded-full border-2 border-white hover:bg-white hover:text-primary hover:cursor-pointer"
            >
              {collapsed ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
            </button>
          )}

          {/* Navigation Items */}
          <div className="overflow-y-auto flex-1 py-4 px-3">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.path, item.exact);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        relative flex items-center p-3 rounded-lg transition-colors
                        ${active
                        ? " font-bold bg-primary text-secondary"
                        : "text-primary hover:bg-primary hover:text-secondary hover:font-bold"
                      }
                        ${collapsed ? "justify-center" : ""}
                      `}
                      title={collapsed ? item.name : ""}
                    >
                      {/* Active indicator bar */}
                      {active && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-md"></div>
                      )}

                      <span className={`flex-shrink-0 ${active ? "text-white" : "text-primary/50"}`}>
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="ml-3 whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {/* Add padding to main content */}
      {!isMobile && !collapsed && (
        <div className="w-[calc(18rem+2rem)] flex-shrink-0"></div>
      )}
      {!isMobile && collapsed && (
        <div className="w-[calc(5rem+2rem)] flex-shrink-0"></div>
      )}
    </>
  );
};

export default Sidebar;
