import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const aiRoles = [
    "Agentic AI Engineer",
    "Full Stack Developer", 
    "AI Agent Developer",
    "Prompt Engineer",
    "Business Analyst"
  ];

  const aiTechnologies = [
    "React", "Next.js", "Python", "TypeScript", "OpenAI", "AGI", "Web3"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % aiRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#915EFF] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Neural Network Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#915EFF" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-28 md:mt-5 lg:5'>
          <motion.div 
            className='w-5 h-5 rounded-full bg-[#915EFF]'
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <motion.div 
          className="mt-28 md:mt-5 lg:5 flex-1 z-10 relative bg-black/30 rounded-lg p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
          <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm <span className='text-[#915EFF]'>Fatima</span>
          </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-mono">AI System Online</span>
            </div>
            
            <div className="text-secondary text-xl font-mono mb-4">
              <span className="text-[#915EFF]">$</span> 
              <motion.span
                key={currentText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="ml-2"
              >
                {aiRoles[currentText]}
              </motion.span>
            </div>
          </motion.div>

                    <motion.div variants={itemVariants} className="mt-6">
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              Full Stack Development & AI Engineering <br/>
              <span className="text-[#915EFF]">Innovating at the Intersection of Tech & Business</span>
            </p>
          </motion.div>

          {/* Technology Stack Animation */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-2"
          >
            {aiTechnologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-[#915EFF]/20 border border-[#915EFF]/30 rounded-full text-sm text-[#915EFF] font-mono"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(145, 94, 255, 0.3)" }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* AI Status Indicators */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex gap-4 text-xs text-secondary"
          >
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>AGI Research</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Web3 Integration</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>AI Agents</span>
        </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Computer Canvas - Strictly on right side */}
      <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center opacity-90">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#915EFF]/10 to-transparent pointer-events-none"></div>
          <div className="w-full h-full flex items-center justify-center">
            <ComputersCanvas />
          </div>
        </div>
      </div>

      {/* Floating AI Elements */}
      <motion.div
        className="absolute top-1/4 right-10 text-[#915EFF] opacity-30 z-10"
        variants={floatingVariants}
        animate="animate"
      >
        <div className="text-6xl">🤖</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-20 text-[#915EFF] opacity-30 z-10"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        <div className="text-4xl">⚡</div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <motion.a 
          href='#about'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 relative overflow-hidden'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-[#915EFF]/20 blur-sm"></div>
          </div>
        </motion.a>
      </div>

      {/* Data Stream Effect */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-primary to-transparent">
        <div className="flex justify-center items-center h-full">
          <motion.div
            className="text-[#915EFF] text-xs font-mono opacity-50"
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Processing AI models... Loading neural networks... Initializing agents...
          </motion.div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
