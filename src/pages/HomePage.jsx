import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Feather, Theater, Globe, FileText, Music } from 'lucide-react';
import { works } from "../data/sampleData";
import AnimatedDivider from "../components/AnimatedDivider";

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

// Hero Background Component - BHU main gate
const HeroBackgroundSlideshow = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero/bg4.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5E6D3]/40 via-[#FFF8E7]/30 to-[#F5E6D3]/40" />
      {/* Warli Art Style Pattern Overlay - very subtle */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238B0000' stroke-width='0.5' opacity='0.3'%3E%3Ccircle cx='40' cy='15' r='6'/%3E%3Cpath d='M25 30 L40 55 L55 30 Z'/%3E%3Cline x1='40' y1='55' x2='40' y2='75'/%3E%3Cline x1='25' y1='42' x2='10' y2='35'/%3E%3Cline x1='55' y1='42' x2='70' y2='35'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
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
  { text: "निज भाषा उन्नति अहै, सब उन्नति को मूल,\nबिनु निज भाषा-ज्ञान के, मिटत न हिय को सूल ।", author: "भारतेन्दु हरिश्चन्द्र" },
  { text: "असाध्य ते साध्य करितां सायास ।\nकारण अभ्यास तुका म्हणे ।।", author: "संत तुकाराम" },
  { text: "माझा मराठाचि बोलु कौतुकें।\nपरि अमृतातेंहि पैजां जिंके।\nऐसीं अक्षरें रसिकें।\nमेळवीन ।।", author: "संत ज्ञानेश्वर" },
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

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full text-center min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
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
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#D4AF37]/20 cursor-pointer group flex flex-col justify-between w-full h-full"
  >
    <motion.div
      className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center mb-4 mx-auto`}
      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="w-8 h-8 text-white" />
    </motion.div>
    <h3 className="text-base sm:text-lg font-bold text-center text-[#2D2D2D] group-hover:text-[#8B0000] transition-colors min-h-[3rem] flex items-center justify-center">
      {title}
    </h3>
    <p className="text-center text-gray-500 mt-2">{count} साहित्य</p>
  </motion.div>
);

// Categories Section
const CategoriesSection = () => {
  const categories = [
    { key: 'All', icon: FileText, title: 'शोधनिबंध / समीक्षा लेख', count: works.length, color: 'bg-gradient-to-br from-[#8B0000] to-[#A52A2A]' },
    { key: 'Poetry', icon: Feather, title: 'कविता', count: works.filter(w => w.category === 'Poetry').length, color: 'bg-gradient-to-br from-[#2D5016] to-[#4A7023]' },
    { key: 'Short Stories', icon: BookOpen, title: 'कथा', count: works.filter(w => w.category === 'Short Stories').length, color: 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B]' },
    { key: 'Drama', icon: Globe, title: 'अनुवादित साहित्य', count: works.filter(w => w.category === 'Drama').length, color: 'bg-gradient-to-br from-[#6B4423] to-[#8B5A2B]' },
    { key: 'Translations', icon: Theater, title: 'पुस्तक परीक्षण', count: works.filter(w => w.category === 'Translations').length, color: 'bg-gradient-to-br from-[#4A5568] to-[#2D3748]' },
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
          <div className="flex items-center justify-center gap-3">
            <Music className="w-6 h-6 text-[#8B0000]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#8B0000]">साहित्य</h2>
            <Music className="w-6 h-6 text-[#8B0000]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <Link 
              to={`/works?category=${encodeURIComponent(cat.key)}`} 
              state={{ category: cat.key }}
              key={cat.title} 
              className="flex"
            >
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



const HomePage = () => {
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

            {/* Stylish Subtitle Pill */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-xl shadow-[#8B0000]/5 ring-4 ring-[#D4AF37]/15">
                <span className="text-[#D4AF37] text-sm md:text-base select-none">✦</span>
                <TypewriterText
                  text="मराठी साहित्य व संशोधन पत्रिका"
                  className="text-lg sm:text-xl md:text-2xl font-bold text-[#8B0000] tracking-wide"
                />
                <span className="text-[#D4AF37] text-sm md:text-base select-none">✦</span>
              </div>
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
    </motion.div>
  );
};

export default HomePage;
