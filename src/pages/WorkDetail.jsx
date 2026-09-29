import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowRight, BookOpen, Quote, Loader2 } from 'lucide-react';
import { works as sampleWorks, authors } from "../data/sampleData";
import { getWorkById, getWorks } from "../services/api";
import { Button } from "../components/ui/button";
import AnimatedDivider from "../components/AnimatedDivider";

const WorkDetail = () => {
  const { id } = useParams();
  const [work, setWork] = useState(() => sampleWorks.find(w => String(w.id) === String(id)) || null);
  const [allWorks, setAllWorks] = useState(sampleWorks);
  const [isLoading, setIsLoading] = useState(!work);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    Promise.all([
      getWorkById(id),
      getWorks()
    ]).then(([fetchedWork, fetchedList]) => {
      if (!isMounted) return;
      if (fetchedWork) {
        setWork(fetchedWork);
      }
      if (Array.isArray(fetchedList) && fetchedList.length > 0) {
        setAllWorks(fetchedList);
      }
    }).catch(err => {
      console.error('Error fetching work details:', err);
    }).finally(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => { isMounted = false; };
  }, [id]);

  if (isLoading && !work) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-[#8B0000] animate-spin mb-4" />
          <p className="text-lg font-semibold text-[#8B0000]">साहित्य लोड होत आहे...</p>
        </div>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center p-6 bg-white/80 rounded-2xl shadow-xl border border-[#D4AF37]/30 max-w-md">
          <h2 className="text-3xl font-bold text-[#8B0000] mb-4">कृती सापडली नाही</h2>
          <p className="text-gray-600 mb-6">तुम्ही शोधत असलेले साहित्य उपलब्ध नाही किंवा ते काढून टाकण्यात आले आहे.</p>
          <Link to="/works">
            <Button variant="outline" className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white">
              साहित्य संग्रहाकडे परत जा
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const matchedAuthor = authors.find(a => a.id === work.authorId);
  const authorName = work.authorName || matchedAuthor?.name || 'त्रिज्या लेखक';
  const authorBio = matchedAuthor?.bio || 'त्रिज्या मराठी साहित्याचे योगदानकर्ते';
  const authorSpecialization = matchedAuthor?.specialization || work.categoryMarathi || 'मराठी साहित्य';
  const authorImage = matchedAuthor?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400';

  const currentIndex = allWorks.findIndex(w => String(w.id) === String(id));
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < allWorks.length - 1 && currentIndex !== -1 ? allWorks[currentIndex + 1] : null;

  const relatedWorks = allWorks.filter(w =>
    String(w.id) !== String(id) &&
    ((Array.isArray(work.relatedWorks) && work.relatedWorks.includes(w.id)) || w.category === work.category)
  ).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#FFF8E7] min-h-screen"
    >
      <Helmet>
        <title>{work.title} - त्रिज्या साहित्य</title>
        <meta name="description" content={work.excerpt} />
      </Helmet>

      {/* Hero Header with Parallax */}
      <div className="relative h-[60vh] overflow-hidden flex items-end">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img
            src={work.coverImage || 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800'}
            alt={work.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8E7] via-[#FFF8E7]/50 to-transparent"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 pb-12">
          <Link to="/works">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 text-[#8B0000] hover:text-[#A52A2A] font-bold mb-6 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full cursor-pointer transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> साहित्य संग्रहाकडे
            </motion.div>
          </Link>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 bg-[#D4AF37] text-[#8B0000] text-sm font-bold rounded-full mb-4 shadow-lg">
              {work.categoryMarathi || work.category}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#2D5016] mb-4 sm:mb-6 drop-shadow-sm leading-tight font-serif">
              {work.title}
            </h1>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-800 font-medium">
              {matchedAuthor ? (
                <Link to={`/author/${matchedAuthor.id}`} className="flex items-center gap-2 hover:text-[#8B0000] transition-colors bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-xs">
                  <User className="w-4 h-4 text-[#8B0000]" />
                  <span>{authorName}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-xs">
                  <User className="w-4 h-4 text-[#8B0000]" />
                  <span>{authorName}</span>
                </div>
              )}

              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-xs">
                <Calendar className="w-4 h-4 text-[#8B0000]" />
                <span>
                  {work.publishDate
                    ? new Date(work.publishDate).toLocaleDateString('mr-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                    : 'उपलब्ध नाही'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 md:p-12 border border-[#D4AF37]/20 relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
            <BookOpen className="w-full h-full" />
          </div>

          {/* Content */}
          <motion.div variants={itemVariants} className="prose prose-lg md:prose-xl max-w-none text-gray-800 leading-relaxed font-serif">
            {work.content ? (
              <>
                <div className="first-letter:text-6xl first-letter:font-bold first-letter:text-[#8B0000] first-letter:mr-3 first-letter:float-left">
                  {work.content.split('\n')[0]}
                </div>
                <div className="whitespace-pre-line mt-4 text-base sm:text-lg leading-loose">
                  {work.content.substring(work.content.split('\n')[0].length)}
                </div>
              </>
            ) : (
              <p className="text-gray-500 italic">साहित्य मजकूर उपलब्ध नाही.</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex justify-center">
              <Quote className="w-8 h-8 text-[#D4AF37] opacity-50" />
            </div>
          </motion.div>
        </motion.div>

        {/* Author Bio Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-[#2D5016] to-[#3D6026] rounded-2xl shadow-xl p-5 sm:p-8 text-white relative overflow-hidden border border-[#D4AF37]/30">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative z-10 text-center sm:text-left">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                src={authorImage}
                alt={authorName}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#D4AF37] shadow-lg flex-shrink-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400';
                }}
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  लेखक: {authorName}
                </h3>
                <p className="text-[#D4AF37] font-semibold mb-2">
                  {authorSpecialization}
                </p>
                <p className="text-gray-200 line-clamp-2">
                  {authorBio}
                </p>
              </div>
              {matchedAuthor && (
                <Link to={`/author/${matchedAuthor.id}`} className="hidden md:block bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-6 h-6 text-white" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* Related Works */}
        {relatedWorks.length > 0 && (
          <div className="mt-16">
            <AnimatedDivider className="mb-8" />
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-[#8B0000] mb-8 text-center"
            >
              समान साहित्य
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedWorks.map((relatedWork, i) => (
                <Link key={relatedWork.id} to={`/work/${relatedWork.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#D4AF37]/20 h-full flex flex-col"
                  >
                    <div className="h-32 overflow-hidden relative">
                      <img
                        src={relatedWork.coverImage || 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800'}
                        alt={relatedWork.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800';
                        }}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-[#8B0000] line-clamp-1 mb-2">
                        {relatedWork.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 flex-1">
                        {relatedWork.excerpt}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-16 flex justify-between items-center gap-4">
          {prevWork ? (
            <Link to={`/work/${prevWork.id}`}>
              <Button variant="outline" className="gap-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white">
                <ArrowLeft className="w-4 h-4" /> मागील साहित्य
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          {nextWork && (
            <Link to={`/work/${nextWork.id}`}>
              <Button className="gap-2 bg-[#8B0000] hover:bg-[#A52A2A] text-white">
                पुढील साहित्य <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkDetail;