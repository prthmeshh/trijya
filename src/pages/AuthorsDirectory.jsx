import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Feather } from 'lucide-react';
import { authors } from "../data/sampleData";
import AnimatedBackground from "../components/AnimatedBackground";


const AuthorsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');

  const specializations = ['All', ...new Set(authors.map(a => a.specialization.split(', ')).flat())];

  const filteredAuthors = useMemo(() => {
    return authors.filter(author => {
      const matchesSearch = author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          author.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialization = selectedSpecialization === 'All' ||
                                   author.specialization.includes(selectedSpecialization);
      
      return matchesSearch && matchesSpecialization;
    });
  }, [searchQuery, selectedSpecialization]);

  return (
    <AnimatedBackground>
      <Helmet>
        <title>लेखक - साहित्य सागर</title>
        <meta name="description" content="मराठी साहित्याचे प्रसिद्ध लेखक आणि कवी" />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#8B0000] mb-4">आमचे लेखक</h1>
            <p className="text-xl text-gray-600">मराठी साहित्याचे दिग्गज व्यक्तिमत्त्व</p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 mb-12 border border-[#D4AF37]/30 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#8B0000] transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="लेखक शोधा..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#8B0000] focus:outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Specialization Filter */}
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-6 py-3 rounded-xl border-2 border-gray-200 focus:border-[#8B0000] focus:outline-none bg-gray-50 focus:bg-white text-gray-700 min-w-[220px] cursor-pointer"
              >
                <option value="All">सर्व विशेषता</option>
                {specializations.filter(s => s !== 'All').map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6 px-2">
            <p className="text-gray-600 font-medium">
              <span className="font-bold text-[#8B0000] text-lg">{filteredAuthors.length}</span> लेखक सापडले
            </p>
          </div>

          {/* Authors Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredAuthors.map((author, index) => (
                <motion.div
                  layout
                  key={author.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/author/${author.id}`}>
                    <motion.div 
                      whileHover={{ y: -10, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-transparent hover:border-[#D4AF37] transition-all duration-300"
                    >
                      {/* Traditional motif decoration */}
                      <div className="h-2 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] via-[#2D5016] to-[#8B0000]"></div>
                      
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={author.image} 
                          alt={author.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90"></div>
                        
                        {/* Overlay Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                           <div className="flex items-center gap-2 mb-2">
                             <span className="bg-[#D4AF37] text-[#8B0000] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                               {author.specialization.split(',')[0]}
                             </span>
                           </div>
                           <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                            {author.name}
                          </h2>
                          <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                             {author.bio}
                          </p>
                        </div>

                        {/* Works count badge */}
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/30 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          {author.worksCount}
                        </div>
                      </div>

                      <div className="p-4 bg-[#FFF8E7] flex justify-between items-center group-hover:bg-white transition-colors">
                         <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                           <Feather className="w-4 h-4 text-[#8B0000]" />
                           प्रोफाइल पहा
                         </div>
                         <motion.div 
                           className="w-8 h-8 rounded-full bg-[#8B0000] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                           whileHover={{ scale: 1.1 }}
                         >
                           →
                         </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredAuthors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/50 rounded-3xl"
            >
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">लेखक सापडले नाहीत</h3>
              <p className="text-gray-500">कृपया शोध बदलून पुन्हा प्रयत्न करा</p>
            </motion.div>
          )}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default AuthorsDirectory;