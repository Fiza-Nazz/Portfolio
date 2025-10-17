import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";

// Mock data (replace with your actual imports)
const styles = {
  sectionSubText: "text-sm uppercase tracking-[4px] text-cyan-400 font-light",
  sectionHeadText: "text-white font-black md:text-6xl sm:text-5xl xs:text-4xl text-3xl"
};

const services = [
  { title: "Full-Stack Development", icon: "🚀" },
  { title: "AI Engineering", icon: "🤖" },
  { title: "UI/UX Design", icon: "🎨" },

];

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section id={idName} className="relative w-full mx-auto">
        <Component />
      </section>
    );
  };

// Neural Network Background Component
const NeuralBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const nodes = [];
    const nodeCount = 50;
    
    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
    
    let animationId;
    
    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.fill();
        
        // Draw connections
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
};

// Cursor Trail Effect
const CursorTrail = () => {
  const [trails, setTrails] = useState([]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      
      setTrails(prev => [...prev.slice(-10), newTrail]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="absolute w-2 h-2 rounded-full bg-cyan-400"
          style={{
            left: trail.x,
            top: trail.y,
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </div>
  );
};

const SkillBar = ({ skill, percentage, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <div className="mb-6 group" ref={ref}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-white text-sm font-medium tracking-wide">{skill}</span>
        <span className="text-cyan-400 text-xs font-mono">{percentage}%</span>
      </div>
      <div className="relative w-full h-2 bg-gray-900/50 rounded-full overflow-hidden backdrop-blur-sm border border-purple-500/20">
        <motion.div
          className={`absolute top-0 left-0 h-full rounded-full ${color} relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${percentage}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <div className="absolute inset-0 rounded-full shadow-inner" />
      </div>
    </div>
  );
};

const ServiceCard = ({ index, title, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <motion.div
      ref={ref}
      className="relative w-full group xs:w-[250px]"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.98 }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glowing border effect */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-3xl blur opacity-60 group-hover:opacity-100 transition duration-300"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Card content */}
      <motion.div
        className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-8 min-h-[280px] flex flex-col justify-center items-center border border-purple-500/20 overflow-hidden"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 rounded-full bg-purple-500/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Icon */}
        <motion.div
          className="text-6xl mb-4 relative z-10"
          animate={isHovered ? {
            rotateY: 360,
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
        
        {/* Title */}
        <h3 className="text-white text-xl font-bold text-center relative z-10 tracking-wide">
          {title}
        </h3>
        
        {/* Scanning line effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            top: ['0%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const paragraphInView = useInView(paragraphRef, { once: true, amount: 0.3 });
  
  const skills = [
    { skill: "HTML5 / CSS3", percentage: 95, color: "bg-gradient-to-r from-orange-500 to-red-500" },
    { skill: "JavaScript (ES6+)", percentage: 92, color: "bg-gradient-to-r from-yellow-400 to-orange-500" },
    { skill: "TypeScript", percentage: 90, color: "bg-gradient-to-r from-blue-600 to-blue-400" },
    { skill: "React.js", percentage: 95, color: "bg-gradient-to-r from-cyan-500 to-blue-500" },
    { skill: "Next.js", percentage: 92, color: "bg-gradient-to-r from-gray-800 to-gray-600" },
    { skill: "Tailwind CSS", percentage: 90, color: "bg-gradient-to-r from-sky-400 to-cyan-500" },
    { skill: "Node.js / Express.js", percentage: 85, color: "bg-gradient-to-r from-green-600 to-emerald-500" },
    { skill: "Sanity CMS", percentage: 87, color: "bg-gradient-to-r from-red-400 to-pink-500" },
    { skill: "MongoDB", percentage: 85, color: "bg-gradient-to-r from-green-500 to-green-400" },
    { skill: "Vercel / Netlify", percentage: 82, color: "bg-gradient-to-r from-gray-400 to-gray-300" },
    { skill: "Python", percentage: 88, color: "bg-gradient-to-r from-blue-400 to-indigo-500" },
    { skill: "AI Agents (OpenAI SDK)", percentage: 85, color: "bg-gradient-to-r from-pink-500 to-purple-600" },
    { skill: "Machine Learning Basics", percentage: 78, color: "bg-gradient-to-r from-purple-500 to-violet-600" },
    { skill: "Git / GitHub", percentage: 90, color: "bg-gradient-to-r from-gray-700 to-gray-900" },
    { skill: "UI/UX Design (Figma, Adobe XD)", percentage: 87, color: "bg-gradient-to-r from-violet-500 to-purple-600" },
    { skill: "Problem Solving & Analysis", percentage: 92, color: "bg-gradient-to-r from-teal-500 to-cyan-600" },
    { skill: "Business Analysis", percentage: 85, color: "bg-gradient-to-r from-indigo-600 to-purple-700" },
  ];
  
  const tabs = [
    { id: "overview", label: "Overview", icon: "👁️" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "education", label: "Education", icon: "🎓" },
  ];

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-8 overflow-hidden bg-black">
      {/* Neural Network Background */}
      <NeuralBackground />
      <CursorTrail />
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
      
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headingRef}
          className="mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={headingInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.p
            className={`${styles.sectionSubText} mb-2`}
            initial={{ opacity: 0, x: -20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            INTRODUCTION
          </motion.p>
          <motion.h2
            className={`${styles.sectionHeadText} relative inline-block`}
            initial={{ opacity: 0, x: -20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            About Me
            <motion.span
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-transparent"
              initial={{ width: 0 }}
              animate={headingInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden group ${
                activeTab === tab.id 
                  ? "text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              {/* Background */}
              <div className={`absolute inset-0 transition-opacity duration-300 ${
                activeTab === tab.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 blur-xl opacity-50" />
              </div>
              
              {/* Border */}
              <div className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
                activeTab === tab.id 
                  ? "border-purple-500" 
                  : "border-gray-700 group-hover:border-purple-500/50"
              }`} />
              
              {/* Content */}
              <span className="relative flex items-center gap-2">
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          {activeTab === "overview" && (
            <div className="space-y-8">
              <motion.div
                ref={paragraphRef}
                className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={paragraphInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                {/* Glassmorphic effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5" />
                
                <p className="relative text-gray-300 text-lg leading-relaxed">
                  I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold">Fiza Nazz</span>, an AI Engineer, Full-Stack Developer, and UI/UX
                  Designer from Karachi, Pakistan. With expertise in React, Next.js,
                  TypeScript, Python, and Agentic AI, I build intelligent, scalable,
                  and user-friendly digital experiences. As a Student Leader at the
                  Governor IT Initiative, I specialize in Full-Stack Development,
                  Cloud Computing, and AI-powered solutions while also pursuing my
                  Master's degree in Islamic Studies. My journey spans across
                  frontend and backend development, UI/UX design, and AI-driven
                  automation, with hands-on experience in delivering impactful
                  projects like e-commerce platforms, booking systems, and
                  intelligent web apps. Passionate about blending creativity with
                  technology, my mission is to shape the future of AI-driven digital
                  solutions through innovation and excellence.
                </p>
              </motion.div>
              
              {/* AI Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { value: "5+", label: "AI Projects" },
                  { value: "1+", label: "Year Experience" },
                  { value: "15+", label: "Technologies" },
                  { value: "100%", label: "Remote Ready" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-300" />
                    <div className="relative text-center p-6 bg-black/80 backdrop-blur-xl rounded-2xl border border-purple-500/20">
                      <motion.div
                        className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs text-gray-400 mt-2 tracking-wide">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">💻</span>
                  Technical Arsenal
                </h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <SkillBar {...skill} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🧠</span>
                  AI & Innovation Focus
                </h3>
                
                {[
                  {
                    title: "Agentic AI Development",
                    desc: "Building intelligent agents with OpenAI SDK and custom workflows",
                    color: "from-green-500 to-emerald-600",
                    icon: "🤖"
                  },
                  {
                    title: "Web3 Integration",
                    desc: "Smart contracts, metaverse development, and blockchain solutions",
                    color: "from-blue-500 to-cyan-600",
                    icon: "⛓️"
                  },
                  {
                    title: "Business Intelligence",
                    desc: "Merging technical expertise with strategic business insights",
                    color: "from-purple-500 to-pink-600",
                    icon: "📊"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-300`} />
                    <div className="relative p-6 bg-black/80 backdrop-blur-xl rounded-2xl border border-purple-500/20">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{item.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <motion.div
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <span className="text-white font-semibold text-lg">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-6">
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-300" />
                <div className="relative p-8 bg-black/80 backdrop-blur-xl rounded-2xl border border-purple-500/20">
                  <div className="flex items-start gap-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-3xl">🎓</span>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-bold mb-2">
                        Master of Arts (M.A.) in Islamic Studies
                      </h3>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-sm font-semibold mb-1">
                        Darus Salam University, Karachi
                      </p>
                      <p className="text-gray-400 text-sm mb-3">2020 – Present (Expected 2026)</p>
                      <p className="text-gray-300 text-sm mb-2 font-medium">Major: Islamic Studies</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Related Coursework: Islamic Research, Quranic Studies, Hadith, Fiqh
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-300" />
                <div className="relative p-8 bg-black/80 backdrop-blur-xl rounded-2xl border border-purple-500/20">
                  <div className="flex items-start gap-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-3xl">💻</span>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-bold mb-2">
                        Governor IT Initiative – Student Leader
                      </h3>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-sm font-semibold mb-1">
                        Governor House, Karachi
                      </p>
                      <p className="text-gray-400 text-sm mb-3">2024 – Present</p>
                      <p className="text-gray-300 text-sm mb-2 font-medium">Major: Information Technology & Agentic AI</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Related Coursework: Full-Stack Development, AI Agents Development, Cloud Computing
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Services Section */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-white text-2xl font-bold mb-8 text-center">
                  What I Offer
                </h3>
                <div className="flex flex-wrap justify-center gap-8">
                  {services.map((service, index) => (
                    <ServiceCard
                      key={service.title}
                      index={index}
                      title={service.title}
                      icon={service.icon}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Export the component with SectionWrapper
export default SectionWrapper(About, "about");