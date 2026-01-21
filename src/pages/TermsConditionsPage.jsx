import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Mail, Globe, Shield, Users, AlertCircle, Scale, BookOpen, Link2, Gavel, ChevronRight } from 'lucide-react';

const TermsConditionsPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const sections = [
        {
            id: 1,
            title: 'संकेतस्थळाचा उद्देश',
            icon: BookOpen,
            content: [
                {
                    text: 'त्रिज्या हे एक मराठी साहित्यिक व्यासपीठ आहे जिथे लेखक, कवी, विचारवंत व कलाकार आपले साहित्य प्रकाशित करतात आणि वाचक ते वाचू शकतात.',
                    note: 'हे व्यासपीठ शैक्षणिक, साहित्यिक व सांस्कृतिक उद्देशासाठी आहे.'
                }
            ]
        },
        {
            id: 2,
            title: 'वापरकर्त्यांची पात्रता',
            icon: Users,
            content: [
                {
                    list: [
                        'वेबसाईट वापरण्यासाठी वापरकर्ता किमान १८ वर्षांचा असावा.',
                        'अल्पवयीन वापरकर्त्यांनी पालकांच्या संमतीनेच वापर करावा.',
                        'वापरकर्त्याने दिलेली माहिती खरी व अचूक असावी.'
                    ]
                }
            ]
        },
        {
            id: 3,
            title: 'साहित्य सादरीकरणाचे नियम',
            icon: FileText,
            content: [
                {
                    text: 'लेखकांनी साहित्य पाठवताना खालील अटी पाळाव्यात:',
                    list: [
                        'साहित्य स्वतःचे मूळ असावे.',
                        'कोणत्याही प्रकारचे चोरीचे (Plagiarism) साहित्य स्वीकारले जाणार नाही.',
                        'आक्षेपार्ह, अश्लील, द्वेषपूर्ण, जातीय, धार्मिक किंवा कायद्याचे उल्लंघन करणारे साहित्य नाकारले जाईल.',
                        'संपादक मंडळाला साहित्य स्वीकारण्याचा किंवा नाकारण्याचा पूर्ण अधिकार असेल.',
                        'आवश्यक असल्यास भाषिक किंवा स्वरूपातील किरकोळ संपादन केले जाऊ शकते.'
                    ]
                }
            ]
        },
        {
            id: 4,
            title: 'कॉपीराइट व हक्क',
            icon: Shield,
            content: [
                {
                    list: [
                        'लेखक त्यांच्या साहित्याचे संपूर्ण मालक राहतील.',
                        'लेखकाने साहित्य पाठवल्यावर त्रिज्या ला ते प्रकाशित, प्रदर्शित व प्रचार करण्याची परवानगी मिळते.',
                        'लेखकाची पूर्वपरवानगीशिवाय व्यावसायिक वापर केला जाणार नाही.',
                        'वेबसाईटवरील साहित्याची परवानगीशिवाय पुनर्मुद्रण, कॉपी किंवा वितरण करू नये.'
                    ]
                }
            ]
        },
        {
            id: 5,
            title: 'वाचकांचे वर्तन नियम',
            icon: Users,
            content: [
                {
                    text: 'वाचकांनी खालील नियम पाळणे आवश्यक आहे:',
                    list: [
                        'सभ्य आणि सुसंस्कृत वर्तन करणे',
                        'अपमानास्पद टिप्पणी टाळणे',
                        'स्पॅम किंवा जाहिरात टाळणे',
                        'कोणतेही कायदेशीर उल्लंघन न करणे'
                    ],
                    note: 'नियमांचे उल्लंघन केल्यास वापरकर्ता प्रतिबंधित केला जाऊ शकतो.'
                }
            ]
        },
        {
            id: 6,
            title: 'तांत्रिक मर्यादा व जबाबदारी',
            icon: AlertCircle,
            content: [
                {
                    list: [
                        'वेबसाईट सातत्याने उपलब्ध ठेवण्याचा प्रयत्न केला जातो, मात्र तांत्रिक अडचणी संभवतात.',
                        'माहितीतील चुका, टायपो किंवा तांत्रिक त्रुटींसाठी संस्था जबाबदार राहणार नाही.',
                        'कोणत्याही प्रकारच्या नुकसानासाठी वेबसाईट जबाबदार राहणार नाही.'
                    ]
                }
            ]
        },
        {
            id: 7,
            title: 'तृतीय पक्ष दुवे',
            icon: Link2,
            content: [
                {
                    text: 'वेबसाईटवर इतर वेबसाईट्सचे दुवे असू शकतात. त्या वेबसाईट्सच्या धोरणांसाठी आम्ही जबाबदार नाही.'
                }
            ]
        },
        {
            id: 8,
            title: 'गोपनीयता धोरण',
            icon: Shield,
            content: [
                {
                    text: 'वापरकर्त्यांची माहिती आमच्या गोपनीयता धोरणानुसार हाताळली जाते.',
                    linkText: 'गोपनीयता धोरण पहा',
                    linkTo: '/privacy-policy'
                }
            ]
        },
        {
            id: 9,
            title: 'अटींमध्ये बदल',
            icon: FileText,
            content: [
                {
                    text: 'या अटी व शर्ती कोणत्याही वेळी बदलल्या जाऊ शकतात. बदल वेबसाईटवर प्रसिद्ध केले जातील.'
                }
            ]
        },
        {
            id: 10,
            title: 'कायदेशीर अधिकार क्षेत्र',
            icon: Gavel,
            content: [
                {
                    text: 'या अटी भारताच्या कायद्यांनुसार नियंत्रित केल्या जातील. कोणताही वाद भारतीय न्यायालयांच्या अधिकारक्षेत्रात येईल.'
                }
            ]
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
        >
            <Helmet>
                <title>अटी व शर्ती - त्रिज्या</title>
                <meta name="description" content="त्रिज्या मराठी साहित्य मासिकाच्या अटी व शर्ती" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-6 md:py-10 overflow-hidden bg-gradient-to-br from-[#FFF8E7] via-[#F5E6D3] to-[#FFF8E7]">
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238B0000' stroke-width='0.5'%3E%3Ccircle cx='30' cy='10' r='4'/%3E%3Cpath d='M20 20 L30 35 L40 20 Z'/%3E%3C/g%3E%3C/svg%3E")`,
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
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#8B0000] to-[#A52A2A] rounded-2xl flex items-center justify-center shadow-xl border border-[#D4AF37]/30">
                                <Scale className="w-10 h-10 text-[#D4AF37]" />
                            </div>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#8B0000] drop-shadow-sm">
                            📜 अटी व शर्ती
                        </h1>
                        <p className="text-xl text-[#5D4037] mb-2 font-medium">
                            त्रिज्या - मराठी साहित्य मासिक
                        </p>
                        <p className="text-sm text-[#8B0000] bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full inline-block shadow-sm">
                            अंतिम अद्ययावत तारीख: २० जानेवारी २०२६
                        </p>

                        {/* Decorative line */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                            <div className="text-[#D4AF37] text-2xl">✦</div>
                            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#D4AF37]"
                    >
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            या वेबसाईटवर प्रवेश करून किंवा वापर करून आपण खालील अटी व शर्तींना पूर्णतः सहमती देता.
                        </p>
                        <div className="flex items-center gap-2 p-4 bg-[#FFF8E7] rounded-lg border border-[#D4AF37]/30">
                            <AlertCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0" />
                            <p className="text-[#8B0000] font-medium">
                                जर आपण या अटी मान्य करत नसाल तर कृपया वेबसाईटचा वापर करू नये.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Terms Sections */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        {sections.map((section) => (
                            <motion.div
                                key={section.id}
                                variants={itemVariants}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Section Header */}
                                <div className="bg-gradient-to-r from-[#8B0000] to-[#A52A2A] p-4 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <section.icon className="w-6 h-6 text-[#D4AF37]" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">
                                        {section.id}. {section.title}
                                    </h2>
                                </div>

                                {/* Section Content */}
                                <div className="p-6 space-y-4">
                                    {section.content.map((item, idx) => (
                                        <div key={idx} className="space-y-3">
                                            {item.text && (
                                                <p className="text-gray-700 leading-relaxed">
                                                    {item.text}
                                                </p>
                                            )}
                                            {item.list && (
                                                <ul className="space-y-2 ml-4">
                                                    {item.list.map((listItem, listIdx) => (
                                                        <motion.li
                                                            key={listIdx}
                                                            className="flex items-start gap-2 text-gray-700"
                                                            whileHover={{ x: 5 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <ChevronRight className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                                                            <span>{listItem}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            )}
                                            {item.note && (
                                                <div className="p-3 bg-[#FFF8E7] rounded-lg border-l-3 border-[#D4AF37] mt-3">
                                                    <p className="text-[#5D4037] italic text-sm">
                                                        📌 {item.note}
                                                    </p>
                                                </div>
                                            )}
                                            {item.linkTo && (
                                                <Link
                                                    to={item.linkTo}
                                                    className="inline-flex items-center gap-2 text-[#8B0000] hover:text-[#D4AF37] font-medium transition-colors"
                                                >
                                                    🔐 {item.linkText}
                                                    <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-gradient-to-br from-[#F5E6D3] via-[#FFF8E7] to-[#F5E6D3]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h2 className="text-3xl font-bold text-[#8B0000] mb-6">
                            ११. संपर्क माहिती
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            कोणत्याही शंका किंवा तक्रारीसाठी संपर्क करा:
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <motion.a
                                href="mailto:trijya@bhu.ac.in"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-[#D4AF37]/30"
                            >
                                <Mail className="w-6 h-6 text-[#8B0000]" />
                                <span className="text-[#8B0000] font-medium">trijya@bhu.ac.in</span>
                            </motion.a>
                            <motion.a
                                href="/"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-[#D4AF37]/30"
                            >
                                <Globe className="w-6 h-6 text-[#8B0000]" />
                                <span className="text-[#8B0000] font-medium">www.trijya.in</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default TermsConditionsPage;
