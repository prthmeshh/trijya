import React from 'react';
// import onee from "../assets/onee.png";
import namdev from "../assets/namdev.jpeg";
import pramod from "../assets/pramod.jpeg";
import sandeep from "../assets/sandeep.jpeg";
import bhu from "../assets/bhu.png";
import firstabove from "../assets/firstabove.png";
import akshay from "../assets/akshay.jpeg";
import komal from "../assets/komal.jpeg";
import nishant from "../assets/nishant.jpeg";
import tanuj from "../assets/tanuj.jpeg";
import vishal from "../assets/vishal.jpeg";
import chandrani from "../assets/chandrani.jpeg";
// import secondbelow from "../assets/secondbelow.png";
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Users, Target, Mail, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa"

const AboutPage = () => {

  const teamMembers = [
    {
      name: 'डॉ. प्रमोद पडवळ',
      // role: 'मुख्य संपादक',
      image: pramod,
      position: 'object-[50%_15%]',
      whatsapp: 'https://wa.me/919450533466',
      cv: '/pdfs/pramod-padwal-cv.pdf'
    },
    {
      name: 'डॉ. नामदेव गपाटे',
      // role: 'सह संपादक', 
      image: namdev,
      whatsapp: 'https://wa.me/919648882006',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/namdev-gapte-cv.pdf'
    },
    {
      name: 'डॉ. संदीप भुयेकर',
      // role: 'सह संपादक', 
      image: sandeep,
      whatsapp: 'https://wa.me/919834539009',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/prathamesh-padwal-cv.pdf'
    },
    {
      name: 'डॉ. ताहेरखान पठाण',
      image: '/images/team/editor4.jpg',
      whatsapp: 'https://wa.me/91',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/taherkhan-pathan-cv.pdf'
    },
    {
      name: 'डॉ. सुमेध रणवीर',
      image: '/images/team/editor5.jpg',
      whatsapp: 'https://wa.me/91',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/sumedh-ranveer-cv.pdf'
    }
  ];

  const advisoryMembers = [
    {
      name: 'अक्षय चुरी',
      // role: 'साहित्य सल्लागार',
      image: akshay,
      whatsapp: 'https://wa.me/919834340889',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/advisor1.pdf'
    },
    {
      name: 'विशाल राठोड',
      // role: 'भाषा तज्ञ',
      image: vishal,
      whatsapp: 'https://wa.me/918975938129',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/advisor2.pdf'
    }
  ];

  const volunteerMembers = [
    {
      name: 'चंद्राणी कुमारी',
      // role: 'समन्वयक',
      image: chandrani,
      whatsapp: 'https://wa.me/919113472172',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/volunteer1.pdf'
    },
    {
      name: 'कोमल पाठक',
      // role: 'डिझाईन सहाय्यक',
      image: komal,
      whatsapp: 'https://wa.me/919839959821',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/volunteer2.pdf'
    },
    {
      name: 'निशांत कुमार भाष्कर',
      // role: 'तांत्रिक सहाय्य',
      image: nishant,
      whatsapp: 'https://wa.me/919695512724',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/volunteer3.pdf'
    },
    {
      name: 'तनुज कुमार',
      // role: 'सामग्री लेखन',
      image: tanuj,
      whatsapp: 'https://wa.me/919693867441',
      linkedin: 'https://linkedin.com',
      cv: '/pdfs/volunteer4.pdf'
    }
  ];




  return (
    <>
      <Helmet>
        <title>आमच्याविषयी - साहित्य सागर</title>
        <meta name="description" content="साहित्य सागर - मराठी साहित्य आणि संस्कृतीचा उत्सव" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-12 overflow-hidden min-h-[300px] flex items-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${bhu})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Warli Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #8B0000 20px, #8B0000 22px)`
        }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* <div className="inline-block mb-4 px-5 py-1.5 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] rounded-full border-2 border-[#D4AF37]">
              <span className="text-[#D4AF37] font-semibold text-xs">आमच्याविषयी</span>
            </div> */}

            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#8B0000]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
              त्रिज्या
            </h1>

            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#2D5016] bg-clip-text text-transparent">
              बृहन्महाराष्ट्राची द्वैभाषिक साहित्य पत्रिका
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]">
                <img
                  src={firstabove}
                  alt="Mission"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/60 to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-[#8B0000]" />
                <h2 className="text-3xl font-bold text-[#8B0000]">आमचे ध्येय</h2>
              </div>

              <div className="space-y-3 text-gray-700 text-base leading-relaxed">
                <p>
                  साहित्य सागर हे मराठी साहित्याच्या समृद्ध परंपरेला जपण्यासाठी आणि नव्या पिढीपर्यंत पोहोचवण्यासाठी समर्पित आहे.
                </p>

                <p>
                  आमचे ध्येय आहे मराठी भाषा, साहित्य आणि संस्कृतीचा प्रचार-प्रसार करणे. कविता, कथा, निबंध, नाटक आणि भाषांतरांच्या माध्यमातून आम्ही महाराष्ट्राची सांस्कृतिक वारसा जपत आहोत.
                </p>

                <p>
                  प्रत्येक साहित्यिक कृती ही एक अनमोल रत्न आहे. आम्ही या रत्नांचा खजिना जगासमोर आणत आहोत.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-10 bg-gradient-to-b from-[#F5E6D3] to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-[#A52A2A]" />
                <h2 className="text-3xl font-bold text-[#A52A2A]">आमची दृष्टी</h2>
              </div>

              <div className="space-y-3 text-gray-700 text-base leading-relaxed">
                <p>
                  मराठी साहित्याला जागतिक पातळीवर ओळख मिळवून देणे आणि नवीन लेखकांना प्रोत्साहन देणे ही आमची दृष्टी आहे.
                </p>

                <p>
                  आम्ही एक असे मंच तयार करू इच्छितो जिथे जुने आणि नवीन, दोन्ही पिढ्यांचे साहित्य एकत्र येईल. जिथे वाचक आणि लेखक यांच्यात सुंदर संवाद साधला जाईल.
                </p>

                <p>
                  मराठी भाषेची समृद्धी, साहित्याची विविधता आणि संस्कृतीचे सौंदर्य - हे सर्व जपणे आणि वाढवणे हे आमचे कर्तव्य आहे.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]">
                <img
                  src={firstabove}
                  alt="Vision"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#A52A2A]/60 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-[#2D5016]" />
              <h2 className="text-3xl font-bold text-[#2D5016]">आमचा इतिहास</h2>
            </div>

            <div className="bg-gradient-to-br from-[#F5E6D3] to-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-[#D4AF37]/30">
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                साहित्य सागराची स्थापना २०१५ मध्ये मराठी साहित्याच्या प्रेमींनी केली. तेव्हापासून आम्ही सुरळीतपणे मराठी साहित्याच्या विविध प्रकारांना मंच देत आहोत.
              </p>

              <p className="text-gray-700 text-base leading-relaxed mb-4">
                गेल्या आठ वर्षांत आम्ही १००+ लेखकांना मंच दिला आहे आणि ५००+ साहित्यिक कृती प्रकाशित केल्या आहेत. आमच्या वाचक समुदायात आता ५०,००० सदस्य आहेत.
              </p>

              <p className="text-gray-700 text-base leading-relaxed">
                आज साहित्य सागर हे मराठी साहित्याचे एक प्रतिष्ठित नाव बनले आहे. आम्ही सतत नवीन साहित्यिक प्रयोगांना प्रोत्साहन देत असतो आणि मराठी भाषेच्या संवर्धनासाठी काम करत असतो.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 bg-gradient-to-b from-[#F5E6D3] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Users className="w-8 h-8 text-[#8B0000]" />
              <h2 className="text-3xl font-bold text-[#8B0000]">आमची टीम</h2>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000] bg-clip-text text-transparent">
              संपादक मंडळ
            </h3>
          </motion.div>

          {/* All Editors in Single Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#D4AF37]/20"
              >
                <div className="h-1.5 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#2D5016]"></div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-[#8B0000] mb-1">{member.name}</h3>
                  <p className="text-[#D4AF37] font-bold italic text-sm mb-3">{member.role}</p>

                  {/* Social Icons */}
                  <div className="flex justify-center gap-4 mb-3">
                    <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition-transform">
                      <FaWhatsapp size={20} />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:scale-110 transition-transform">
                      <FaLinkedinIn size={20} />
                    </a>
                  </div>

                  {/* Download CV Button */}
                  <a
                    href={member.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#D4AF37] text-[#8B0000] font-semibold px-4 py-2 rounded-lg hover:bg-[#8B0000] hover:text-[#D4AF37] transition-colors"
                  >
                    Download CV
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-12"></div>

          {/* Advisory Board Section */}
          <section className="py-10 bg-gradient-to-b from-[#F5E6D3] to-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                {/* <div className="flex items-center justify-center gap-3 mb-3">
        <Users className="w-8 h-8 text-[#2D5016]" />
        <h2 className="text-3xl font-bold text-[#2D5016]">
          सल्लागार मंडळ
        </h2>
      </div> */}
                <p className="text-gray-600 text-base font-bold">
                  सहायक संपादक : मराठी विभाग
                </p>

              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {advisoryMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#D4AF37]/20"
                  >
                    <div className="h-1.5 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#2D5016]"></div>

                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-[#8B0000] mb-1">
                        {member.name}
                      </h3>

                      <p className="text-[#D4AF37] font-semibold text-sm mb-3">
                        {member.role}
                      </p>

                      {/* Social Icons */}
                      <div className="flex justify-center gap-4 mb-3">
                        <a
                          href={member.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:scale-110 transition-transform"
                        >
                          <FaWhatsapp size={20} />
                        </a>

                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-800 hover:scale-110 transition-transform"
                        >
                          <FaLinkedinIn size={20} />
                        </a>
                      </div>

                      {/* Download CV Button */}
                      <a
                        href={member.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#D4AF37] text-[#8B0000] font-semibold px-4 py-2 rounded-lg hover:bg-[#8B0000] hover:text-[#D4AF37] transition-colors"
                      >
                        Download CV
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Volunteers Section */}
          <section className="py-10 bg-gradient-to-b from-[#F5E6D3] to-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                {/* <div className="flex items-center justify-center gap-3 mb-3">
        <Users className="w-8 h-8 text-[#2D5016]" />
        <h2 className="text-3xl font-bold text-[#2D5016]">
          स्वयंसेवक टीम
        </h2>
      </div> */}
                <p className="text-gray-600 text-base font-bold">
                  सहायक संपादक : हिंदी विभाग
                </p>

              </motion.div>

              {/* 👇 GRID UPDATED TO 4 COLUMNS */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {volunteerMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#D4AF37]/20"
                  >
                    <div className="h-1.5 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#2D5016]"></div>

                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="text-base font-bold text-[#8B0000] mb-1">
                        {member.name}
                      </h3>

                      <p className="text-[#D4AF37] font-semibold text-sm mb-3">
                        {member.role}
                      </p>

                      {/* Social Icons */}
                      <div className="flex justify-center gap-3 mb-3">
                        <a
                          href={member.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:scale-110 transition-transform"
                        >
                          <FaWhatsapp size={18} />
                        </a>

                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-800 hover:scale-110 transition-transform"
                        >
                          <FaLinkedinIn size={18} />
                        </a>
                      </div>

                      {/* Download CV Button */}
                      <a
                        href={member.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#D4AF37] text-[#8B0000] font-semibold px-3 py-1.5 rounded-md hover:bg-[#8B0000] hover:text-[#D4AF37] transition-colors text-sm"
                      >
                        Download CV
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>




        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#8B0000]">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-[#D4AF37]/80">
          <div className="flex flex-col md:flex-row gap-6">

            {/* LEFT DIV – Contact Information */}
            <div className="md:w-1/2 space-y-5">
              <div className="space-y-3">

                <div className="flex items-center gap-2.5 text-white text-sm">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>contact.trijya@gmail.com</span>
                </div>

                <div className="flex items-center gap-2.5 text-white text-sm">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>+91 9450533466</span>
                </div>

                <div className="flex items-center gap-2.5 text-white text-sm">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>पुणे, महाराष्ट्र, भारत</span>
                </div>

              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-[#F5E6D3] text-sm leading-relaxed">
                  आम्हाला तुमच्या प्रतिक्रिया, सूचना किंवा योगदानाची प्रतीक्षा आहे!
                </p>
              </div>
            </div>

            {/* RIGHT DIV – Contact Form */}
            <div className="md:w-1/2">
              <form className="space-y-3">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full rounded-md bg-white/20 text-white placeholder-white/60 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full rounded-md bg-white/20 text-white placeholder-white/60 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md bg-white/20 text-white placeholder-white/60 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-md bg-white/20 text-white placeholder-white/60 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />

                <textarea
                  rows="2"
                  placeholder="Message"
                  className="w-full rounded-md bg-white/20 text-white placeholder-white/60 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />

                {/* SEND BUTTON */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-[#D4AF37] text-black text-sm font-medium py-1.5 rounded-md hover:bg-[#c9a634] transition"
                >
                  Send Message
                </button>

              </form>
            </div>

          </div>
        </div>

      </section>
    </>
  );
};

export default AboutPage;