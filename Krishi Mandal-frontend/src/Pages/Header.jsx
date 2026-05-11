import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Check initial login status
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("loggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    // Check initial status
    checkLoginStatus();

    // Listen for custom login event
    window.addEventListener("loginStateChanged", checkLoginStatus);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false); // Close the menu as well
      }
    };

    // Add event listener for click outside
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("loginStateChanged", checkLoginStatus);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    navigate("/login");
    window.dispatchEvent(new Event("loginStateChanged"));
    alert("Logged out successfully.");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Community", path: "/community" },
    { name: "भू Mandal", path: "/bhooMandal" },
    { name: "Insights and Guidance", path: "/insights" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-green-700 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl md:text-4xl font-bold tracking-wide">
          KRISHI MANDAL
        </div>
        <nav className="hidden md:flex space-x-8 items-center text-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative hover:text-yellow-300 transition-colors duration-300 ${
                location.pathname === item.path
                  ? "text-yellow-300 font-bold"
                  : ""
              }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <span className="absolute bottom-0 left-0 h-1 bg-yellow-300 transition-all duration-300 ease-out block w-full"></span>
              )}
            </Link>
          ))}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 bg-yellow-300 text-green-700 px-4 py-2 rounded-md font-bold hover:bg-yellow-400"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <i className="fas fa-user-circle text-2xl"></i>
                <span>Profile</span>
              </button>
              {isDropdownOpen && (
                <div className="z-10 absolute right-0 mt-2 bg-white text-green-700 shadow-md rounded-md w-60">
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/profile");
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/orders");
                    }}
                  >
                    Orders
                  </button>
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/listings");
                    }}
                  >Listings
                    </button>
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/applications");
                    }}
                  >
                    My Applications
                  </button>
                  <button
                    className="block px-4 py-2 w-full text-left border-t-2 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                className="bg-yellow-300 text-green-700 px-4 py-2 rounded-md font-bold hover:bg-yellow-400"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Login/Signup
              </button>
              {isDropdownOpen && (
                <div className="z-10 absolute right-0 mt-2 bg-white text-green-700 shadow-md rounded-md w-60">
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-3xl focus:outline-none"
          aria-label="Toggle Menu"
          ref={menuRef}
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="bg-green-700 w-3/4 max-w-xs h-full p-6 shadow-lg">
            <nav className="space-y-6 text-xl">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block hover:text-yellow-300 transition-colors ${
                    location.pathname === item.path
                      ? "text-yellow-300 font-bold"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              {isLoggedIn ? (
                <div>
                  <button
                    className="w-full bg-yellow-300 text-green-700 px-4 py-2 rounded-md font-bold hover:bg-yellow-400 mb-2"
                    onClick={() => navigate("/profile")}
                  >
                    My Profile
                  </button>
                  <button
                    className="w-full bg-white text-green-700 px-4 py-2 rounded-md font-bold hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="w-full bg-yellow-300 text-green-700 px-4 py-2 rounded-md font-bold hover:bg-yellow-400 mb-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="w-full bg-white text-green-700 px-4 py-2 rounded-md font-bold hover:bg-gray-200"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          ></div>
        </div>
      )}
    </header>
  );
};

export default Header;
