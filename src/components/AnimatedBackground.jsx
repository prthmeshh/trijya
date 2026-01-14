import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


const AnimatedBackground = ({ children, variant = 'default' }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#F5E6D3] via-[#FFF8E7] to-[#F5E6D3]">
        {/* Decorative Circles */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8B0000] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"
        />
        
        {/* Warli Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B0000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;