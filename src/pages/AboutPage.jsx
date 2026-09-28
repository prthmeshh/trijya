import React from 'react';
// import onee from "../assets/onee.png";
import namdev from "../assets/namdev.jpeg";
import pramod from "../assets/pramod.jpeg";
import sandeep from "../assets/sandeep.jpeg";
import bhu from "../assets/bhu.png";
import akshay from "../assets/akshay.jpeg";
import komal from "../assets/komal.jpeg";
import nishant from "../assets/nishant.jpeg";
import tanuj from "../assets/tanuj.jpeg";
import vishal from "../assets/vishal.jpeg";
import chandrani from "../assets/chandrani.jpeg";
// import secondbelow from "../assets/secondbelow.png";
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
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

            <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D4AF37]/50 shadow-lg ring-2 ring-[#D4AF37]/20 mt-2">
              <span className="text-[#D4AF37] text-sm md:text-base select-none">✦</span>
              <p className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#8B0000] bg-clip-text text-transparent tracking-wide">
                मराठी साहित्य व संशोधन पत्रिका
              </p>
              <span className="text-[#D4AF37] text-sm md:text-base select-none">✦</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission & Objectives Section (भूमिका आणि उद्दिष्टे) */}
      <section className="py-10 md:py-14 bg-[#FAF7F2]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            {/* Section Heading */}
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#8B0000] tracking-wide">
                भूमिका आणि उद्दिष्टे
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2.5">
                <span className="h-[1.5px] w-10 bg-[#D4AF37]" />
                <span className="w-2 h-2 rounded-full bg-[#8B0000]" />
                <span className="h-[1.5px] w-10 bg-[#D4AF37]" />
              </div>
            </div>

            {/* Literary Editorial Plaque */}
            <div className="bg-[#FFFDF9] rounded-2xl shadow-md border border-[#E6D7C3] p-3 sm:p-4 md:p-5">
              <div className="border border-[#D4AF37]/35 rounded-xl p-5 sm:p-7 md:p-8 bg-white/60">
                <div className="space-y-4 md:space-y-5 text-gray-800 text-base md:text-lg leading-relaxed md:leading-loose text-justify md:text-center">
                  <p>
                    त्रिज्या म्हणजे <strong className="text-[#8B0000] font-semibold">‘वर्तुळाच्या केंद्राला त्याच्या परिघाशी जोडणारी रेषा’</strong> होय. याच संकल्पनेतून प्रस्तुत नियतकालिकाचे नाव आणि त्यामागील भूमिका आकाराला आली आहे. मराठी साहित्य निर्मिती आणि वैचारिक ऊहापोहाचे प्रमुख केंद्र महाराष्ट्रात असले, तरी महाराष्ट्राबाहेरही विविध प्रदेशांत मराठी भाषा, साहित्य, व सांस्कृतिक व्यवहार यांची समृद्ध परंपरा अस्तित्वात आहे. ‘त्रिज्या’चे प्रमुख उद्दिष्ट महाराष्ट्रातील मराठी साहित्याच्या केंद्राला महाराष्ट्राबाहेरील मराठी अवकाशाशी जोडणारा संवाद-सेतू निर्माण करणे हे आहे. हा संवाद केवळ एकमार्गी नसून दोन्ही दिशांनी समृद्ध होणारा असावा, ही त्यामागील मूलभूत भूमिका आहे.
                  </p>

                  {/* Elegant Traditional Floral Divider */}
                  <div className="flex items-center justify-center gap-3 my-5 md:my-6 select-none">
                    <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-sm">✦</span>
                    <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </div>

                  <p>
                    या समग्र पार्श्वभूमीवर काशी हिंदू विश्वविद्यालयाच्या मराठी विभागातून प्रकाशित होणाऱ्या <strong className="text-[#8B0000] font-semibold">‘त्रिज्या’</strong> नियतकालिकाला एक विशेष स्थान प्राप्त होते. महाराष्ट्राबाहेरील केंद्रीय विद्यापीठातील मराठीचा स्वतंत्र विभाग म्हणून या विभागाची अकादमीक भूमिका महत्त्वपूर्ण ठरते. त्यामुळे महाराष्ट्राच्या भौगोलिक सीमांपलीकडे मराठी भाषा आणि साहित्याच्या संशोधनाला आणि अभिव्यक्तीला एक स्वतंत्र विचारपीठ उपलब्ध करून देणे, ही ‘त्रिज्या’ची व्यापक संकल्पना आहे.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scope Section (व्याप्ती) */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            {/* Section Heading */}
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#8B0000] tracking-wide">
                व्याप्ती
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2.5">
                <span className="h-[1.5px] w-10 bg-[#D4AF37]" />
                <span className="w-2 h-2 rounded-full bg-[#8B0000]" />
                <span className="h-[1.5px] w-10 bg-[#D4AF37]" />
              </div>
            </div>

            {/* Literary Editorial Plaque */}
            <div className="bg-[#FFFDF9] rounded-2xl shadow-md border border-[#E6D7C3] p-3 sm:p-4 md:p-5">
              <div className="border border-[#D4AF37]/35 rounded-xl p-5 sm:p-7 md:p-8 bg-white/60">
                <div className="space-y-5 text-gray-800 text-base md:text-lg leading-relaxed md:leading-loose text-left">
                  {/* Lead Statement */}
                  <p>
                    <strong className="text-[#8B0000] font-semibold">‘त्रिज्या’</strong> हे मुख्यतः मराठी भाषेतील साहित्यिक आणि वैचारिक लेखनाला समर्पित नियतकालिक असेल. मराठी ही नियतकालिकाची प्रमुख भाषा असेल; विषयाची गरज आणि संदर्भ लक्षात घेऊन निवडक लेखन हिंदीत, तर अपवादात्मक स्वरूपात इंग्रजीत स्वीकारले जाईल.
                  </p>

                  {/* Elegant Traditional Floral Divider */}
                  <div className="flex items-center justify-center gap-3 my-5 md:my-6 select-none">
                    <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-sm">✦</span>
                    <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </div>

                  {/* Editorial Scope & Focus */}
                  <p>
                    नियतकालिकातील लेखन केवळ संख्यात्मक विस्तारापेक्षा <strong className="text-[#8B0000] font-semibold">आशयघनता, वैचारिक गांभीर्य, संशोधनमूल्य आणि साहित्यिक गुणवत्ता</strong> यांना प्राधान्य देणारे असेल. मराठी साहित्याशी संबंधित विविध विषय, प्रवाह, प्रश्न आणि पद्धती यांचा व्यापक विचार येथे अपेक्षित आहे.
                  </p>

                  <div className="space-y-3 pt-2">
                    <p className="font-semibold text-gray-900">
                      ‘त्रिज्या’मध्ये पुढील स्वरूपाचे लेखन प्रामुख्याने प्रकाशित केले जाईल:
                    </p>

                    <ul className="space-y-2.5 pl-2 sm:pl-4">
                      {[
                        'शोधनिबंध आणि संशोधनपर लेख',
                        'मराठी साहित्य, भाषा, संस्कृती आणि समाज यांवरील वैचारिक लेख',
                        'मराठीतील महत्त्वाच्या साहित्यकृती, प्रवाह आणि प्रश्नांचे चिकित्सक अध्ययन',
                        'अनुवादित साहित्य — मराठीतून इतर भाषांमध्ये आणि इतर भाषांमधून मराठीत',
                        'मराठी साहित्याच्या संदर्भातील विस्तृत पुस्तक परीक्षणे व समीक्षालेख'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 leading-relaxed md:leading-loose">
                          <span className="text-[#D4AF37] font-serif text-sm leading-none mt-1.5 select-none">❖</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
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


    </>
  );
};

export default AboutPage;