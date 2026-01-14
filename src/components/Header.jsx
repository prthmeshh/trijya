import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
    { to: '/authors', label: 'लेखक' },
    { to: '/about', label: 'About Us' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#8B0000] shadow-2xl border-b-4 border-[#D4AF37]">
      {/* Warli Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #D4AF37 10px, #D4AF37 12px)`
      }}></div>
      
      <nav className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <BookOpen className="w-10 h-10 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-[#D4AF37] opacity-20 blur-lg group-hover:opacity-40 transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#D4AF37] tracking-wide">त्रिज्या</h1>
              <p className="text-xs text-[#F5E6D3] opacity-80">Marathi Literary Journal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#F5E6D3] hover:text-[#D4AF37] font-semibold text-lg transition-all duration-300 hover:scale-110 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="शोधा..."
              className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-[#D4AF37]/30 text-white placeholder-[#F5E6D3]/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
            />
            <button
              type="submit"
              className="p-2 bg-[#D4AF37] hover:bg-[#B8941F] rounded-lg transition-all duration-300 hover:scale-110"
            >
              <Search className="w-5 h-5 text-[#8B0000]" />
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#D4AF37] hover:bg-white/10 rounded-lg transition-all"
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
              <div className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#F5E6D3] hover:text-[#D4AF37] font-semibold text-lg transition-all duration-300 hover:pl-2"
                  >
                    {link.label}
                  </Link>
                ))}
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