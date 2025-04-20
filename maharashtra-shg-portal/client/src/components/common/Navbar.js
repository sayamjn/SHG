import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaTable, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Toggle menu for mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu after navigation
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Check if route is active
  const isActive = (path) => {
    return location.pathname === path ? 'bg-primary-700' : '';
  };

  // Navbar links
  const navLinks = [
    { path: '/', text: t('navbar.home'), icon: <FaHome className="mr-2" /> },
    { path: '/about', text: t('navbar.about'), icon: <FaInfoCircle className="mr-2" /> },
    { path: '/details', text: t('navbar.details'), icon: <FaTable className="mr-2" /> },
    { path: '/schemes', text: t('navbar.schemes'), icon: <FaFileAlt className="mr-2" /> }
  ];

  return (
    <nav className="bg-primary-700 text-white">
      <div className="container-custom">
        <div className="flex justify-between items-center py-3">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden block p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md flex items-center hover:bg-primary-600 transition-colors ${isActive(
                  link.path
                )}`}
                onClick={closeMenu}
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:block">
            {isAuthenticated && (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-md flex items-center hover:bg-primary-600 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                {t('common.logout')}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${
            menuOpen ? 'block' : 'hidden'
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 flex items-center hover:bg-primary-600 ${isActive(
                  link.path
                )}`}
                onClick={closeMenu}
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="px-4 py-3 flex items-center text-left hover:bg-primary-600"
              >
                <FaSignOutAlt className="mr-2" />
                {t('common.logout')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;