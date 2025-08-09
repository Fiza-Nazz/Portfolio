import React, { useRef, useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const useGsap = (elementRef, animation, delay = 0) => {
  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        animation.from,
        {
          ...animation.to,
          delay,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [elementRef, animation, delay]);
};

const SkillBar = ({ skill, percentage, color }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`skill-${skill}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [skill]);

  return (
    <div className="mb-4" id={`skill-${skill}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-white text-sm font-mono">{skill}</span>
        <span className="text-secondary text-xs">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const ServiceCard = ({ index, title, icon }) => {
  const cardRef = useRef(null);
  useGsap(cardRef, {
    from: { opacity: 0, y: 100, scale: 0.8 },
    to: { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
  }, index * 0.2);

  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div 
        ref={cardRef} 
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-2 left-2 w-8 h-8 border border-[#915EFF] rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border border-[#915EFF] rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-[#915EFF] rounded-full"></div>
        </div>
          
          <img src={icon} alt="web-development" className="w-16 h-16 object-contain relative z-10" />
          <h3 className="text-white text-[20px] font-bold text-center relative z-10">{title}</h3>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Heading Animation
  useGsap(headingRef, {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
  });

  // Paragraph Animation
  useGsap(paragraphRef, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
  }, 0.3);

  const skills = [
    { skill: "React/Next.js", percentage: 95, color: "bg-blue-500" },
    { skill: "Python/AI", percentage: 90, color: "bg-green-500" },
    { skill: "TypeScript", percentage: 88, color: "bg-purple-500" },
    { skill: "AI Agents", percentage: 85, color: "bg-pink-500" },
    { skill: "Web3/Blockchain", percentage: 80, color: "bg-yellow-500" },
    { skill: "Business Analysis", percentage: 85, color: "bg-indigo-500" },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' }
  ];

  return (
    <>
      <div ref={headingRef}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </div>

      {/* Tab Navigation */}
      <motion.div 
        className="flex gap-4 mt-8 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#915EFF] text-white'
                : 'bg-tertiary text-secondary hover:bg-[#915EFF]/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div>
                   <p ref={paragraphRef} className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
               A passionate Generative AI and Agentic AI Engineer with strong expertise in OpenAI Agent SDKs, MCPs, RAG (Retrieval-Augmented Generation), n8n workflow automation, and modern AI tools. Proficient in JavaScript, Python, React, Next.js, and TypeScript. My journey into technology began with a deep curiosity, leading me to master AI-driven development while exploring cutting-edge AI technologies and their transformative potential. Currently pursuing a Bachelor's in Business Administration, I aim to merge advanced AI technical expertise with strategic business insights. My work involves building innovative AI-powered applications, intelligent agent systems, workflow automation, and leveraging Web3 technologies.
             </p>
            
            {/* AI Stats */}
            <motion.div 
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center p-4 bg-tertiary rounded-lg">
                <div className="text-2xl font-bold text-[#915EFF]">5+</div>
                <div className="text-xs text-secondary">AI Projects</div>
              </div>
              <div className="text-center p-4 bg-tertiary rounded-lg">
                <div className="text-2xl font-bold text-[#915EFF]">1+</div>
                <div className="text-xs text-secondary">Year Experience</div>
              </div>
              <div className="text-center p-4 bg-tertiary rounded-lg">
                <div className="text-2xl font-bold text-[#915EFF]">15+</div>
                <div className="text-xs text-secondary">Technologies</div>
              </div>
              <div className="text-center p-4 bg-tertiary rounded-lg">
                <div className="text-2xl font-bold text-[#915EFF]">100%</div>
                <div className="text-xs text-secondary">Remote Ready</div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white text-lg font-bold mb-4">Technical Skills</h3>
                {skills.map((skill) => (
                  <SkillBar
                    key={skill.skill}
                    skill={skill.skill}
                    percentage={skill.percentage}
                    color={skill.color}
                  />
                ))}
              </div>
              <div>
                <h3 className="text-white text-lg font-bold mb-4">AI & Business Focus</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-tertiary rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">Agentic AI Development</span>
                    </div>
                    <p className="text-secondary text-sm">Building intelligent agents with OpenAI SDK and custom workflows</p>
                  </div>
                  <div className="p-4 bg-tertiary rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">Web3 Integration</span>
                    </div>
                    <p className="text-secondary text-sm">Smart contracts, metaverse development, and blockchain solutions</p>
                  </div>
                  <div className="p-4 bg-tertiary rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">Business Intelligence</span>
                    </div>
                    <p className="text-secondary text-sm">Merging technical expertise with strategic business insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="mt-4">
            <div className="p-6 bg-tertiary rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#915EFF] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🎓</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Bachelor's in Business Administration</h3>
                  <p className="text-[#915EFF] text-sm">Institute of Health and Business Management - JSMU</p>
                  <p className="text-secondary text-sm">2024 - 2028</p>
                  <p className="text-secondary text-sm mt-2">
                    Currently pursuing BBA to merge technical expertise with strategic business insights, 
                    focusing on entrepreneurship and core banking principles.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-tertiary rounded-lg">
              <h3 className="text-white text-lg font-bold mb-4">Certifications & Training</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#915EFF] rounded-full"></div>
                  <span className="text-secondary">Generative AI, Web3 & Metaverse - Governor Sindh Initiative</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#915EFF] rounded-full"></div>
                  <span className="text-secondary">AI Agent Development - OpenAI & Agent SDK</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#915EFF] rounded-full"></div>
                  <span className="text-secondary">Frontend Development - React, Next.js, TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
