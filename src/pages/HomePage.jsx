import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Feather, Theater, Globe, FileText, Music, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { works as sampleWorks } from "../data/sampleData";
import { getWorks } from "../services/api";
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
              <p className="text-lg sm:text-2xl md:text-3xl font-medium text-[#2D2D2D] mb-4 leading-relaxed">
                "{quotes[currentQuote].text}"
              </p>
              <p className="text-sm sm:text-lg text-[#8B0000] font-semibold">— {quotes[currentQuote].author}</p>
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
    whileHover={{ y: -6, scale: 1.02 }}
    className="bg-white rounded-2xl p-3.5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#D4AF37]/20 cursor-pointer group flex flex-col justify-between w-full h-full"
  >
    <motion.div
      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${color} flex items-center justify-center mb-3 sm:mb-4 mx-auto`}
      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
    </motion.div>
    <h3 className="text-xs sm:text-base md:text-lg font-bold text-center text-[#2D2D2D] group-hover:text-[#8B0000] transition-colors min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center leading-snug">
      {title}
    </h3>
    <p className="text-center text-gray-500 mt-1.5 text-xs sm:text-sm">{count} साहित्य</p>
  </motion.div>
);

// Categories Section
const CategoriesSection = () => {
  const [worksList, setWorksList] = useState(sampleWorks);

  useEffect(() => {
    let isMounted = true;
    getWorks().then(data => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setWorksList(data);
      }
    }).catch(err => console.error('Failed to load works in HomePage:', err));
    return () => { isMounted = false; };
  }, []);

  const categories = [
    { key: 'All', icon: FileText, title: 'शोधनिबंध / समीक्षा लेख', count: worksList.length, color: 'bg-gradient-to-br from-[#8B0000] to-[#A52A2A]' },
    { key: 'Poetry', icon: Feather, title: 'कविता', count: worksList.filter(w => w.category === 'Poetry').length, color: 'bg-gradient-to-br from-[#2D5016] to-[#4A7023]' },
    { key: 'Short Stories', icon: BookOpen, title: 'कथा', count: worksList.filter(w => w.category === 'Short Stories').length, color: 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B]' },
    { key: 'Drama', icon: Globe, title: 'अनुवादित साहित्य', count: worksList.filter(w => w.category === 'Drama').length, color: 'bg-gradient-to-br from-[#6B4423] to-[#8B5A2B]' },
    { key: 'Translations', icon: Theater, title: 'पुस्तक परीक्षण', count: worksList.filter(w => w.category === 'Translations').length, color: 'bg-gradient-to-br from-[#4A5568] to-[#2D3748]' },
  ];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
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
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3">
            <Music className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B0000]" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8B0000]">साहित्य</h2>
            <Music className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B0000]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
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
  const allTitles = sampleWorks.map(w => w.title).join(' ✦ ');

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
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState({
    loading: false,
    success: false,
    message: ''
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) {
      setContactStatus({
        loading: false,
        success: false,
        message: 'कृपया ई-मेल आणि संदेश भरा.'
      });
      return;
    }

    setContactStatus({ loading: true, success: false, message: '' });

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
      const res = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setContactStatus({
          loading: false,
          success: true,
          message: data.message || 'तुमचा संदेश यशस्वीरित्या पाठवला गेला आहे!'
        });
        setContactForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        setContactStatus({
          loading: false,
          success: false,
          message: data.message || 'संदेश पाठवताना त्रुटी आली. कृपया नंतर प्रयत्न करा.'
        });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setContactStatus({
        loading: false,
        success: false,
        message: 'सर्व्हरशी संपर्क होऊ शकला नाही. कृपया सर्व्हर चालू असल्याची खात्री करा किंवा थेट trijya.sahitya@gmail.com वर ई-मेल पाठवा.'
      });
    }
  };

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

            {/* Main Centered Title: त्रिज्या with त्रैमासिक Tag on the right */}
            <div className="flex items-center justify-center mb-4 flex-nowrap">
              {/* Invisible phantom spacer on the left matching त्रैमासिक dimensions so त्रिज्या remains strictly centered */}
              <div
                className="invisible select-none pointer-events-none mr-1 sm:mr-1.5 flex-shrink-0 self-end mb-3 sm:mb-5 md:mb-8 lg:mb-12"
                aria-hidden="true"
              >
                <span className="inline-block text-xs sm:text-base md:text-xl lg:text-2xl font-bold border px-2 sm:px-3 sm:px-4 py-0.5 sm:py-1 rounded-full tracking-wider whitespace-nowrap">
                  त्रैमासिक
                </span>
              </div>

              {/* Perfectly centered त्रिज्या */}
              <motion.h1
                variants={itemVariants}
                className="font-marathi-yatra text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] bg-gradient-to-r from-[#FFFF55] via-[#FFEA00] via-[#FFD600] to-[#FFB700] bg-clip-text text-transparent inline-block py-4 sm:py-6 pl-2 sm:pl-4 md:pl-6 pr-0 relative select-none leading-normal tracking-wide flex-shrink-0"
                animate={{
                  filter: [
                    "drop-shadow(0 4px 8px rgba(0,0,0,0.95)) drop-shadow(0 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(255,234,0,0.7))",
                    "drop-shadow(0 6px 16px rgba(0,0,0,0.98)) drop-shadow(0 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 50px rgba(255,234,0,0.9)) drop-shadow(0 0 80px rgba(255,214,0,0.7))",
                    "drop-shadow(0 4px 8px rgba(0,0,0,0.95)) drop-shadow(0 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(255,234,0,0.7))"
                  ]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                त्रिज्या
                {/* Decorative sparkle */}
                <motion.span
                  className="absolute bottom-2 -left-2 md:bottom-6 md:-left-6 text-[#FFFF55] text-2xl sm:text-3xl md:text-4xl select-none"
                  style={{ filter: "drop-shadow(0 0 12px rgba(255,255,85,1))" }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.9, 1, 0.9], rotate: [0, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  ✦
                </motion.span>
              </motion.h1>

              {/* Smaller त्रैमासिक placed immediately where त्रिज्या ends, bottom level aligned exactly with त्रिज्या */}
              <motion.div
                variants={itemVariants}
                className="ml-1 sm:ml-1.5 select-none flex-shrink-0 self-end mb-3 sm:mb-5 md:mb-8 lg:mb-12"
              >
                <span className="inline-block text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-[#FFFF55] bg-[#8B0000]/85 border border-[#FFEA00]/60 px-2 sm:px-3 sm:px-4 py-0.5 sm:py-1 rounded-full shadow-lg backdrop-blur-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] tracking-wider whitespace-nowrap">
                  त्रैमासिक
                </span>
              </motion.div>
            </div>

            {/* Stylish Subtitle Pill */}
            <motion.div variants={itemVariants} className="mb-8 px-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-8 py-1.5 sm:py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-xl shadow-[#8B0000]/5 ring-4 ring-[#D4AF37]/15 max-w-full">
                <span className="text-[#D4AF37] text-xs sm:text-base select-none">✦</span>
                <TypewriterText
                  text="मराठी भाषा- साहित्य व संशोधन यासाठीचा मंच"
                  className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-[#8B0000] tracking-wide"
                />
                <span className="text-[#D4AF37] text-xs sm:text-base select-none">✦</span>
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

      <AnimatedDivider />

      {/* Contact Section */}
      <section className="py-14 relative overflow-hidden bg-gradient-to-b from-[#FFF8E7] via-[#FDFBF7] to-[#F5E6D3]">
        {/* Subtle decorative background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q45 15 45 30 Q45 50 30 55 Q15 50 15 30 Q15 15 30 5' fill='none' stroke='%238B0000' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#D4AF37]/40 overflow-hidden">
            {/* Top decorative accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]" />

            <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
              {/* LEFT DIV – Contact Information */}
              <div className="md:w-1/2 space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#8B0000] mb-1 flex items-center gap-2">
                    संपर्क साधा
                  </h3>
                  <div className="w-12 h-0.5 bg-[#D4AF37] mb-4" />
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <a href="mailto:trijya.sahitya@gmail.com" className="text-gray-700 hover:text-[#8B0000] font-medium transition-colors break-all sm:break-normal">
                      trijya.sahitya@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <a href="tel:+919450533466" className="text-gray-700 hover:text-[#8B0000] font-medium transition-colors">
                      +91 9450533466
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700 font-medium">वाराणसी, उत्तर प्रदेश, भारत</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    आम्हाला तुमच्या प्रतिक्रिया, सूचना किंवा योगदानाची प्रतीक्षा आहे!
                  </p>
                </div>
              </div>

              {/* RIGHT DIV – Contact Form */}
              <div className="md:w-1/2">
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  {contactStatus.message && (
                    <div
                      className={`p-3 rounded-lg text-sm flex items-start gap-2.5 transition-all ${
                        contactStatus.success
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {contactStatus.success ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="leading-snug">{contactStatus.message}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="firstName"
                      value={contactForm.firstName}
                      onChange={handleContactChange}
                      placeholder="पहिले नाव (First Name)"
                      className="w-full rounded-lg bg-[#FFF8E7]/40 border border-[#D4AF37]/40 text-gray-800 placeholder-gray-400 px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B0000] focus:border-[#8B0000] focus:bg-white transition"
                    />

                    <input
                      type="text"
                      name="lastName"
                      value={contactForm.lastName}
                      onChange={handleContactChange}
                      placeholder="आडनाव (Last Name)"
                      className="w-full rounded-lg bg-[#FFF8E7]/40 border border-[#D4AF37]/40 text-gray-800 placeholder-gray-400 px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B0000] focus:border-[#8B0000] focus:bg-white transition"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    required
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="ई-मेल (Email) *"
                    className="w-full rounded-lg bg-[#FFF8E7]/40 border border-[#D4AF37]/40 text-gray-800 placeholder-gray-400 px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B0000] focus:border-[#8B0000] focus:bg-white transition"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    placeholder="फोन नंबर (Phone Number)"
                    className="w-full rounded-lg bg-[#FFF8E7]/40 border border-[#D4AF37]/40 text-gray-800 placeholder-gray-400 px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B0000] focus:border-[#8B0000] focus:bg-white transition"
                  />

                  <textarea
                    rows="3"
                    name="message"
                    required
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="तुमचा संदेश (Message) *"
                    className="w-full rounded-lg bg-[#FFF8E7]/40 border border-[#D4AF37]/40 text-gray-800 placeholder-gray-400 px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B0000] focus:border-[#8B0000] focus:bg-white transition"
                  />

                  {/* SEND BUTTON */}
                  <button
                    type="submit"
                    disabled={contactStatus.loading}
                    className="w-full mt-2 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] hover:from-[#A52A2A] hover:to-[#8B0000] text-white text-sm font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {contactStatus.loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>संदेश पाठवत आहे...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>संदेश पाठवा (Send Message)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
