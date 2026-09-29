import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

// Gallery Data - Rectangular play cards with multiple images and captions
const galleryData = [
    {
        id: 1,
        title: 'प्रसिद्ध लेखक विश्वास पाटील यांची विभागाला सदिच्छा भेट',
        images: [
            '/images/gallery/vishwas-patil-1.jpg',
            '/images/gallery/vishwas-patil-2.jpg',
        ]
    },
    {
        id: 2,
        title: 'लेखक प्रशांत बागड विभागात…',
        images: [
            '/images/gallery/varanasi-ghat-1.jpg',
            '/images/gallery/varanasi-ghat-2.jpg',
            '/images/gallery/varanasi-ghat-3.jpg',
            '/images/gallery/varanasi-ghat-4.jpg',
        ]
    },
    {
        id: 3,
        title: 'विभागात गोमंतकीय कवयित्रींचे कवी संमेलन',
        images: [
            '/images/gallery/kavi-sammelan-1.jpg',
            '/images/gallery/kavi-sammelan-2.jpg',
        ]
    },
    {
        id: 4,
        title: 'साठ्ये महाविद्यालय, मुंबई, विद्यार्थी व शिक्षक',
        images: [
            '/images/gallery/sathye-college.jpg',
        ]
    },
    {
        id: 5,
        title: 'प्रा.उमेश बगाडे, डॉ.प्रमोद बागडे',
        images: [
            '/images/gallery/umesh-pramod.jpg',
        ]
    },
    {
        id: 6,
        title: 'डॉ.तेजस चव्हाण,दिल्ली विश्वविद्यालय आणि डॉ. रोहन चौधरी, जेएनयू',
        images: [
            '/images/gallery/sanskrutik-varsa.jpg',
        ]
    },
    {
        id: 7,
        title: 'डॉ. दिवाकर प्रधान आणि डॉ. तुकाराम रोंगटे',
        images: [
            '/images/gallery/diwakar-pradhan-tukaram-rongate.jpg',
        ]
    },
    {
        id: 8,
        title: 'विनोद राऊत, ब्युरो चीफ,  दै. सकाळ, मुंबई',
        images: [
            '/images/gallery/vinod-raut-sakal.jpg',
        ]
    }
];

// Image Card Component with multiple images slider
const GalleryCard = ({ item, onOpenLightbox }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => onOpenLightbox(item, currentImageIndex)}
        >
            {/* Rectangular Card */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/30 bg-gradient-to-br from-[#8B0000]/10 to-[#2D5016]/10">
                {/* Image */}
                <AnimatePresence mode="sync">
                    <motion.img
                        key={item.images[currentImageIndex]}
                        src={item.images[currentImageIndex]}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Navigation arrows */}
                {item.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#8B0000]" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        >
                            <ChevronRight className="w-5 h-5 text-[#8B0000]" />
                        </button>
                    </>
                )}

                {/* Image indicator dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {item.images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(i);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex
                                ? 'bg-[#D4AF37] scale-125 w-4'
                                : 'bg-white/60 hover:bg-white'
                                }`}
                        />
                    ))}
                </div>

                {/* Image count badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-white" />
                    <span className="text-xs text-white font-medium">{item.images.length}</span>
                </div>
            </div>

            {/* Caption below card */}
            <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-[#8B0000] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{item.caption}</p>
            </div>
        </motion.div>
    );
};

// Lightbox Component
const Lightbox = ({ item, currentIndex, onClose, onNavigate }) => {
    const [imageIndex, setImageIndex] = useState(currentIndex);

    const nextImage = () => {
        setImageIndex((prev) => (prev + 1) % item.images.length);
    };

    const prevImage = () => {
        setImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 md:-top-12 md:right-0 p-2 text-white hover:text-[#D4AF37] transition-colors z-30 bg-black/50 md:bg-transparent rounded-full"
                    aria-label="बंद करा"
                >
                    <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                {/* Image */}
                <AnimatePresence mode="sync">
                    <motion.img
                        key={item.images[imageIndex]}
                        src={item.images[imageIndex]}
                        alt={item.title}
                        className="max-w-full max-h-[70vh] md:max-h-[75vh] rounded-lg shadow-2xl object-contain mx-auto"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>

                {/* Navigation */}
                {item.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-16 p-2 md:p-3 bg-black/60 md:bg-white/20 hover:bg-white/40 rounded-full transition-all z-20 text-white"
                            aria-label="मागील"
                        >
                            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-16 p-2 md:p-3 bg-black/60 md:bg-white/20 hover:bg-white/40 rounded-full transition-all z-20 text-white"
                            aria-label="पुढील"
                        >
                            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                    </>
                )}

                {/* Caption */}
                <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">{item.title}</h3>
                    <p className="text-white/80">{item.caption}</p>
                    <div className="mt-3 text-white/60 text-sm">
                        {imageIndex + 1} / {item.images.length}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const GalleryPage = () => {
    const [lightboxItem, setLightboxItem] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (item, index) => {
        setLightboxItem(item);
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxItem(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
        >
            <Helmet>
                <title>छायाचित्रे - त्रिज्या</title>
                <meta name="description" content="त्रिज्या साहित्य मासिकाची छायाचित्र गॅलरी - सांस्कृतिक वारसा आणि साहित्यिक कार्यक्रम" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/hero/gallery-bg.jpg')` }}
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F5E6D3]/60 via-[#FFF8E7]/50 to-[#F5E6D3]/70" />
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238B0000' stroke-width='0.8'%3E%3Crect x='10' y='10' width='40' height='40' rx='3'/%3E%3Cline x1='30' y1='10' x2='30' y2='50'/%3E%3Cline x1='10' y1='30' x2='50' y2='30'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="inline-block mb-6"
                        >
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#8B0000] to-[#A52A2A] rounded-2xl flex items-center justify-center shadow-xl">
                                <ImageIcon className="w-10 h-10 text-[#D4AF37]" />
                            </div>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 text-[#8B0000] drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.6)' }}>
                            छायाचित्रे
                        </h1>
                        <div className="inline-flex items-center gap-1.5 sm:gap-3 px-3 sm:px-8 py-2 sm:py-3 rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37]/60 shadow-xl ring-2 sm:ring-4 ring-[#D4AF37]/15 max-w-[95vw]">
                            <span className="text-[#D4AF37] text-xs sm:text-base select-none">✦</span>
                            <p className="text-xs sm:text-base md:text-xl font-bold bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#8B0000] bg-clip-text text-transparent tracking-wide">
                                सांस्कृतिक वारसा, साहित्यिक कार्यक्रम आणि ऐतिहासिक स्थळांची छायाचित्रे
                            </p>
                            <span className="text-[#D4AF37] text-xs sm:text-base select-none">✦</span>
                        </div>

                        {/* Decorative line */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                            <div className="text-[#D4AF37] text-2xl">✦</div>
                            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                        {galleryData.map((item, index) => (
                            <GalleryCard
                                key={item.id}
                                item={item}
                                onOpenLightbox={openLightbox}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxItem && (
                    <Lightbox
                        item={lightboxItem}
                        currentIndex={lightboxIndex}
                        onClose={closeLightbox}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default GalleryPage;
