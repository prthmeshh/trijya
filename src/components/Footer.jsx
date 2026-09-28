import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { to: '/', label: 'मुख्यपृष्ठ' },
            { to: '/works', label: 'साहित्य' },
            { to: '/about', label: 'आमच्याबद्दल' },
            { to: '/gallery', label: 'छायाचित्रे' },
        ],
        categories: [
            { label: 'शोधनिबंध / समीक्षा लेख', to: '/works?category=All' },
            { label: 'कविता', to: '/works?category=Poetry' },
            { label: 'कथा', to: '/works?category=Short%20Stories' },
            { label: 'अनुवादित साहित्य', to: '/works?category=Drama' },
            { label: 'पुस्तक परीक्षण', to: '/works?category=Translations' },
        ],
    };

    return (
        <footer className="relative bg-gradient-to-br from-[#8B0000] via-[#A52A2A] to-[#8B0000] text-white overflow-hidden text-lg">
            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.5'%3E%3Ccircle cx='30' cy='10' r='4'/%3E%3Cpath d='M20 20 L30 35 L40 20 Z'/%3E%3Cline x1='30' y1='35' x2='30' y2='50'/%3E%3Cline x1='20' y1='27' x2='10' y2='22'/%3E%3Cline x1='40' y1='27' x2='50' y2='22'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Golden Top Border with Animation */}
            <motion.div
                className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
            />

            <div className="container mx-auto px-6 md:px-12 py-14 relative z-10 max-w-7xl">
                {/* Main Footer Content - 3 Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-20 mb-12">

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col"
                    >
                        <h3 className="text-2xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]" />
                            द्रुत दुवे
                        </h3>
                        <ul className="space-y-3.5">
                            {footerLinks.quickLinks.map((link) => (
                                <motion.li
                                    key={link.to}
                                    whileHover={{ x: 6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        to={link.to}
                                        className="text-[#F5E6D3]/90 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2.5 text-lg md:text-xl font-medium"
                                    >
                                        <span className="text-[#D4AF37]">›</span>
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col"
                    >
                        <h3 className="text-2xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]" />
                            साहित्य
                        </h3>
                        <ul className="space-y-3.5">
                            {footerLinks.categories.map((category) => (
                                <motion.li
                                    key={category.label}
                                    whileHover={{ x: 6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        to={category.to}
                                        className="text-[#F5E6D3]/90 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2.5 text-lg md:text-xl font-medium"
                                    >
                                        <span className="text-[#D4AF37]">›</span>
                                        {category.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <h3 className="text-2xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]" />
                            संपर्क
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3.5 text-lg md:text-xl">
                                <MapPin className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                                <span className="text-[#F5E6D3]/90 leading-relaxed">
                                    मराठी विभाग, कला संकाय<br />
                                    काशी हिंदू विश्वविद्यालय<br />
                                    वाराणसी - 221005
                                </span>
                            </li>
                            <li className="flex items-center gap-3.5 text-lg md:text-xl">
                                <Mail className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                                <a href="mailto:trijya.sahitya@gmail.com" className="text-[#F5E6D3]/90 hover:text-[#D4AF37] transition-colors">
                                    trijya.sahitya@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3.5 text-lg md:text-xl">
                                <Phone className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                                <div className="flex flex-col space-y-2">
                                    <a href="tel:+918975928129" className="text-[#F5E6D3]/90 hover:text-[#D4AF37] transition-colors">
                                        +91 8975928129
                                    </a>
                                    <a href="tel:+919648882006" className="text-[#F5E6D3]/90 hover:text-[#D4AF37] transition-colors">
                                        +91 9648882006
                                    </a>
                                    <a href="tel:+919834539009" className="text-[#F5E6D3]/90 hover:text-[#D4AF37] transition-colors">
                                        +91 9834539009
                                    </a>
                                    <a href="tel:+919450533466" className="text-[#F5E6D3]/90 hover:text-[#D4AF37] transition-colors">
                                        +91 9450533466
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Divider with Decorations */}
                <div className="flex items-center justify-center gap-4 my-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-[#D4AF37] text-2xl"
                    >
                        ✦
                    </motion.div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 text-base md:text-lg text-[#F5E6D3]/80"
                >
                    <div className="flex items-center gap-1 font-medium">
                        <span>© {currentYear} त्रिज्या. सर्व हक्क राखीव.</span>
                    </div>

                    <div className="flex items-center gap-1 font-medium">
                        <span>Made with</span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                        </motion.span>
                        <span>for मराठी साहित्य</span>
                    </div>


                </motion.div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="20" cy="80" r="15" fill="#D4AF37" />
                    <path d="M10 60 L30 30 L50 60 Z" fill="none" stroke="#D4AF37" strokeWidth="1" />
                </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="80" cy="80" r="15" fill="#D4AF37" />
                    <path d="M50 60 L70 30 L90 60 Z" fill="none" stroke="#D4AF37" strokeWidth="1" />
                </svg>
            </div>
        </footer>
    );
};

export default Footer;
