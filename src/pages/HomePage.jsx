import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Sparkles, ChevronRight, PenTool, Quote, Feather, Theater, Globe, FileText, Music } from 'lucide-react';
import { works, authors } from "../data/sampleData";
import AnimatedDivider from "../components/AnimatedDivider";
import { Button } from "../components/ui/button";

// Simple Counter Component with easing
const Counter = ({ from, to, duration }) => {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    let startTime;
    let animationFrame;

    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.floor(easedProgress * (to - from) + from));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{count}</span>;
};

// Floating Devanagari Letters Component
const FloatingLetters = () => {
  const letters = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'क', 'ख', 'ग', 'घ', 'च', 'छ'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="absolute text-[#8B0000]/5 font-bold select-none"
          style={{
            fontSize: `${Math.random() * 60 + 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 10 - 5, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

// Hero Background Slideshow Component - cycles through heritage images every 4 seconds
const HeroBackgroundSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/images/hero/bg2.jpg',  // Varanasi ghats with boats
    '/images/hero/bg3.jpg',  // Varanasi colorful boats
    '/images/hero/bg4.jpg',  // BHU main gate
    '/images/hero/bg5.jpg',  // Varanasi evening ghats
    '/images/hero/bg6.jpg',  // Varanasi ancient architecture
    '/images/hero/bg7.png',  // BHU building with palm trees
    '/images/hero/bg8.jpg',  // Dhamek Stupa, Sarnath
    '/images/hero/bg9.jpg',  // Temple
  ];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds per image

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Background Images Container - z-0 */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          {images.map((image, index) => (
            index === currentIndex && (
              <motion.div
                key={image}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('${image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* Gradient overlay for text readability - much lighter for visible images */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F5E6D3]/40 via-[#FFF8E7]/30 to-[#F5E6D3]/40" />
                {/* Warli Art Style Pattern Overlay - very subtle */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238B0000' stroke-width='0.5' opacity='0.3'%3E%3Ccircle cx='40' cy='15' r='6'/%3E%3Cpath d='M25 30 L40 55 L55 30 Z'/%3E%3Cline x1='40' y1='55' x2='40' y2='75'/%3E%3Cline x1='25' y1='42' x2='10' y2='35'/%3E%3Cline x1='55' y1='42' x2='70' y2='35'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Separate container with high z-index */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Left Arrow Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white shadow-xl flex items-center justify-center transition-all duration-300 border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] cursor-pointer pointer-events-auto hover:scale-110 active:scale-95"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 text-[#8B0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white shadow-xl flex items-center justify-center transition-all duration-300 border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] cursor-pointer pointer-events-auto hover:scale-110 active:scale-95"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 text-[#8B0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slideshow Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 pointer-events-auto">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer hover:scale-125 ${i === currentIndex ? 'bg-[#8B0000] scale-125 w-5' : 'bg-[#D4AF37]/60 hover:bg-[#D4AF37]'}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// Typewriter Effect Component
const TypewriterText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-[#8B0000] ml-1 align-middle"
      />
    </span>
  );
};

// Famous Marathi Quotes
const quotes = [
  { text: "जे का रंजले गांजले, त्यासी म्हणे जो आपुले", author: "संत तुकाराम" },
  { text: "बहुत आघात सोसिता, बहु काळ सोसावा", author: "संत ज्ञानेश्वर" },
  { text: "आपण जे पेरतो, तेच उगवते", author: "संत एकनाथ" },
  { text: "कृतज्ञता हा सर्वात मोठा गुण आहे", author: "विनोबा भावे" },
  { text: "स्वातंत्र्य हा माझा जन्मसिद्ध हक्क आहे", author: "लोकमान्य टिळक" },
];

// Quote of the Day Component
const QuoteSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Maharashtra Heritage Background - Ancient manuscripts and palm leaves */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8E7]/95 via-[#F5E6D3]/90 to-[#FFF8E7]/95" />
        {/* Warli Art Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B0000'%3E%3Ccircle cx='50' cy='20' r='8'/%3E%3Cpath d='M35 40 L50 70 L65 40 Z' fill='none' stroke='%238B0000' stroke-width='2'/%3E%3Cline x1='50' y1='70' x2='50' y2='90' stroke='%238B0000' stroke-width='2'/%3E%3Cline x1='35' y1='55' x2='20' y2='45' stroke='%238B0000' stroke-width='2'/%3E%3Cline x1='65' y1='55' x2='80' y2='45' stroke='%238B0000' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
        <motion.div
          className="absolute top-10 left-10 text-[200px] text-[#D4AF37]/10 font-serif"
          animate={{ scale: [1, 1.05, 1], rotate: [-5, 0, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          "
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-[200px] text-[#D4AF37]/10 font-serif rotate-180"
          animate={{ scale: [1, 1.05, 1], rotate: [185, 180, 185] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          "
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Quote className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#8B0000]">आजचे सुविचार</h2>
            <Quote className="w-6 h-6 text-[#D4AF37]" />
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto text-center min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl md:text-3xl font-medium text-[#2D2D2D] mb-4 leading-relaxed">
                "{quotes[currentQuote].text}"
              </p>
              <p className="text-lg text-[#8B0000] font-semibold">— {quotes[currentQuote].author}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentQuote(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === currentQuote ? 'bg-[#8B0000] scale-125' : 'bg-[#D4AF37]/50'}`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Category Card Component
const CategoryCard = ({ icon: Icon, title, count, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, type: "spring", stiffness: 100 }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#D4AF37]/20 cursor-pointer group"
  >
    <motion.div
      className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center mb-4 mx-auto`}
      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="w-8 h-8 text-white" />
    </motion.div>
    <h3 className="text-xl font-bold text-center text-[#2D2D2D] group-hover:text-[#8B0000] transition-colors">
      {title}
    </h3>
    <p className="text-center text-gray-500 mt-2">{count} साहित्य</p>
  </motion.div>
);

// Categories Section
const CategoriesSection = () => {
  const categories = [
    { icon: Feather, title: 'कविता', count: works.filter(w => w.category === 'Poetry').length, color: 'bg-gradient-to-br from-[#8B0000] to-[#A52A2A]' },
    { icon: BookOpen, title: 'लघुकथा', count: works.filter(w => w.category === 'Short Stories').length, color: 'bg-gradient-to-br from-[#2D5016] to-[#4A7023]' },
    { icon: FileText, title: 'निबंध', count: works.filter(w => w.category === 'Essays').length, color: 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B]' },
    { icon: Theater, title: 'नाटक', count: works.filter(w => w.category === 'Drama').length, color: 'bg-gradient-to-br from-[#6B4423] to-[#8B5A2B]' },
    { icon: Globe, title: 'भाषांतर', count: works.filter(w => w.category === 'Translations').length, color: 'bg-gradient-to-br from-[#4A5568] to-[#2D3748]' },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Rangoli/Kolam Pattern Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8E7]/95 to-[#F5E6D3]/95" />
        {/* Traditional Paisley Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q45 15 45 30 Q45 50 30 55 Q15 50 15 30 Q15 15 30 5' fill='none' stroke='%23D4AF37' stroke-width='1.5'/%3E%3Ccircle cx='30' cy='25' r='5' fill='%23D4AF37' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Music className="w-6 h-6 text-[#8B0000]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#8B0000]">साहित्य प्रकार</h2>
            <Music className="w-6 h-6 text-[#8B0000]" />
          </div>
          <p className="text-gray-600">विविध साहित्य प्रकारांचा आस्वाद घ्या</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <Link to="/works" key={cat.title}>
              <CategoryCard {...cat} delay={i * 0.1} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Scrolling Marquee Component
const ScrollingMarquee = () => {
  const allTitles = works.map(w => w.title).join(' ✦ ');

  return (
    <div className="bg-[#8B0000] py-4 overflow-hidden">
      <motion.div
        className="whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-white/80 text-lg font-medium">
          {allTitles} ✦ {allTitles} ✦ {allTitles}
        </span>
      </motion.div>
    </div>
  );
};

// Latest Works Carousel
const LatestWorksSection = () => {
  const latestWorks = [...works].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 3);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Traditional Temple/Heritage Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1548013146-72479768bada?w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5E6D3]/95 to-white/98" />
        {/* Lotus Pattern Overlay - symbol of Marathi culture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D5016'%3E%3Cellipse cx='40' cy='40' rx='12' ry='20' transform='rotate(0 40 40)'/%3E%3Cellipse cx='40' cy='40' rx='12' ry='20' transform='rotate(45 40 40)'/%3E%3Cellipse cx='40' cy='40' rx='12' ry='20' transform='rotate(90 40 40)'/%3E%3Cellipse cx='40' cy='40' rx='12' ry='20' transform='rotate(135 40 40)'/%3E%3Ccircle cx='40' cy='40' r='8' fill='%23D4AF37'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-3"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="bg-[#8B0000] text-white px-4 py-1 rounded-full text-sm font-bold">नवीन</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D5016]">अलीकडील साहित्य</h2>
          <p className="text-gray-600 mt-2">आमच्या नव्या साहित्यिक कृती</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: index === 1 ? 50 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, type: "spring" }}
            >
              <Link to={`/work/${work.id}`}>
                <motion.div
                  whileHover={{ y: -15, rotateY: 5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={work.coverImage}
                      alt={work.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <motion.div
                      className="absolute top-4 right-4 bg-[#D4AF37] text-[#8B0000] px-3 py-1 rounded-full text-xs font-bold"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      {work.categoryMarathi}
                    </motion.div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{work.title}</h3>
                      <p className="text-white/80 text-sm">{authors.find(a => a.id === work.authorId)?.name}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{work.excerpt}</p>
                    <motion.div
                      className="flex items-center text-[#8B0000] font-semibold text-sm"
                      whileHover={{ x: 5 }}
                    >
                      वाचा <ChevronRight className="w-4 h-4 ml-1" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const featuredWorks = works.slice(0, 4);
  const featuredAuthors = authors.slice(0, 3);
  // const { scrollY } = useScroll();
  // const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  // const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>त्रिज्या - Marathi Literary Journal</title>
        <meta name="description" content="Celebrating the rich heritage of Marathi literature through poetry, stories, essays, and cultural narratives" />
      </Helmet>


      <section className="relative py-12 md:py-24 overflow-hidden min-h-[700px] flex items-center justify-center">
        {/* Floating Devanagari Letters */}
        <FloatingLetters />

        {/* Rotating Heritage Background Slideshow */}
        <HeroBackgroundSlideshow />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >

            {/* Animated Title with Glow */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#2D5016] bg-clip-text text-transparent leading-[1.3] pt-4 relative"
              animate={{
                textShadow: [
                  "0 0 20px rgba(139, 0, 0, 0)",
                  "0 0 40px rgba(139, 0, 0, 0.3)",
                  "0 0 20px rgba(139, 0, 0, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              त्रिज्या
              {/* Decorative sparkles */}
              <motion.span
                className="absolute -top-2 -right-4 text-[#D4AF37]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5], rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦
              </motion.span>
              <motion.span
                className="absolute -bottom-2 -left-4 text-[#D4AF37]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5], rotate: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ✦
              </motion.span>
            </motion.h1>

            {/* Typewriter Subtitle */}
            <motion.div variants={itemVariants} className="mb-8">
              <TypewriterText
                text="बृहन्महाराष्ट्राची द्वैभाषिक साहित्य पत्रिका"
                className="text-xl md:text-2xl text-[#1a1a1a] font-semibold px-6 py-2 inline-block rounded-full bg-white/70 backdrop-blur-sm shadow-lg"
                style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mb-12">
              <Link to="/works">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full bg-white/50 backdrop-blur-sm hover:bg-white border-[#8B0000] text-[#8B0000] flex items-center"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    साहित्य वाचा
                  </Button>
                </motion.div>
              </Link>

              <Link to="/authors">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full bg-white/50 backdrop-blur-sm hover:bg-white border-[#8B0000] text-[#8B0000] flex items-center"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    लेखक भेटा
                  </Button>
                </motion.div>
              </Link>
            </motion.div>


            {/* Statistics with Enhanced Animation */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-[#D4AF37]/30 shadow-lg"
            >
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <motion.div
                  className="text-3xl font-bold text-[#8B0000]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <Counter from={0} to={works.length} duration={2} />+
                </motion.div>
                <div className="text-sm text-gray-700 font-semibold">साहित्यिक कृती</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <motion.div
                  className="text-3xl font-bold text-[#2D5016]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  <Counter from={0} to={authors.length} duration={2} />+
                </motion.div>
                <div className="text-sm text-gray-700 font-semibold">लेखक</div>
              </motion.div>
              <motion.div
                className="col-span-2 md:col-span-1 text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <div
                  className="text-3xl font-bold text-[#D4AF37]"
                >
                  ∞
                </div>
                <div className="text-sm text-gray-700 font-semibold">प्रेरणा</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Scrolling Marquee */}
      <ScrollingMarquee />

      <AnimatedDivider type="warli" />

      {/* Quote of the Day */}
      <QuoteSection />

      <AnimatedDivider />

      {/* Categories Section */}
      <CategoriesSection />

      <AnimatedDivider type="warli" />

      {/* Latest Works Section */}
      <LatestWorksSection />

      <AnimatedDivider />

      {/* Featured Works Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Ancient Library/Books Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 to-[#F5E6D3]/95" />
          {/* Traditional Book Border Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='5' y='5' width='30' height='30' rx='3' fill='none' stroke='%238B0000' stroke-width='1'/%3E%3Cline x1='10' y1='12' x2='30' y2='12' stroke='%238B0000' stroke-width='0.5'/%3E%3Cline x1='10' y1='18' x2='30' y2='18' stroke='%238B0000' stroke-width='0.5'/%3E%3Cline x1='10' y1='24' x2='25' y2='24' stroke='%238B0000' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#8B0000]">निवडक साहित्य</h2>
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <p className="text-gray-600">आमच्या प्रसिद्ध साहित्यिक कृतींचा आस्वाद घ्या</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredWorks.map((work) => (
              <motion.div key={work.id} variants={itemVariants}>
                <Link to={`/work/${work.id}`}>
                  <motion.div
                    whileHover={{ y: -10, rotateX: 5 }}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#D4AF37]/20 h-full flex flex-col"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={work.coverImage}
                        alt={work.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/90 to-transparent opacity-80"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <motion.span
                          className="inline-block bg-[#D4AF37] text-[#8B0000] px-2 py-0.5 rounded text-[10px] font-bold mb-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          {work.categoryMarathi}
                        </motion.span>
                        <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-[#F5E6D3] transition-colors">
                          {work.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-xs text-gray-500 mb-2 font-medium">
                        {authors.find(a => a.id === work.authorId)?.name}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                        {work.excerpt}
                      </p>
                      <motion.div
                        className="text-[#8B0000] text-sm font-semibold flex items-center gap-1"
                        whileHover={{ x: 5 }}
                      >
                        वाचा <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/works">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="secondary" className="rounded-full">
                  सर्व साहित्य पहा <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Featured Authors Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Traditional Maharashtrian Fabric/Paithani Pattern Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8E7]/95 to-[#F5E6D3]/95" />
          {/* Peacock Feather Pattern - symbol of Maharashtra */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='30' rx='15' ry='25' fill='none' stroke='%232D5016' stroke-width='1'/%3E%3Cellipse cx='30' cy='25' rx='6' ry='10' fill='none' stroke='%232D5016' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='22' r='3' fill='%23D4AF37' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <PenTool className="w-6 h-6 text-[#2D5016]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D5016]">आमचे लेखक</h2>
              <PenTool className="w-6 h-6 text-[#2D5016]" />
            </div>
            <p className="text-gray-600">मराठी साहित्याचे दिग्गज</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredAuthors.map((author, index) => (
              <motion.div
                key={author.id}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring" }}
              >
                <Link to={`/author/${author.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#D4AF37]/10"
                  >
                    <motion.div
                      className="h-24 bg-gradient-to-r from-[#2D5016] to-[#4A7023]"
                      whileHover={{ backgroundPosition: "100% 0" }}
                      style={{ backgroundSize: "200% 100%" }}
                    />
                    <div className="px-6 pb-6 relative">
                      <motion.div
                        className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg"
                        whileHover={{ scale: 1.1, borderColor: "#D4AF37" }}
                      >
                        <img
                          src={author.image}
                          alt={author.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="pt-14">
                        <h3 className="text-xl font-bold text-[#2D5016] mb-1">
                          {author.name}
                        </h3>
                        <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wide mb-3">
                          {author.specialization}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {author.bio}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                          <span>{author.worksCount} साहित्य</span>
                          <motion.span
                            className="flex items-center text-[#2D5016] font-semibold"
                            whileHover={{ x: 3 }}
                          >
                            प्रोफाइल पहा <ChevronRight className="w-3 h-3 ml-1" />
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/authors">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016] hover:text-white rounded-full">
                  सर्व लेखक पहा <Users className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#FFF8E7] via-[#F5E6D3] to-[#FFF8E7] text-[#8B0000]">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #8B0000 20px, #8B0000 22px)`
          }}
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 border-2 border-[#8B0000]/20 rounded-full"
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 border-2 border-[#8B0000]/10 rounded-full"
          animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-[#8B0000]"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              मराठी साहित्याचा प्रवास सुरू करा
            </motion.h2>
            <p className="text-lg text-[#5D4037] mb-8">
              हजारो वर्षांच्या समृद्ध साहित्यिक परंपरेचा आस्वाद घ्या आणि आपल्या संस्कृतीशी जोडून राहा.
            </p>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#8B0000] text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-[#8B0000]/50 transition-all duration-300 inline-flex items-center gap-2"
              >
                आमच्याविषयी अधिक जाणून घ्या
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
