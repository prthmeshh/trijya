import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Sparkles, ChevronRight, PenTool } from 'lucide-react';
import { works, authors } from "../data/sampleData";
import AnimatedDivider from "../components/AnimatedDivider";
import { Button } from "../components/ui/button";

// Simple Counter Component
const Counter = ({ from, to, duration }) => {
  const [count, setCount] = React.useState(from);
  
  React.useEffect(() => {
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * (to - from) + from));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{count}</span>;
};

const HomePage = () => {
  const featuredWorks = works.slice(0, 4);
  const featuredAuthors = authors.slice(0, 3);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

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
        <title>साहित्य सागर - Marathi Literary Journal</title>
        <meta name="description" content="Celebrating the rich heritage of Marathi literature through poetry, stories, essays, and cultural narratives" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 overflow-hidden min-h-[600px] flex items-center justify-center">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1615071197993-8abab2162d0c?w=1920')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(139, 0, 0, 0.05) 50px, rgba(139, 0, 0, 0.05) 52px),
                             repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(139, 0, 0, 0.05) 50px, rgba(139, 0, 0, 0.05) 52px)`
          }}></div>
          {/* Optional dark overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4">
              <span className="px-5 py-1.5 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] rounded-full border border-[#D4AF37] text-[#D4AF37] font-bold text-xs shadow-lg tracking-wider">
                मराठी साहित्याचा खजिना
              </span>
            </motion.div>
            
            {/* Updated Hero Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#2D5016] bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
            >
              TRIJYA
            </motion.h1>
            
<motion.p 
  variants={itemVariants}
  className="text-xl md:text-2xl text-[#2D2D2D] mb-8 font-medium"
>
  मराठी साहित्याच्या समृद्ध परंपरेचा आस्वाद घ्या
</motion.p>
            
<motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mb-12">
  <Link to="/works">
    <Button 
      variant="outline" 
      size="lg" 
      className="rounded-full bg-white/50 backdrop-blur-sm hover:bg-white border-[#8B0000] text-[#8B0000] flex items-center"
    >
      <BookOpen className="w-5 h-5 mr-2" />
      साहित्य वाचा
    </Button>
  </Link>

  <Link to="/authors">
    <Button 
      variant="outline" 
      size="lg" 
      className="rounded-full bg-white/50 backdrop-blur-sm hover:bg-white border-[#8B0000] text-[#8B0000] flex items-center"
    >
      <Users className="w-5 h-5 mr-2" />
      लेखक भेटा
    </Button>
  </Link>
</motion.div>


            {/* Statistics */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-[#D4AF37]/30 shadow-lg"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[#8B0000]">
                  <Counter from={0} to={works.length} duration={2} />+
                </div>
                <div className="text-sm text-gray-700 font-semibold">साहित्यिक कृती</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2D5016]">
                  <Counter from={0} to={authors.length} duration={2} />+
                </div>
                <div className="text-sm text-gray-700 font-semibold">लेखक</div>
              </div>
              <div className="col-span-2 md:col-span-1 text-center">
                <div className="text-3xl font-bold text-[#D4AF37]">∞</div>
                <div className="text-sm text-gray-700 font-semibold">प्रेरणा</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatedDivider type="warli" />

      {/* Featured Works Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#F5E6D3]">
        <div className="container mx-auto px-4">
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
                    whileHover={{ y: -10 }}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#D4AF37]/20 h-full flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={work.coverImage} 
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/90 to-transparent opacity-80"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                         <span className="inline-block bg-[#D4AF37] text-[#8B0000] px-2 py-0.5 rounded text-[10px] font-bold mb-1">
                          {work.categoryMarathi}
                        </span>
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
                      <div className="text-[#8B0000] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        वाचा <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/works">
              <Button variant="secondary" className="rounded-full">
                सर्व साहित्य पहा <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Featured Authors Section */}
      <section className="py-16 bg-[#FFF8E7]">
        <div className="container mx-auto px-4">
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <Link to={`/author/${author.id}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#D4AF37]/10"
                  >
                    <div className="h-24 bg-gradient-to-r from-[#2D5016] to-[#4A7023]"></div>
                    <div className="px-6 pb-6 relative">
                      <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                        <img 
                          src={author.image} 
                          alt={author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
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
                          <span className="flex items-center text-[#2D5016] font-semibold">
                            प्रोफाइल पहा <ChevronRight className="w-3 h-3 ml-1" />
                          </span>
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
              <Button variant="outline" className="border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016] hover:text-white rounded-full">
                सर्व लेखक पहा <Users className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden bg-[#8B0000] text-white">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #D4AF37 20px, #D4AF37 22px)`
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              मराठी साहित्याचा प्रवास सुरू करा
            </h2>
            <p className="text-lg text-[#F5E6D3] mb-8">
              हजारो वर्षांच्या समृद्ध साहित्यिक परंपरेचा आस्वाद घ्या आणि आपल्या संस्कृतीशी जोडून राहा.
            </p>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#D4AF37] text-[#8B0000] rounded-full font-bold text-lg shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 inline-flex items-center gap-2"
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




