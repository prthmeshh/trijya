import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Tag, User, ArrowLeft, ArrowRight, BookOpen, Quote } from 'lucide-react';
import { works } from "../data/sampleData";
import { Button } from "../components/ui/button";
import AnimatedDivider from "../components/AnimatedDivider";
import { authors } from "../data/sampleData"; // <-- relative path


const WorkDetail = () => {
  const { id } = useParams();
  const work = works.find(w => w.id === id);
  const author = work ? authors.find(a => a.id === work.authorId) : null;
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  
  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#8B0000] mb-4">कृती सापडली नाही</h2>
          <Link to="/works">
             <Button variant="outline">साहित्य संग्रहाकडे परत जा</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = works.findIndex(w => w.id === id);
  const prevWork = currentIndex > 0 ? works[currentIndex - 1] : null;
  const nextWork = currentIndex < works.length - 1 ? works[currentIndex + 1] : null;
  
  const relatedWorks = works.filter(w => 
    work.relatedWorks.includes(w.id)
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
        <title>{work.title} - साहित्य सागर</title>
        <meta name="description" content={work.excerpt} />
      </Helmet>

      {/* Hero Header with Parallax */}
      <div className="relative h-[60vh] overflow-hidden flex items-end">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={work.coverImage} 
            alt={work.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8E7] via-[#FFF8E7]/50 to-transparent"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 pb-12">
           <Link to="/works">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 text-[#8B0000] hover:text-[#A52A2A] font-bold mb-6 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full cursor-pointer transition-colors"
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
              {work.categoryMarathi}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#2D5016] mb-6 drop-shadow-sm leading-tight">
              {work.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-gray-800 font-medium">
              <Link to={`/author/${author.id}`} className="flex items-center gap-2 hover:text-[#8B0000] transition-colors bg-white/60 px-3 py-1 rounded-full">
                <User className="w-5 h-5" />
                <span>{author.name}</span>
              </Link>
              
              <div className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full">
                <Calendar className="w-5 h-5" />
                <span>{new Date(work.publishDate).toLocaleDateString('mr-IN')}</span>
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
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-[#D4AF37]/20 relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
             <BookOpen className="w-full h-full" />
          </div>

          {/* Content */}
          <motion.div variants={itemVariants} className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed font-serif">
            <div className="first-letter:text-6xl first-letter:font-bold first-letter:text-[#8B0000] first-letter:mr-3 first-letter:float-left">
              {work.content.split('\n')[0]}
            </div>
            <div className="whitespace-pre-line mt-4">
              {work.content.substring(work.content.split('\n')[0].length)}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-100">
             <div className="flex justify-center">
               <Quote className="w-8 h-8 text-[#D4AF37] opacity-50" />
             </div>
          </motion.div>
        </motion.div>

        {/* Author Bio Card */}
        {author && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
            className="mt-12"
          >
            <Link to={`/author/${author.id}`}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-[#2D5016] to-[#3D6026] rounded-2xl shadow-xl p-8 text-white relative overflow-hidden"
              >
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <div className="flex items-center gap-6 relative z-10">
                  <motion.img 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={author.image} 
                    alt={author.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#D4AF37] shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      लेखक: {author.name}
                    </h3>
                    <p className="text-[#D4AF37] font-semibold mb-2">
                      {author.specialization}
                    </p>
                    <p className="text-gray-200 line-clamp-2">
                      {author.bio}
                    </p>
                  </div>
                  <div className="hidden md:block bg-white/20 p-3 rounded-full">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}

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
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedWorks.map((relatedWork, i) => (
                <Link key={relatedWork.id} to={`/work/${relatedWork.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#D4AF37]/20"
                  >
                    <div className="h-32 overflow-hidden relative">
                      <img 
                        src={relatedWork.coverImage} 
                        alt={relatedWork.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[#8B0000] line-clamp-1 mb-2">
                        {relatedWork.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
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
        <div className="mt-16 flex justify-between items-center">
          {prevWork ? (
            <Link to={`/work/${prevWork.id}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> मागील साहित्य
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
          
          {nextWork && (
            <Link to={`/work/${nextWork.id}`}>
              <Button className="gap-2 bg-[#8B0000] hover:bg-[#A52A2A]">
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