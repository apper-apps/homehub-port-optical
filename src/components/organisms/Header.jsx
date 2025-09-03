import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import { getSavedProperties } from "@/utils/localStorage";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const savedCount = getSavedProperties().length;

  const handleSearch = (searchTerm) => {
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
  };

  const navigationItems = [
    { label: "Browse Properties", path: "/", icon: "Home" },
    { label: "Saved Properties", path: "/saved", icon: "Heart", badge: savedCount },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
              <ApperIcon name="Home" size={24} className="text-white" />
            </div>
            <div className="font-display font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HomeHub
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 hover:shadow-md relative"
              >
                <ApperIcon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/saved"
              className="relative p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <ApperIcon name="Heart" size={20} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 relative"
                >
                  <ApperIcon name={item.icon} size={18} />
                  <span className="font-medium">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-auto bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;