import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Appicon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    services: [
      { path: '/crypto-trading-mastery', label: 'Crypto Trading' },
      { path: '/consultation-booking', label: 'Investment Consultation' },
      { path: '/success-stories', label: 'Success Stories' },
    ],
    company: [
      { path: '/about', label: 'About Us' },
      { path: '/contact', label: 'Contact' },
    ],
    resources: [
      { path: '/homepage', label: 'Market Insights' },
      { path: '/homepage', label: 'Investment Guides' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link to="/homepage" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
                <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-foreground">
                CryptoRealty Pro
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm">
              Where Digital Innovation Meets Tangible Assets. Expert guidance in cryptocurrency trading and real estate investment for sophisticated wealth diversification.
            </p>
            <div className="flex space-x-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks?.services?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks?.company?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks?.resources?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {2024} Sophia Cipher Wealth. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/homepage"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/homepage"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/homepage"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;