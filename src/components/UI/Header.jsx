import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/homepage', label: 'Home' },
    { path: '/crypto-trading-mastery', label: 'Crypto Trading' },
    { path: '/success-stories', label: 'Success Stories' },
    { path: '/consultation-booking', label: 'Book Consultation' },
    { path: '/about', label: 'About' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/homepage" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
                <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:block">
                Sophia Cipher Wealth
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item?.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-3">
              <Link to="/contact">
                <Button variant="outline" size="default">
                  Contact
                </Button>
              </Link>
              <Link to="/consultation-booking">
                <Button variant="default" size="default" iconName="Calendar" iconPosition="left">
                  Schedule Call
                </Button>
              </Link>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
      <div
        className={`fixed top-16 right-0 bottom-0 z-30 w-64 bg-card border-l border-border shadow-xl transform transition-transform duration-300 ease-smooth lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              onClick={toggleMobileMenu}
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {item?.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border space-y-2">
            <Link to="/contact" onClick={toggleMobileMenu}>
              <Button variant="outline" size="default" fullWidth>
                Contact
              </Button>
            </Link>
            <Link to="/consultation-booking" onClick={toggleMobileMenu}>
              <Button variant="default" size="default" fullWidth iconName="Calendar" iconPosition="left">
                Schedule Call
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;