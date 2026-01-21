import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Mail, MapPin, Phone, Heart, Feather, ExternalLink } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { to: '/', label: 'मुख्यपृष्ठ' },
            { to: '/works', label: 'साहित्य' },
            { to: '/authors', label: 'लेखक' },
            { to: '/gallery', label: 'गॅलरी' },
            { to: '/about', label: 'आमच्याबद्दल' },
        ],
        categories: [
            { label: 'कविता', to: '/works' },
            { label: 'कथा', to: '/works' },
            { label: 'लेख', to: '/works' },
            { label: 'नाटक', to: '/works' },
            { label: 'ललित', to: '/works' },
        ],
    };

    return (
        <footer className="relative bg-gradient-to-br from-[#8B0000] via-[#A52A2A] to-[#8B0000] text-white overflow-hidden text-base">
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

            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <Link to="/" className="flex items-center gap-3 mb-4 group">
                            <div className="relative">
                                <BookOpen className="w-10 h-10 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute -inset-1 bg-[#D4AF37] opacity-20 blur-lg group-hover:opacity-40 transition-opacity" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-[#D4AF37]">त्रिज्या</h2>
                                <p className="text-sm text-[#F5E6D3]/80">Marathi Literary Journal</p>
                            </div>
                        </Link>
                        <p className="text-[#F5E6D3]/90 text-base leading-relaxed mb-4">
                            मराठी साहित्याच्या समृद्ध परंपरेचे जतन आणि प्रसार करणारे डिजिटल व्यासपीठ.
                            कविता, कथा, लेख आणि सांस्कृतिक वारसा एकत्र आणणारे साहित्यिक मासिक.
                        </p>
                        <div className="flex items-center gap-2 text-[#D4AF37]">
                            <Feather className="w-4 h-4" />
                            <span className="text-base italic">"शब्दांची शक्ती, विचारांची उंची"</span>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]" />
                            द्रुत दुवे
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.quickLinks.map((link, index) => (
                                <motion.li
                                    key={link.to}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        to={link.to}
                                        className="text-[#F5E6D3]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-base"
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
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]" />
                            साहित्य प्रकार
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.categories.map((category, index) => (
                                <motion.li
                                    key={category.label}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        to={category.to}
                                        className="text-[#F5E6D3]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-sm"
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
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#D4AF37]" />
                            संपर्क
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-base">
                                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                                <span className="text-[#F5E6D3]/80">
                                    मराठी विभाग, कला संकाय<br />
                                    काशी हिंदू विश्वविद्यालय<br />
                                    वाराणसी - 221005
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-base">
                                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                                <a href="mailto:trijya@bhu.ac.in" className="text-[#F5E6D3]/80 hover:text-[#D4AF37] transition-colors">
                                    trijya@bhu.ac.in
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-base">
                                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                                <span className="text-[#F5E6D3]/80">+91 542 XXXXXXX</span>
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
                    className="flex flex-col md:flex-row items-center justify-between gap-4 text-base text-[#F5E6D3]/70"
                >
                    <div className="flex items-center gap-1">
                        <span>© {currentYear} त्रिज्या. सर्व हक्क राखीव.</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <span>Made with</span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                        </motion.span>
                        <span>for मराठी साहित्य</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ boxShadow: ["0 0 0 rgba(212,175,55,0)", "0 0 15px rgba(212,175,55,0.4)", "0 0 0 rgba(212,175,55,0)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Link
                                to="/privacy-policy"
                                className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-lg text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#8B0000] transition-all duration-300 flex items-center gap-2 font-medium"
                            >
                                🔐 गोपनीयता धोरण
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ boxShadow: ["0 0 0 rgba(212,175,55,0)", "0 0 15px rgba(212,175,55,0.4)", "0 0 0 rgba(212,175,55,0)"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                            <Link
                                to="/terms-conditions"
                                className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-lg text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#8B0000] transition-all duration-300 flex items-center gap-2 font-medium"
                            >
                                📜 अटी व शर्ती
                            </Link>
                        </motion.div>
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
