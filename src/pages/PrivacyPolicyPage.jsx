import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Mail, Globe, Lock, FileText, Users, Database, Cookie, AlertCircle, Phone, ChevronRight } from 'lucide-react';

const PrivacyPolicyPage = () => {
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
            title: 'आम्ही कोणती माहिती गोळा करतो',
            icon: Database,
            content: [
                {
                    subtitle: '१.१ लेखक / योगदानकर्त्यांकडून मिळणारी माहिती:',
                    text: 'आपण साहित्य पाठविताना खालील माहिती आम्हाला देऊ शकता:',
                    list: [
                        'पूर्ण नाव',
                        'ई-मेल पत्ता',
                        'मोबाईल क्रमांक (ऐच्छिक)',
                        'थोडक्यात परिचय / जीवनवृत्त',
                        'छायाचित्र (ऐच्छिक)',
                        'साहित्यिक कृती (कविता, लेख, कथा, समीक्षा, चित्र, ऑडिओ, व्हिडिओ इ.)',
                        'सोशल मीडिया प्रोफाइल लिंक (ऐच्छिक)'
                    ],
                    note: 'ही माहिती लेखकाची ओळख जाहीर करण्यासाठी, संपर्कासाठी आणि साहित्य प्रकाशित करण्यासाठी वापरली जाते.'
                },
                {
                    subtitle: '१.२ वाचक / भेट देणाऱ्या वापरकर्त्यांकडून मिळणारी माहिती:',
                    text: 'वेबसाईट वापरताना आपोआप खालील तांत्रिक माहिती संकलित होऊ शकते:',
                    list: [
                        'IP Address',
                        'ब्राउझर प्रकार',
                        'डिव्हाइस माहिती (मोबाइल / संगणक)',
                        'भेट दिलेली पाने',
                        'वापराचा कालावधी',
                        'लोकेशन (साधारण स्तरावर)'
                    ],
                    note: 'ही माहिती केवळ वेबसाईट सुधारण्यासाठी व आकडेवारी विश्लेषणासाठी वापरली जाते.'
                },
                {
                    subtitle: '१.३ आम्ही काय गोळा करत नाही:',
                    list: [
                        'बँक तपशील',
                        'पासवर्ड',
                        'आधार / पॅन माहिती',
                        'संवेदनशील वैयक्तिक माहिती'
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'माहितीचा वापर कसा केला जातो',
            icon: FileText,
            content: [
                {
                    text: 'आपली माहिती खालील उद्देशांसाठी वापरली जाते:',
                    list: [
                        'लेखकांचे साहित्य वेबसाईटवर प्रकाशित करणे',
                        'लेखकाचे नाव व परिचय दर्शविणे',
                        'लेखकांशी संपर्क साधणे',
                        'वाचकांचा अनुभव सुधारण्यासाठी वेबसाईट डिझाइन आणि कार्यक्षमता सुधारणे',
                        'ट्रॅफिक विश्लेषण करणे',
                        'गैरवापर, स्पॅम किंवा सुरक्षा धोके रोखणे',
                        'कायदेशीर गरजा पूर्ण करणे'
                    ],
                    note: 'आपली वैयक्तिक माहिती कोणत्याही तृतीय पक्षाला विकली जात नाही.'
                }
            ]
        },
        {
            id: 3,
            title: 'साहित्याचे हक्क व मालकी',
            icon: Shield,
            content: [
                {
                    list: [
                        'लेखक आपल्या मूळ साहित्याचा पूर्ण मालक राहतो.',
                        'लेखकाने साहित्य पाठवल्यानंतर त्रिज्या ला ते प्रकाशित, प्रदर्शित, प्रचार व संग्रहित करण्याची परवानगी मिळते.',
                        'लेखकाची पूर्वपरवानगीशिवाय साहित्याचा व्यावसायिक वापर केला जाणार नाही.',
                        'लेखक इच्छित असल्यास भविष्यात आपले साहित्य हटविण्याची विनंती करू शकतो.'
                    ]
                }
            ]
        },
        {
            id: 4,
            title: 'कुकीज (Cookies) धोरण',
            icon: Cookie,
            content: [
                {
                    text: 'आमची वेबसाईट कुकीज वापरू शकते:',
                    list: [
                        'वेबसाईट वेगवान व सुलभ करण्यासाठी',
                        'वापरकर्त्यांचे वर्तन समजून घेण्यासाठी',
                        'विश्लेषणासाठी'
                    ],
                    note: 'आपण आपल्या ब्राउझर सेटिंग्समधून कुकीज बंद करू शकता.'
                }
            ]
        },
        {
            id: 5,
            title: 'माहितीची सुरक्षितता',
            icon: Lock,
            content: [
                {
                    text: 'आम्ही आपली माहिती सुरक्षित ठेवण्यासाठी योग्य तांत्रिक व प्रशासकीय उपाययोजना करतो.',
                    note: 'तरीही इंटरनेटवर १००% सुरक्षितता शक्य नसते याची जाणीव ठेवावी.'
                }
            ]
        },
        {
            id: 6,
            title: 'तृतीय पक्ष सेवा (Third-Party Services)',
            icon: Globe,
            content: [
                {
                    text: 'आम्ही खालील सेवा वापरू शकतो:',
                    list: [
                        'वेबसाईट होस्टिंग सेवा',
                        'विश्लेषण सेवा (उदा. Google Analytics)',
                        'क्लाउड स्टोरेज'
                    ],
                    note: 'या सेवा त्यांच्या स्वतःच्या गोपनीयता धोरणानुसार माहिती वापरू शकतात.'
                }
            ]
        },
        {
            id: 7,
            title: 'वापरकर्त्यांचे हक्क',
            icon: Users,
            content: [
                {
                    text: 'आपल्याला खालील अधिकार आहेत:',
                    list: [
                        'आपली माहिती पाहण्याचा अधिकार',
                        'चुकीची माहिती दुरुस्त करण्याचा अधिकार',
                        'आपली माहिती हटविण्याची विनंती करण्याचा अधिकार',
                        'प्रकाशित साहित्य हटविण्याची मागणी करण्याचा अधिकार'
                    ],
                    note: 'यासाठी आम्हाला ई-मेलद्वारे संपर्क साधावा.'
                }
            ]
        },
        {
            id: 8,
            title: 'अल्पवयीन वापरकर्ते',
            icon: AlertCircle,
            content: [
                {
                    text: '१८ वर्षांखालील व्यक्तींनी पालकांच्या संमतीशिवाय वैयक्तिक माहिती देऊ नये.'
                }
            ]
        },
        {
            id: 9,
            title: 'धोरणात बदल',
            icon: FileText,
            content: [
                {
                    text: 'हे गोपनीयता धोरण वेळोवेळी अद्ययावत केले जाऊ शकते. बदल वेबसाईटवर प्रकाशित केले जातील.'
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
                <title>गोपनीयता धोरण - त्रिज्या</title>
                <meta name="description" content="त्रिज्या मराठी साहित्य मासिकाचे गोपनीयता धोरण" />
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
                                <Shield className="w-10 h-10 text-[#D4AF37]" />
                            </div>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#8B0000] drop-shadow-sm">
                            🔐 गोपनीयता धोरण
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
                            <strong className="text-[#8B0000]">त्रिज्या</strong> हे मराठी साहित्यिक नियतकालिक (जर्नल) असून लेखक, कवी, विचारवंत, संशोधक आणि कलाकार यांच्याकडून साहित्य स्वीकारून ते वाचकांसाठी ऑनलाईन प्रकाशित करते.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            आपली गोपनीयता आमच्यासाठी अत्यंत महत्त्वाची आहे. या गोपनीयता धोरणामध्ये आम्ही कोणती माहिती गोळा करतो, ती कशी वापरतो, कशी सुरक्षित ठेवतो आणि आपले हक्क काय आहेत याची सविस्तर माहिती दिलेली आहे.
                        </p>
                        <div className="flex items-center gap-2 p-4 bg-[#FFF8E7] rounded-lg border border-[#D4AF37]/30">
                            <AlertCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0" />
                            <p className="text-[#8B0000] font-medium">
                                ही वेबसाईट वापरताना आपण या धोरणास सहमती दर्शविता.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        {sections.map((section, index) => (
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
                                            {item.subtitle && (
                                                <h3 className="text-lg font-semibold text-[#8B0000]">
                                                    {item.subtitle}
                                                </h3>
                                            )}
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
                            १०. संपर्क माहिती
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            कोणत्याही प्रश्नासाठी संपर्क करा:
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

export default PrivacyPolicyPage;
