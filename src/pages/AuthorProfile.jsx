import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Award, Globe, Twitter, ArrowLeft, ArrowUpRight, Quote } from 'lucide-react';
import { authors, works } from "../data/sampleData";
import AnimatedBackground from "../components/AnimatedBackground";
import { Button } from "../components/ui/button";


const AuthorProfile = () => {
  const { id } = useParams();
  const author = authors.find(a => a.id === id);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, 100]);
  
  if (!author) return <div>Author not found</div>;

  const authorWorks = works.filter(w => w.authorId === id)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  
  const relatedAuthors = authors.filter(a => 
    a.id !== id && 
    a.specialization.split(', ').some(spec => 
      author.specialization.includes(spec)
    )
  ).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <AnimatedBackground>
      <Helmet>
        <title>{author.name} - साहित्य सागर</title>
        <meta name="description" content={author.bio} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative min-h-[500px] flex items-center overflow-hidden">
        <motion.div 
          style={{ y: headerY }}
          className="absolute inset-0 bg-gradient-to-br from-[#8B0000] via-[#5c0000] to-[#2D5016] z-0"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <Link to="/authors">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> लेखक यादीकडे
            </motion.div>
          </Link>

          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="relative"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-[#D4AF37]/50 shadow-2xl relative z-10">
                <img 
                  src={author.image} 
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-4 border border-dashed border-white/20 rounded-full z-0"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#D4AF37] text-[#8B0000] px-6 py-2 rounded-full font-bold shadow-lg z-20 text-lg">
                {author.worksCount} कृती
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1 text-center md:text-left text-white"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-md">
                {author.name}
              </h1>
              
              <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20 text-[#D4AF37] font-bold text-xl mb-6">
                {author.specialization}
              </div>
              
              <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                {author.bioLong}
              </p>

              <div className="flex gap-4 justify-center md:justify-start">
                {author.socialLinks.website && (
                  <Button size="icon" variant="outline" className="rounded-full border-white/30 text-white hover:bg-white hover:text-[#8B0000]">
                    <Globe className="w-5 h-5" />
                  </Button>
                )}
                {author.socialLinks.twitter && (
                  <Button size="icon" variant="outline" className="rounded-full border-white/30 text-white hover:bg-white hover:text-[#8B0000]">
                    <Twitter className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-white relative z-10 -mt-8 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pt-16 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-[#FFF8E7] rounded-3xl p-10 border border-[#D4AF37]/30 relative"
          >
            <Quote className="absolute top-6 left-6 w-12 h-12 text-[#D4AF37]/20" />
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="w-6 h-6 text-[#8B0000]" />
              <h2 className="text-2xl font-bold text-[#8B0000] uppercase tracking-wider">साहित्यिक तत्त्वज्ञान</h2>
            </div>
            <blockquote className="text-2xl text-center text-gray-700 italic font-serif leading-relaxed">
              "{author.philosophy}"
            </blockquote>
          </motion.div>
        </div>
      </div>

      {/* Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-4 mb-12"
          >
             <div className="h-px flex-1 bg-gray-300"></div>
             <h2 className="text-4xl font-bold text-[#2D5016]">प्रकाशित कृती</h2>
             <div className="h-px flex-1 bg-gray-300"></div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            {authorWorks.map((work) => (
              <motion.div
                key={work.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link to={`/work/${work.id}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#D4AF37]/50 flex gap-6 items-center"
                  >
                    <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden relative">
                       <img src={work.coverImage} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="text-2xl font-bold text-[#8B0000] group-hover:text-[#2D5016] transition-colors">{work.title}</h3>
                         <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#D4AF37] transition-colors" />
                      </div>
                      <div className="flex gap-4 text-sm text-gray-500 mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded">{new Date(work.publishDate).getFullYear()}</span>
                        <span className="bg-[#FFF8E7] text-[#D4AF37] px-2 py-1 rounded font-medium">{work.categoryMarathi}</span>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{work.excerpt}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default AuthorProfile;