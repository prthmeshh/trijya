import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/works', label: 'साहित्य' },
    { to: '/about', label: 'आमच्याबद्दल' },
    { to: '/gallery', label: 'छायाचित्रे' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#8B0000] shadow-2xl border-b-4 border-[#D4AF37]">
      {/* Warli Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #D4AF37 10px, #D4AF37 12px)`
      }}></div>

      <nav className="container mx-auto px-4 py-2 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="त्रिज्या Home">
            <div className="relative">
              <img
                src="/images/trijya-logo.png"
                alt="त्रिज्या Logo"
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-full object-contain group-hover:scale-105 transition-transform duration-300 shadow-xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Responsive sizing for tablet (md) & desktop (lg/xl) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2.5 xl:gap-3 bg-black/25 px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full border border-[#D4AF37]/35 backdrop-blur-md shadow-lg shadow-black/20">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 md:px-3.5 lg:px-4 xl:px-5 py-1 lg:py-1.5 rounded-full font-bold text-sm md:text-base lg:text-xl xl:text-2xl tracking-wide transition-all duration-300 flex items-center gap-1 lg:gap-1.5 group select-none whitespace-nowrap ${
                    isActive
                      ? 'text-[#FFD700] bg-gradient-to-r from-[#8B0000]/95 to-[#5C0000]/95 border border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                      : 'text-[#F5E6D3] hover:text-[#FFD700] hover:bg-white/10 hover:border-[#D4AF37]/40 border border-transparent hover:scale-105'
                  }`}
                >
                  {isActive && (
                    <span className="text-[#D4AF37] text-[10px] lg:text-xs animate-pulse select-none">✦</span>
                  )}
                  <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-300 ${
                      isActive ? 'w-3/4 shadow-[0_0_6px_#D4AF37]' : 'w-0 group-hover:w-2/3'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="शोधा..."
              className="w-24 md:w-28 lg:w-40 xl:w-48 focus:w-36 lg:focus:w-52 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-[#D4AF37]/30 text-white placeholder-[#F5E6D3]/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all duration-300 text-xs lg:text-sm"
            />
            <button
              type="submit"
              className="p-1.5 lg:p-2 bg-[#D4AF37] hover:bg-[#B8941F] rounded-full transition-all duration-300 hover:scale-110 shadow-md"
              aria-label="शोधा"
            >
              <Search className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#8B0000]" />
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#D4AF37] hover:bg-white/10 rounded-lg transition-all"
            aria-label="मेनू उघडा"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-[#D4AF37]/30"
            >
              <div className="flex flex-col gap-2 mt-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-between border ${
                        isActive
                          ? 'text-[#FFD700] bg-black/40 border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                          : 'text-[#F5E6D3] hover:text-[#FFD700] hover:bg-white/10 border-transparent hover:border-[#D4AF37]/30'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="text-[#D4AF37] text-sm">✦</span>}
                    </Link>
                  );
                })}
                <form onSubmit={handleSearch} className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="शोधा..."
                    className="flex-1 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-[#D4AF37]/30 text-white placeholder-[#F5E6D3]/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#D4AF37] hover:bg-[#B8941F] rounded-lg transition-all"
                  >
                    <Search className="w-5 h-5 text-[#8B0000]" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;