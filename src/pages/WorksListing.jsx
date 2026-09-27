import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { authors } from "../data/sampleData";
import AnimatedBackground from '../components/AnimatedBackground';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, LayoutGrid, Loader2, Feather, X, Mail, Copy, Check, BookOpen, Calendar } from 'lucide-react';
import { works } from "../data/sampleData";
import { Button } from "../components/ui/button";

const WorksListing = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(false);
  const [isCallForPapersOpen, setIsCallForPapersOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [copiedGuidelinesEmail, setCopiedGuidelinesEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCallForPapersOpen(false);
        setIsGuidelinesOpen(false);
      }
    };
    if (isCallForPapersOpen || isGuidelinesOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCallForPapersOpen, isGuidelinesOpen]);

  // Simulate loading on filter change for effect
  const handleCategoryChange = (category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 500);
  };

  const categories = ['All', 'Poetry', 'Short Stories', 'Drama', 'Translations'];
  const categoriesMarathi = {
    'All': 'शोधनिबंध / समीक्षा लेख',
    'Poetry': 'कविता',
    'Short Stories': 'कथा',
    'Drama': 'अनुवादित साहित्य',
    'Translations': 'पुस्तक परीक्षण'
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
        <title>साहित्य - त्रिज्या</title>
        <meta name="description" content="त्रिज्या साहित्य व संशोधन पत्रिका" />
      </Helmet>

      <div className="min-h-screen py-8 md:py-10">
        <div className="container mx-auto px-4">
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
                  <h2 className="text-xl font-bold">अनुक्रमणिका</h2>
                </div>

                <div className="space-y-2">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${selectedCategory === category
                        ? 'bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-[#F5E6D3]'
                        }`}
                    >
                      {categoriesMarathi[category]}
                    </motion.button>
                  ))}
                </div>

                {/* Call for Writing & Guidelines Section */}
                <div className="mt-8 pt-6 border-t border-[#D4AF37]/30 flex flex-col gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsCallForPapersOpen(true)}
                    style={{ cursor: 'pointer' }}
                    className="w-full text-left px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white shadow-md hover:shadow-lg font-bold text-base flex items-center gap-2.5 transition-all duration-300 border border-[#D4AF37]/50 cursor-pointer select-none"
                  >
                    <Feather className="w-5 h-5 text-[#FFD700] flex-shrink-0 pointer-events-none" />
                    <span className="pointer-events-none">लेखनासाठी आवाहन</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsGuidelinesOpen(true)}
                    style={{ cursor: 'pointer' }}
                    className="w-full text-left px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white shadow-md hover:shadow-lg font-bold text-base flex items-center gap-2.5 transition-all duration-300 border border-[#D4AF37]/50 cursor-pointer select-none"
                  >
                    <BookOpen className="w-5 h-5 text-[#FFD700] flex-shrink-0 pointer-events-none" />
                    <span className="pointer-events-none">मार्गदर्शक सूचना (Submission Guidelines)</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Works Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 font-medium">
                  <span className="font-bold text-[#8B0000] text-xl">{filteredAndSortedWorks.length}</span> {filteredAndSortedWorks.length === 1 ? 'कृती सापडली' : 'कृती सापडल्या'}
                </p>
                <div className="hidden md:flex gap-2">
                  <Button variant="ghost" size="icon"><LayoutGrid className="w-5 h-5 text-gray-600" /></Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 text-[#8B0000] animate-spin" />
                </div>
              ) : filteredAndSortedWorks.length === 0 ? (
                <div className="text-center py-20 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#D4AF37]/30 shadow-lg p-8">
                  <p className="text-gray-600 text-lg font-medium">या विभागात सध्या कोणतीही कृती उपलब्ध नाही.</p>
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

      {/* Beautiful Dialog Modals rendered directly to document.body via Portal to blur and cover header & page */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* Beautiful Call for Writing Dialog Modal */}
          <AnimatePresence>
            {isCallForPapersOpen && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Fullscreen Backdrop Blurring Header & Page */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsCallForPapersOpen(false)}
                  className="fixed inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
                  style={{
                    WebkitBackdropFilter: 'blur(12px)',
                    backdropFilter: 'blur(12px)'
                  }}
                />

                {/* Dialog Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.93, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: 15 }}
                  transition={{ type: "spring", duration: 0.35 }}
                  className="relative z-10 w-full max-w-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F2] to-[#F5E6D3] rounded-3xl shadow-2xl border-2 border-[#D4AF37] p-6 sm:p-8 max-h-[88vh] overflow-y-auto my-auto"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(212, 175, 55, 0.5)'
                  }}
                >
                  {/* Decorative Double Border Frame */}
                  <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/35 rounded-2xl pointer-events-none" />

                  {/* Close Button */}
                  <button
                    onClick={() => setIsCallForPapersOpen(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#8B0000]/10 hover:bg-[#8B0000] text-[#8B0000] hover:text-white flex items-center justify-center transition-all duration-200 z-20 border border-[#D4AF37]/40 shadow-sm cursor-pointer"
                    aria-label="बंद करा"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header */}
                  <div className="text-center relative z-10 mb-5 pb-3.5 border-b border-[#D4AF37]/30">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#5C0000] text-[#FFD700] shadow-md border border-[#D4AF37] mb-2.5">
                      <Feather className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#8B0000] tracking-wide mb-1.5">
                      लेखनासाठी आवाहन
                    </h2>
                    <div className="flex items-center justify-center gap-2.5 text-[#D4AF37] text-xs sm:text-sm select-none">
                      <span>✦</span>
                      <span className="font-serif tracking-widest text-[#8B0000]/80 font-medium">त्रिज्या साहित्य व संशोधन पत्रिका</span>
                      <span>✦</span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="relative z-10 space-y-4 text-gray-800 leading-relaxed text-base sm:text-lg">
                    {/* Paragraph 1 */}
                    <p className="text-justify font-normal text-gray-800 leading-relaxed">
                      काशी हिंदू विश्वविद्यालयाच्या मराठी विभागाच्या पुढाकारातून, व्यापक चर्चा आणि विचारविनिमयानंतर २०२६ मध्ये ‘त्रिज्या’ची सुरुवात होत आहे. महाराष्ट्राच्या साहित्यिक केंद्राशी महाराष्ट्राबाहेरील मराठी साहित्यिक अवकाशाचा संवाद अधिक दृढ करण्याच्या उद्देशाने हे नियतकालिक सुरू करण्यात येत आहे.
                    </p>

                    {/* Paragraph 2 - Central Theme Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-dashed border-[#D4AF37] shadow-sm my-4">
                      <p className="font-semibold text-[#8B0000] text-base sm:text-lg leading-relaxed">
                        या प्रवासाच्या प्रारंभिक टप्प्यात प्रकाशित होणाऱ्या ‘त्रिज्या’च्या पहिल्या अंकाची मध्यवर्ती संकल्पना (Central theme) —------------------------ अशी असेल.
                      </p>
                    </div>

                    {/* Paragraph 3 */}
                    <p className="text-justify font-normal text-gray-800 leading-relaxed">
                      या विषयाशी थेट किंवा व्यापक अर्थाने संबंधित, अभ्यासपूर्ण आणि आशयघन शोधनिबंध, वैचारिक लेख, समीक्षालेख आणि अनुवादित साहित्य या अंकासाठी आमंत्रित करण्यात येत आहे. प्रस्तुत विषयाच्या विविध साहित्यिक, सामाजिक, सांस्कृतिक, ऐतिहासिक आणि वैचारिक पैलूंचा चिकित्सक विचार करणाऱ्या लेखनाचे स्वागत आहे.
                    </p>

                    {/* Email Submission Box */}
                    <div className="mt-5 pt-4 border-t border-[#D4AF37]/30">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#D4AF37]">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm text-[#F5E6D3]/90 font-medium">लेख जमा करण्यासाठी मेल :</div>
                            <a
                              href="mailto:trijya.sahitya@gmail.com"
                              className="text-[#FFD700] font-bold text-base sm:text-lg hover:underline transition-all"
                            >
                              trijya.sahitya@gmail.com
                            </a>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('trijya.sahitya@gmail.com');
                            setCopiedEmail(true);
                            setTimeout(() => setCopiedEmail(false), 2000);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#B8941F] text-[#8B0000] font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-md self-stretch sm:self-auto justify-center cursor-pointer"
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>कॉपी झाले!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>ईमेल कॉपी करा</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Beautiful Submission Guidelines Dialog Modal */}
          <AnimatePresence>
            {isGuidelinesOpen && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Fullscreen Backdrop Blurring Header & Page */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsGuidelinesOpen(false)}
                  className="fixed inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
                  style={{
                    WebkitBackdropFilter: 'blur(12px)',
                    backdropFilter: 'blur(12px)'
                  }}
                />

                {/* Dialog Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.93, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: 15 }}
                  transition={{ type: "spring", duration: 0.35 }}
                  className="relative z-10 w-full max-w-2xl sm:max-w-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F2] to-[#F5E6D3] rounded-3xl shadow-2xl border-2 border-[#D4AF37] p-6 sm:p-8 max-h-[88vh] overflow-y-auto my-auto"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(212, 175, 55, 0.5)'
                  }}
                >
                  {/* Decorative Double Border Frame */}
                  <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/35 rounded-2xl pointer-events-none" />

                  {/* Close Button */}
                  <button
                    onClick={() => setIsGuidelinesOpen(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#8B0000]/10 hover:bg-[#8B0000] text-[#8B0000] hover:text-white flex items-center justify-center transition-all duration-200 z-20 border border-[#D4AF37]/40 shadow-sm cursor-pointer"
                    aria-label="बंद करा"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header */}
                  <div className="text-center relative z-10 mb-4 pb-3.5 border-b border-[#D4AF37]/30">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#5C0000] text-[#FFD700] shadow-md border border-[#D4AF37] mb-2">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#8B0000] tracking-wide mb-1">
                      मार्गदर्शक सूचना
                    </h2>
                    <div className="flex items-center justify-center gap-2.5 text-[#D4AF37] text-xs sm:text-sm select-none">
                      <span>✦</span>
                      <span className="font-serif tracking-widest text-[#8B0000]/80 font-medium">Submission Guidelines • त्रिज्या साहित्य व संशोधन पत्रिका</span>
                      <span>✦</span>
                    </div>
                  </div>

                  {/* Guidelines Body */}
                  <div className="relative z-10 space-y-3.5 text-gray-800 leading-relaxed text-sm sm:text-base">
                    <ul className="space-y-3 text-justify">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span>लेख दिलेल्या अंकाच्या मध्यवर्ती विषयाशी संबंधित असावा आणि मराठी भाषा, साहित्य, संस्कृती किंवा संबंधित सामाजिक-सांस्कृतिक संदर्भांशी अर्थपूर्ण संबंध असावा.</span>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span>शोधनिबंध, वैचारिक लेख, समीक्षालेख, विस्तृत पुस्तकपरीक्षण आणि अनुवादित लेखन स्वीकारले जाईल.</span>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span>मराठीतील लेखनास प्राधान्य दिले जाईल. विषयाच्या गरजेनुसार हिंदीतील आणि अपवादात्मक स्वरूपात इंग्रजीतील लेखनही स्वीकारले जाऊ शकते.</span>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span>सादर केलेले लेखन लेखकाचे स्वतःचे आणि अप्रकाशित असावे. एकाच वेळी इतर नियतकालिकाकडे प्रकाशनासाठी पाठविलेले लेखन स्वीकारले जाणार नाही.</span>
                      </li>

                      {/* Word Limit Card */}
                      <li className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-dashed border-[#D4AF37] shadow-sm my-2">
                        <div className="font-bold text-[#8B0000] mb-2 flex items-center gap-2 text-sm sm:text-base">
                          <span className="text-[#D4AF37]">❖</span>
                          <span>शब्दमर्यादा:</span>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm pl-4 font-medium text-gray-800">
                          <li className="flex items-center gap-2">
                            <span className="text-[#8B0000] font-bold">-</span>
                            <span>शोधनिबंध: ३,०००–५,००० शब्द</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#8B0000] font-bold">-</span>
                            <span>वैचारिक/समीक्षालेख: ३,०००–५,००० शब्द</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#8B0000] font-bold">-</span>
                            <span>विस्तृत पुस्तकपरीक्षण: २,०००–३,००० शब्द</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#8B0000] font-bold">-</span>
                            <span>अनुवाद: मूळ मजकुराच्या स्वरूपानुसार</span>
                          </li>
                        </ul>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span>शोधनिबंधासोबत साधारण १५०–२५० शब्दांचा सारांश (Abstract) आणि ४–५ विषयसूचक/कळीचे शब्द (Keyword) द्यावेत.</span>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span>लेखकाने ५०–१०० शब्दांचा संक्षिप्त परिचय तसेच फोन नंबर आणि ई-मेल द्यावा.</span>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span>संदर्भलेखन आणि उद्धरणांसाठी MLA शैलीची अद्ययावत आवृत्ती वापरावी. लेखामध्ये वापरलेल्या सर्व स्रोतांचा संदर्भ शेवटी द्यावा.</span>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span><strong>देवनागरी मजकूर:</strong> मराठी लेखन Unicode Devanagari मध्ये असावे. शक्यतो Unicode-compatible font वापरावा.</span>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span><strong>अनुवाद:</strong> अनुवादित लेखनासोबत शक्य असल्यास मूळ लेखाची प्रत (किंवा मूळ स्रोताची माहिती) द्यावी. अनुवादकाने मूळ लेखकाचे नाव, कृतीचे नाव आणि प्रकाशनाची माहिती स्पष्टपणे नमूद करावी. <strong>साहित्यिक हक्क:</strong> प्रकाशित मजकुराच्या कॉपीराइट आणि परवानगीसंबंधी आवश्यक जबाबदारी लेखक/अनुवादकाची असेल.</span>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span><strong>संपादकीय प्रक्रिया:</strong> प्राप्त लेखांचे प्राथमिक संपादकीय परीक्षण केले जाईल. शोधनिबंधांसाठी नियतकालिकाच्या संपादकीय धोरणानुसार पुनरावलोकन (peer review) केले जाऊ शकते.</span>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="text-[#D4AF37] text-base mt-0.5 select-none flex-shrink-0">●</span>
                        <span><strong>संपादनाचा अधिकार:</strong> आवश्यकतेनुसार भाषिक, तांत्रिक आणि संपादकीय सुधारणा करण्याचा अधिकार संपादकमंडळाकडे राहील. आशयातील महत्त्वपूर्ण बदल लेखकाच्या संमतीने केले जातील.</span>
                      </li>
                    </ul>

                    {/* Deadline & Submission Card */}
                    <div className="mt-4 pt-3.5 border-t border-[#D4AF37]/30 space-y-3">
                      <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] font-bold text-sm sm:text-base">
                        <Calendar className="w-5 h-5 text-[#8B0000] flex-shrink-0" />
                        <span>सादरीकरणाची अंतिम तारीख: ___</span>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#D4AF37]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                            <Mail className="w-4 h-4 text-[#FFD700]" />
                          </div>
                          <div>
                            <div className="text-xs text-[#F5E6D3]/90 font-medium">लेख MS Word (.doc/.docx) स्वरूपात पाठवावा :</div>
                            <a
                              href="mailto:trijya.sahitya@gmail.com"
                              className="text-[#FFD700] font-bold text-sm sm:text-base hover:underline transition-all"
                            >
                              trijya.sahitya@gmail.com
                            </a>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('trijya.sahitya@gmail.com');
                            setCopiedGuidelinesEmail(true);
                            setTimeout(() => setCopiedGuidelinesEmail(false), 2000);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#B8941F] text-[#8B0000] font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-md self-stretch sm:self-auto justify-center cursor-pointer"
                        >
                          {copiedGuidelinesEmail ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>कॉपी झाले!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>ईमेल कॉपी करा</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-center text-gray-500 italic">
                        (इतर कुठल्याही मार्गे प्राप्त झालेला लेख स्वीकारला जाणार नाही याची कृपया नोंद घ्यावी.)
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </AnimatedBackground>
  );
};

export default WorksListing;