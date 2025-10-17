import React, { useEffect, useRef, useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Line, Text } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random";
import { styles } from "../styles";
import { github, web } from "../assets";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

// Enhanced Particle Network with Connecting Lines
const AIParticleNetwork = () => {
  const particlesRef = useRef();
  const linesRef = useRef();
  const { mouse, viewport } = useThree();
  const [particles] = useState(() => random.inSphere(new Float32Array(1500), { radius: 2 }));

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += delta * 0.05;
      particlesRef.current.rotation.y += delta * 0.03;
      
      // Parallax mouse movement
      particlesRef.current.position.x = mouse.x * 0.2;
      particlesRef.current.position.y = mouse.y * 0.15;
    }
  });

  return (
    <group>
      <Points ref={particlesRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Floating Glowing Orbs
const FloatingOrbs = () => {
  const groupRef = useRef();
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.position.x = mouse.x * 0.1;
      groupRef.current.position.y = mouse.y * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[1.5, 1, -1]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#ff00ff" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-1.5, -1, -2]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 1.5, -3]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

// Aurora Light Effects
const AuroraLights = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, Math.PI / 4]}>
      <planeGeometry args={[4, 4, 32, 32]} />
      <shaderMaterial
        transparent
        opacity={0.1}
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color('#ff00ff') },
          color2: { value: new THREE.Color('#00ffff') }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;
          
          void main() {
            vec2 center = vUv - 0.5;
            float dist = length(center);
            float angle = atan(center.y, center.x);
            float wave = sin(angle * 5.0 + time * 2.0) * 0.1;
            float alpha = smoothstep(0.3, 0.0, dist + wave);
            vec3 color = mix(color1, color2, sin(time + dist * 5.0) * 0.5 + 0.5);
            gl_FragColor = vec4(color, alpha * 0.3);
          }
        `}
      />
    </mesh>
  );
};

// Enhanced 3D Scene
const AIScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
      <AIParticleNetwork />
      <FloatingOrbs />
      <AuroraLights />
    </Canvas>
  );
};

// Animated Gradient Text Component
const AnimatedGradientText = ({ text, className = "" }) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent ${className}`}
      initial={{ opacity: 0, backgroundPosition: "0% 50%" }}
      whileInView={{ 
        opacity: 1, 
        backgroundPosition: "100% 50%" 
      }}
      transition={{ 
        duration: 2, 
        ease: "easeInOut",
        backgroundPosition: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }}
      style={{
        backgroundSize: "200% 200%"
      }}
    >
      {text}
    </motion.span>
  );
};

// Dynamic Text Reveal Component
const DynamicTextReveal = ({ text, className = "" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const chars = textRef.current.textContent.split('');
    textRef.current.textContent = '';
    
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      textRef.current.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.03,
        ease: "power3.out"
      });
    });
  }, [text]);

  return (
    <h2 ref={textRef} className={`${styles.sectionHeadText} ${className}`}>
      {text}
    </h2>
  );
};

const projects = [
  {
    name: "SoleVibe Store",
    description: "An e-commerce sneaker store offering a modern UI and seamless shopping experience. Built with React, Tailwind, and Vite for performance and style.",
    tags: [
      { name: "React", color: "text-blue-400" },
      { name: "Tailwind", color: "text-cyan-400" },
      { name: "Vite", color: "text-pink-400" },
    ],
    image: "/solevibe.png",
    live_demo_link: "https://solevibe-store.vercel.app/",
    source_code_link: "https://github.com/Fiza-Nazz/Sole_Vibe.git",
  },
  {
    name: "Feastera Fusion",
    description: "A creative restaurant web app featuring attractive food layouts, responsive design, and a delightful user experience using React and Tailwind CSS.",
    tags: [
      { name: "React", color: "text-blue-400" },
      { name: "Tailwind", color: "text-cyan-400" },
      { name: "UI/UX", color: "text-yellow-400" },
    ],
    image: "/feastera.png",
    live_demo_link: "https://feastera-fusion.vercel.app/",
    source_code_link: "https://github.com/Fiza-Nazz/Feastera-Fusion.git",
  },
  {
    name: "TripOra",
    description: "A modern travel booking web application that lets users explore destinations and plan trips with ease. Designed for fast, responsive performance.",
    tags: [
      { name: "Next.js", color: "text-blue-400" },
      { name: "Tailwind", color: "text-green-400" },
      { name: "Travel", color: "text-orange-400" },
    ],
    image: "/tripora.png",
    live_demo_link: "https://tripora-sigma.vercel.app/",
    source_code_link: "https://github.com/Fiza-Nazz/TripOra.git",
  },
  {
    name: "Morent Marketplace",
    description: "A clean and modern car rental marketplace with smooth UX, built using React, Tailwind, and reusable components for scalability.",
    tags: [
      { name: "React", color: "text-blue-400" },
      { name: "Tailwind", color: "text-cyan-400" },
      { name: "Responsive", color: "text-green-400" },
    ],
    image: "/morent.png",
    live_demo_link: "https://morent-marketplace-jade.vercel.app/",
    source_code_link: "https://github.com/Fiza-Nazz/ecommerce-web.git",
  },
  {
    name: "Portfolio Website",
    description: "A professional portfolio built with Next.js and Tailwind CSS showcasing my web development projects, skills, and creative design sense.",
    tags: [
      { name: "Next.js", color: "text-blue-400" },
      { name: "Tailwind", color: "text-pink-400" },
      { name: "Portfolio", color: "text-yellow-400" },
    ],
    image: "/portfolio.png",
    live_demo_link: "https://nextjs-portfolio-tau-black.vercel.app/",
    source_code_link: "https://github.com/Fiza-Nazz/portfolio-website.git",
  },
  {
    name: "TherapyBot AI (Mental Health)",
    description: "An AI-powered therapy assistant designed to support mental health conversations and provide a comforting chat experience.",
    tags: [
      { name: "AI", color: "text-green-400" },
      { name: "Python", color: "text-blue-400" },
      { name: "Streamlit", color: "text-pink-400" },
    ],
    image: "/therapybot.png",
    live_demo_link: "https://therapybot-ai-mental-health-mbhgrocu6wu8hd9on7hav4.streamlit.app/",
    source_code_link: "https://github.com/Fiza-Nazz/therapybot-ai-mental-health.git",
  },
  {
    name: "Fashion Stylist AI",
    description: "An AI fashion advisor that recommends outfits based on your style and preferences using advanced NLP and computer vision.",
    tags: [
      { name: "AI", color: "text-green-400" },
      { name: "Fashion", color: "text-purple-400" },
      { name: "Streamlit", color: "text-pink-400" },
    ],
    image: "/fashionstylist.png",
    live_demo_link: "https://fashion-stylist-nthukpumnnwnngkopn23u3.streamlit.app/",
    source_code_link: "https://github.com/Fiza-Nazz/Fashion-Stylist.git",
  },
  {
    name: "AI Recipe Bot",
    description: "An intelligent recipe generator that provides custom meal ideas based on available ingredients using AI language models.",
    tags: [
      { name: "AI", color: "text-green-400" },
      { name: "Food", color: "text-orange-400" },
      { name: "Streamlit", color: "text-pink-400" },
    ],
    image: "/chef.png",
    live_demo_link: "https://ai-recipe-bot-mgw4oqt8xtw8lkspbdzan9.streamlit.app/",
    source_code_link: "https://github.com/Fiza-Nazz/ai-recipe-bot.git",
  },
  {
    name: "AI Career Counselor",
    description: "An AI assistant that provides career advice, guidance, and resource recommendations based on user input and goals.",
    tags: [
      { name: "AI", color: "text-green-400" },
      { name: "Counselor", color: "text-yellow-400" },
      { name: "Streamlit", color: "text-pink-400" },
    ],
    image: "/career.png",
    live_demo_link: "https://ai-career-counselor-nwr5zmensem6ajolybek2b.streamlit.app/",
    source_code_link: "https://github.com/Fiza-Nazz/ai-career-counselor.git",
  },
  {
    name: "AI Dermatologist (Acne Analyzer)",
    description: "An AI-based skin health analyzer that helps users detect acne severity and skincare suggestions through image analysis.",
    tags: [
      { name: "AI", color: "text-green-400" },
      { name: "Healthcare", color: "text-red-400" },
      { name: "Streamlit", color: "text-pink-400" },
    ],
    image: "/acne.png",
    live_demo_link: "https://aidermatologistacneanalyzer-zmqnuvpgodx46zwiwqepgz.streamlit.app/",
    source_code_link: "https://github.com/Fiza-Nazz/ai_dermatologist_acne_analyzer.git",
  },
  {
    name: "Qurbani Meat Distribution Planner",
    description: "An AI-powered Streamlit application designed to plan Qurbani meat distribution fairly and efficiently using intelligent logic.",
    tags: [
      { name: "AI", color: "text-green-400" },
      { name: "Python", color: "text-blue-400" },
      { name: "Streamlit", color: "text-pink-400" },
    ],
    image: "/qurbani.png",
    live_demo_link: "https://morent-car-rental-marketplace-zpep3qgkvigfhmgfsr8rkq.streamlit.app/",
    source_code_link: "https://github.com/Fiza-Nazz/qurbani-meat-distribution-planner.git",
  },
  {
    name: "Secure Data App",
    description: "A privacy-focused Streamlit app that allows users to store and manage confidential data securely using encryption and AI integration.",
    tags: [
      { name: "AI", color: "text-green-400" },
      { name: "Security", color: "text-red-400" },
      { name: "Streamlit", color: "text-pink-400" },
    ],
    image: "/secure.png",
    live_demo_link: "https://secure-data-app-ajinpprdfzzk3ynehd9abt.streamlit.app/",
    source_code_link: "https://github.com/Fiza-Nazz/secure-data-app.git",
  },
];

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    const imgEl = imageRef.current;
    
    gsap.fromTo(
      el,
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 20%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      }
    );

    // Enhanced image reveal animation
    gsap.fromTo(
      imgEl,
      { scale: 1.3, opacity: 0, rotationY: 10 },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        delay: 0.4,
        ease: "power3.out"
      }
    );
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(cardRef.current, {
      y: -10,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.05}
        transitionSpeed={2000}
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="1.5rem"
        className="project-card relative bg-gradient-to-br from-gray-900/90 to-black/95 p-6 rounded-3xl sm:w-[380px] w-full border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-500 group backdrop-blur-sm"
      >
        {/* Neon Glow Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
        <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-gray-900 to-black" />
        
        {/* Hover Aura Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Project Image with Enhanced Reveal */}
        <div className="relative w-full h-[250px] overflow-hidden rounded-2xl mb-6">
          <motion.img
            ref={imageRef}
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-110"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
          
          {/* Animated Scan Line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 origin-top" />

          {/* Action Buttons with Enhanced Animations */}
          <div className="absolute inset-0 flex justify-end items-start gap-3 p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            {live_demo_link && (
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(live_demo_link, "_blank")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 text-white font-medium text-sm"
                title="Live Demo"
              >
                <img src={web} alt="Live Demo" className="w-4 h-4 object-contain brightness-0 invert" />
                Live Demo
              </motion.button>
            )}
            {source_code_link && (
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(source_code_link, "_blank")}
                className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-white font-medium text-sm"
                title="Source Code"
              >
                <img src={github} alt="Source Code" className="w-4 h-4 object-contain brightness-0 invert" />
                Source Code
              </motion.button>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="space-y-4">
          <motion.h3 
            className="text-white font-bold text-2xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {name}
          </motion.h3>
          
          <motion.div
            className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out delay-200 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
              <motion.p 
                className="text-gray-300 text-[15px] leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {description}
              </motion.p>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div 
            className="flex flex-wrap gap-2 pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </motion.div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Enhanced section entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".section-title", 
      { opacity: 0, y: 80, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    ).fromTo(".section-subtitle",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.8"
    ).fromTo(".section-description",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.6"
    );

    // Enhanced card animations
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 80, rotationY: 10 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: ".works-container",
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Enhanced 3D AI Background */}
      <div className="fixed inset-0 -z-10">
        <AIScene />
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-cyan-900/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-6"
        >
          {/* Animated "My Work" */}
          <motion.p
            className="section-subtitle text-2xl font-light tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedGradientText 
              text="My Work" 
              className="text-3xl font-bold tracking-widest uppercase"
            />
          </motion.p>

          {/* Dynamic "Projects" Reveal */}
          <div className="section-title">
            <DynamicTextReveal 
              text="Projects." 
              className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent"
            />
          </div>

          {/* Enhanced Description */}
          <motion.p
            ref={descriptionRef}
            className="section-description text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Explore my collection of{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent font-semibold">
              web and AI-driven projects
            </span>{" "}
            built with{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent font-semibold">
              React, Next.js, and Tailwind CSS
            </span>{" "}
            — showcasing{" "}
            <span className="bg-gradient-to-r from-pink-400 to-rose-600 bg-clip-text text-transparent font-semibold">
              innovative design, intelligent systems, and next-generation creativity
            </span>.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="works-container mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "work");