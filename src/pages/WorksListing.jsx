import React, { useState, useMemo } from 'react';
import { authors } from "../data/sampleData";
import AnimatedBackground from '../components/AnimatedBackground';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SortAsc, LayoutGrid, Loader2 } from 'lucide-react';
import { works } from "../data/sampleData";
import { Button } from "../components/ui/button";
// import AnimatedDivider from "../components/AnimatedDivider";
// If it's in your components folder






const WorksListing = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading on filter change for effect
  const handleCategoryChange = (category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 500);
  };

  const categories = ['All', 'Poetry', 'Short Stories', 'Essays', 'Drama', 'Translations'];
  const categoriesMarathi = {
    'All': 'सर्व',
    'Poetry': 'कविता',
    'Short Stories': 'लघुकथा',
    'Essays': 'निबंध',
    'Drama': 'नाटक',
    'Translations': 'भाषांतर'
  };

  const filteredAndSortedWorks = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? works 
      : works.filter(work => work.category === selectedCategory);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate) - new Date(a.publishDate);
        case 'oldest':
          return new Date(a.publishDate) - new Date(b.publishDate);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [selectedCategory, sortBy]);

  return (
    <AnimatedBackground>
      <Helmet>
        <title>साहित्य संग्रह - साहित्य सागर</title>
        <meta name="description" content="मराठी कविता, कथा, निबंध आणि नाट्यसाहित्याचा विस्तृत संग्रह" />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#8B0000] mb-3">साहित्य संग्रह</h1>
            <p className="text-lg text-gray-600">मराठी साहित्याचा समृद्ध खजिना</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-72 flex-shrink-0"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sticky top-24 border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 mb-6 text-[#8B0000]">
                  <Filter className="w-5 h-5" />
                  <h2 className="text-xl font-bold">प्रकार निवडा</h2>
                </div>
                
                <div className="space-y-2">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-[#F5E6D3]'
                      }`}
                    >
                      {categoriesMarathi[category]}
                    </motion.button>
                  ))}
                </div>

                {/* Sort Options */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-[#8B0000] mb-4 flex items-center gap-2">
                    <SortAsc className="w-5 h-5" />
                    क्रमवारी
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000] bg-white text-gray-700 text-sm appearance-none cursor-pointer hover:border-[#8B0000]"
                  >
                    <option value="newest">नवीनतम</option>
                    <option value="oldest">जुनाट</option>
                    <option value="alphabetical">अकारादी</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Works Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 font-medium">
                  <span className="font-bold text-[#8B0000] text-xl">{filteredAndSortedWorks.length}</span> कृती सापडल्या
                </p>
                <div className="hidden md:flex gap-2">
                   <Button variant="ghost" size="icon"><LayoutGrid className="w-5 h-5 text-gray-600" /></Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 text-[#8B0000] animate-spin" />
                </div>
              ) : (
                <motion.div 
                  layout
                  className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredAndSortedWorks.map((work, index) => {
                      const author = authors.find(a => a.id === work.authorId);
                      
                      return (
                        <motion.div
                          layout
                          key={work.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Link to={`/work/${work.id}`}>
                            <motion.div 
                              whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-[#D4AF37]/20 h-full flex flex-col"
                            >
                              {/* Decorative Border Line */}
                              <div className="h-1.5 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#2D5016]"></div>
                              
                              <div className="relative h-48 overflow-hidden">
                                <img 
                                  src={work.coverImage} 
                                  alt={work.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
                                
                                <motion.div 
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  className="absolute top-3 right-3"
                                >
                                  <span className="bg-[#D4AF37] text-[#8B0000] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    {work.categoryMarathi}
                                  </span>
                                </motion.div>
                                
                                <div className="absolute bottom-3 left-3 text-white">
                                  <div className="text-[10px] uppercase tracking-wider opacity-80 mb-1">प्रकाशन दिनांक</div>
                                  <div className="text-xs font-semibold">
                                    {new Date(work.publishDate).toLocaleDateString('mr-IN')}
                                  </div>
                                </div>
                              </div>

                              <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-[#8B0000] mb-2 line-clamp-2 group-hover:text-[#A52A2A] transition-colors">
                                  {work.title}
                                </h3>
                                
                                <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">
                                  लेखक: {author?.name}
                                </p>
                                
                                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                                  {work.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                  <span className="text-xs font-medium text-gray-400 group-hover:text-[#8B0000] transition-colors">
                                    अधिक वाचा
                                  </span>
                                  <motion.div 
                                    whileHover={{ x: 5 }}
                                    className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center group-hover:bg-[#8B0000] transition-colors"
                                  >
                                    <span className="text-[#8B0000] text-sm group-hover:text-white">→</span>
                                  </motion.div>
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default WorksListing;