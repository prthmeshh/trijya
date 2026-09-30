import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, User, ArrowLeft } from 'lucide-react';
import { works, authors } from "../data/sampleData";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    
    const matchedWorks = works.filter(work =>
      work.title.toLowerCase().includes(lowerQuery) ||
      work.content.toLowerCase().includes(lowerQuery) ||
      work.excerpt.toLowerCase().includes(lowerQuery) ||
      authors.find(a => a.id === work.authorId)?.name.toLowerCase().includes(lowerQuery)
    );

    const matchedAuthors = authors.filter(author =>
      author.name.toLowerCase().includes(lowerQuery) ||
      author.bio.toLowerCase().includes(lowerQuery) ||
      author.specialization.toLowerCase().includes(lowerQuery)
    );

    return { works: matchedWorks, authors: matchedAuthors };
  }, [query]);

  const totalResults = searchResults.works.length + searchResults.authors.length;

  return (
    <>
      <Helmet>
        <title>शोध परिणाम: {query} - साहित्य सागर</title>
        <meta name="description" content={`${query} साठी शोध परिणाम`} />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/">
              <button className="mb-4 flex items-center gap-2 text-[#8B0000] hover:text-[#A52A2A] font-semibold transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                मुखपृष्ठाकडे परत
              </button>
            </Link>

            <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-[#D4AF37]/20">
              <div className="flex items-center gap-3 mb-3">
                <Search className="w-6 h-6 text-[#8B0000]" />
                <h1 className="text-3xl font-bold text-[#8B0000]">शोध परिणाम</h1>
              </div>
              
              <p className="text-lg text-gray-600 mb-1">
                "<span className="font-semibold text-[#A52A2A]">{query}</span>" साठी
              </p>
              
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-[#8B0000]">{totalResults}</span> परिणाम सापडले
              </p>
            </div>
          </motion.div>

          {/* No Results */}
          {totalResults === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">काहीही सापडले नाही</h2>
              <p className="text-gray-500 mb-6 text-sm">कृपया वेगळे शब्द वापरून पुन्हा प्रयत्न करा</p>
              
              <div className="bg-[#F5E6D3] rounded-xl p-4 max-w-sm mx-auto">
                <h3 className="font-semibold text-[#8B0000] mb-2 text-sm">सूचना:</h3>
                <ul className="text-left text-gray-600 space-y-1 text-xs">
                  <li>• सर्व शब्दांची शुद्धलेखन तपासा</li>
                  <li>• कमी शब्द वापरून पहा</li>
                  <li>• समानार्थी शब्द वापरून पहा</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Works Results */}
          {searchResults.works.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-[#8B0000]" />
                <h2 className="text-2xl font-bold text-[#8B0000]">
                  साहित्य ({searchResults.works.length})
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {searchResults.works.map((work, index) => {
                  const author = authors.find(a => a.id === work.authorId);
                  
                  return (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link to={`/work/${work.id}`}>
                        <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#D4AF37]">
                          <div className="h-1.5 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#2D5016]"></div>
                          
                          <div className="flex">
                            <div className="w-28 h-28 flex-shrink-0 relative overflow-hidden">
                              <img 
                                src={work.coverImage} 
                                alt={work.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            
                            <div className="p-3 flex-1">
                              <div className="inline-block px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#8B0000] text-[10px] font-semibold rounded mb-1">
                                {(work.category === 'Poetry' || work.category === 'Short Stories' || work.categoryMarathi === 'कविता' || work.categoryMarathi === 'कथा') ? 'कविता / कथा / ललित लेख' : (work.categoryMarathi || work.category)}
                              </div>
                              
                              <h3 className="text-lg font-bold text-[#8B0000] mb-0.5 line-clamp-2 group-hover:text-[#A52A2A] transition-colors">
                                {work.title}
                              </h3>
                              
                              <p className="text-xs text-gray-600 mb-1">
                                {author?.name}
                              </p>
                              
                              <p className="text-xs text-gray-500 line-clamp-2">
                                {work.excerpt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Authors Results */}
          {searchResults.authors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#2D5016]" />
                <h2 className="text-2xl font-bold text-[#2D5016]">
                  लेखक ({searchResults.authors.length})
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {searchResults.authors.map((author, index) => (
                  <motion.div
                    key={author.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link to={`/author/${author.id}`}>
                      <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#D4AF37]">
                        <div className="h-1.5 bg-gradient-to-r from-[#2D5016] via-[#D4AF37] to-[#8B0000]"></div>
                        
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={author.image} 
                            alt={author.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        <div className="p-3">
                          <h3 className="text-lg font-bold text-[#2D5016] mb-1 group-hover:text-[#8B0000] transition-colors">
                            {author.name}
                          </h3>
                          
                          <p className="text-xs text-[#D4AF37] font-semibold mb-1">
                            {author.specialization}
                          </p>
                          
                          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                            {author.bio}
                          </p>

                          <div className="text-[10px] text-gray-500">
                            {author.worksCount} कृती प्रकाशित
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;