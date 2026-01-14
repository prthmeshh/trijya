import React from 'react';
import { motion } from 'framer-motion';

const AnimatedDivider = ({ type = 'horizontal', className = '' }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  };

  if (type === 'warli') {
    return (
      <div className={`w-full h-12 flex items-center justify-center overflow-hidden ${className}`}>
        <motion.svg
          width="100%"
          height="40"
          viewBox="0 0 1000 40"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[#8B0000]"
        >
          {/* Simple geometric Warli-inspired pattern */}
          <motion.path
            d="M0 20 L50 20 L60 10 L70 30 L80 10 L90 30 L100 20 L150 20 L160 10 L170 30 L180 10 L190 30 L200 20 L250 20 L260 10 L270 30 L280 10 L290 30 L300 20 L350 20 L360 10 L370 30 L380 10 L390 30 L400 20 L450 20 L460 10 L470 30 L480 10 L490 30 L500 20 L550 20 L560 10 L570 30 L580 10 L590 30 L600 20 L650 20 L660 10 L670 30 L680 10 L690 30 L700 20 L750 20 L760 10 L770 30 L780 10 L790 30 L800 20 L850 20 L860 10 L870 30 L880 10 L890 30 L900 20 L950 20 L960 10 L970 30 L980 10 L990 30 L1000 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            variants={draw}
          />
        </motion.svg>
      </div>
    );
  }

  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-full max-w-lg"
      />
    </div>
  );
};

export default AnimatedDivider;