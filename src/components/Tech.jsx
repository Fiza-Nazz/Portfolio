"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ==================== AI PARTICLE NETWORK ====================
const AIParticleNetwork = () => {
  const pointsRef = useRef();
  const { mouse, viewport } = useThree();
  
  const particles = useMemo(() => 
    random.inSphere(new Float32Array(1500), { radius: 3 }), 
  []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.05;
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.position.x = mouse.x * 0.2;
      pointsRef.current.position.y = mouse.y * 0.15;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// ==================== FLOATING AI ORBS ====================
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
      {/* Cyan Orb */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[2, 1, -2]}>
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </Float>

      {/* Magenta Orb */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <Sphere args={[0.25, 32, 32]} position={[-2, -1, -1]}>
          <meshBasicMaterial
            color="#ff00ff"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </Float>

      {/* Purple Orb */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[0.2, 32, 32]} position={[1, -2, -3]}>
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </Float>
    </group>
  );
};

// ==================== AURORA SHADER BACKGROUND ====================
const AuroraShader = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, Math.PI / 4]}>
      <planeGeometry args={[8, 8, 32, 32]} />
      <shaderMaterial
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color('#00ffff') },
          color2: { value: new THREE.Color('#ff00ff') },
          color3: { value: new THREE.Color('#8b5cf6') }
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
          uniform vec3 color3;
          varying vec2 vUv;
          
          void main() {
            vec2 center = vUv - 0.5;
            float dist = length(center);
            float angle = atan(center.y, center.x);
            
            // Create flowing aurora patterns
            float wave1 = sin(angle * 3.0 + time * 1.5) * 0.2;
            float wave2 = cos(angle * 5.0 + time * 2.0) * 0.15;
            float wave3 = sin(angle * 7.0 + time * 2.5) * 0.1;
            
            float alpha = smoothstep(0.4, 0.0, dist + wave1 + wave2 + wave3);
            
            // Blend colors based on position and time
            vec3 color = mix(
              mix(color1, color2, sin(time + dist * 4.0) * 0.5 + 0.5),
              color3,
              cos(time * 0.7 + angle) * 0.5 + 0.5
            );
            
            gl_FragColor = vec4(color, alpha * 0.4);
          }
        `}
      />
    </mesh>
  );
};

// ==================== 3D AI SCENE ====================
const AIScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 75 }} className="absolute inset-0">
      <color attach="background" args={['#0A0A1A']} />
      <AIParticleNetwork />
      <FloatingOrbs />
      <AuroraShader />
    </Canvas>
  );
};

// ==================== TECH SKILLS DATA ====================
const techSkills = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    tagline: "Semantic Structure",
    color: "#E34F26",
    glow: "rgba(227, 79, 38, 0.6)"
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    tagline: "Visual Design",
    color: "#1572B6",
    glow: "rgba(21, 114, 182, 0.6)"
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    tagline: "Core Logic",
    color: "#F7DF1E",
    glow: "rgba(247, 223, 30, 0.6)"
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tagline: "Type Safety",
    color: "#3178C6",
    glow: "rgba(49, 120, 198, 0.6)"
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tagline: "UI Architecture",
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.6)"
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    tagline: "Full-Stack Framework",
    color: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.6)"
  },
  {
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tagline: "Mobile Development",
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.6)"
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    tagline: "Utility-First Styling",
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.6)"
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    tagline: "Design Systems",
    color: "#F24E1E",
    glow: "rgba(242, 78, 30, 0.6)"
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    tagline: "Version Control",
    color: "#F05032",
    glow: "rgba(240, 80, 50, 0.6)"
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    tagline: "Code Repository",
    color: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.6)"
  },
  {
    name: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    tagline: "Edge Deployment",
    color: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.6)"
  },
  {
    name: "Netlify",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
    tagline: "JAMstack Hosting",
    color: "#00C7B7",
    glow: "rgba(0, 199, 183, 0.6)"
  },
  {
    name: "Supabase",
    icon: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png",
    tagline: "Backend as a Service",
    color: "#3ECF8E",
    glow: "rgba(62, 207, 142, 0.6)"
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    tagline: "AI & Automation",
    color: "#3776AB",
    glow: "rgba(55, 118, 171, 0.6)"
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    tagline: "Real-time Database",
    color: "#FFCA28",
    glow: "rgba(255, 202, 40, 0.6)"
  },
  {
    name: "n8n",
    icon: "https://n8n.io/favicon.ico",
    tagline: "Workflow Automation",
    color: "#EA4B71",
    glow: "rgba(234, 75, 113, 0.6)"
  },
  {
    name: "OpenAI",
    icon: "https://seeklogo.com/images/O/openai-logo-8B9BFEDC26-seeklogo.com.png",
    tagline: "Agentic AI",
    color: "#10A37F",
    glow: "rgba(16, 163, 127, 0.6)"
  },
];

// ==================== TECH CARD COMPONENT ====================
const TechCard = ({ skill, index, onHover, mouseX, mouseY }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotX = (e.clientY - centerY) / 10;
    const rotY = -(e.clientX - centerX) / 10;
    
    rotateX.set(rotX);
    rotateY.set(rotY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
    onHover(null);
  };

  return (
    <motion.div
      ref={cardRef}
      className="tech-card relative group cursor-pointer"
      initial={{ opacity: 0, y: 100, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.05,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(skill);
      }}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1, z: 50 }}
    >
      {/* Holographic Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${skill.glow}, transparent)`,
        }}
        animate={isHovered ? {
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden group-hover:border-white/30 transition-all duration-500">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${skill.color}, transparent, ${skill.color})`,
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* Holographic Scan Line */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)',
            }}
            initial={{ y: '-100%' }}
            animate={{ y: '200%' }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Icon with Energy Pulse */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="relative mb-4"
            animate={isHovered ? {
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Icon Glow Aura */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: skill.glow }}
              animate={{
                scale: isHovered ? [1, 1.5, 1] : 1,
                opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            <img
              src={skill.icon}
              alt={skill.name}
              className="relative w-20 h-20 object-contain drop-shadow-2xl"
              style={{ filter: `drop-shadow(0 0 15px ${skill.glow})` }}
            />

            {/* Ripple Effect */}
            {isHovered && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: skill.color }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: skill.color }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
                />
              </>
            )}
          </motion.div>

          {/* Skill Name */}
          <h3
            className="text-white font-bold text-lg mb-1 text-center tracking-wide"
            style={{ textShadow: `0 0 10px ${skill.glow}` }}
          >
            {skill.name}
          </h3>

          {/* Tagline */}
          <p className="text-cyan-300/60 text-xs text-center font-light">
            {skill.tagline}
          </p>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-purple-400/30 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-400/30 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/30 rounded-br-lg" />
      </div>

      {/* Floating Micro Particles */}
      {isHovered && Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: skill.color,
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos(i * 60 * Math.PI / 180) * 60,
            y: Math.sin(i * 60 * Math.PI / 180) * 60,
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </motion.div>
  );
};

// ==================== FLOATING TOOLTIP ====================
const FloatingTooltip = ({ skill, mouseX, mouseY }) => {
  if (!skill) return null;

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: mouseX,
        top: mouseY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div
        className="relative bg-black/95 backdrop-blur-2xl border rounded-2xl px-5 py-3 -translate-x-1/2 -translate-y-full mb-6"
        style={{
          borderColor: skill.color,
          boxShadow: `0 0 30px ${skill.glow}, inset 0 0 20px ${skill.glow}`,
        }}
      >
        <div className="flex items-center gap-3">
          <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
          <div>
            <div className="text-white font-bold text-sm">{skill.name}</div>
            <div className="text-cyan-300/80 text-xs">{skill.tagline}</div>
          </div>
        </div>
        
        {/* Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full">
          <div
            className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px]"
            style={{ borderTopColor: skill.color }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function Tech() {
  const sectionRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useSpring(0, { stiffness: 150, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        ".universe-title",
        { opacity: 0, y: -80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".universe-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards Stagger Animation
      gsap.fromTo(
        ".tech-card",
        { opacity: 0, y: 100, rotateX: 45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.08,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden"
    >
      {/* 3D AI Background Scene */}
      <div className="fixed inset-0 -z-10">
        <AIScene />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A1A] via-purple-900/10 to-cyan-900/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1A] via-transparent to-[#0A0A1A]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/3 via-transparent to-transparent" />
      </div>

      {/* Volumetric Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-pink-500/20 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 0.9, 1.2],
            opacity: [0.2, 0.35, 0.2],
            x: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-cyan-400 text-sm md:text-base font-mono tracking-[0.3em] mb-4 uppercase">
              ⚡ Advanced Technology Stack
            </p>
          </motion.div>

          <motion.h1
            className="universe-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 relative inline-block"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="relative bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              My AI & Tech Universe
              
              {/* Glitch Effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{
                  x: [-3, 3, -3],
                  opacity: [0, 0.7, 0],
                }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
              >
                My AI & Tech Universe
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Building the future with intelligent automation, design precision,
            <br className="hidden md:block" />
            and next-generation technologies.
          </motion.p>
        </div>

        {/* Tech Grid */}
        <div className="tech-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {techSkills.map((skill, index) => (
            <TechCard
              key={skill.name}
              skill={skill}
              index={index}
              onHover={setHoveredSkill}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
        </div>
      </div>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hoveredSkill && (
          <FloatingTooltip
            skill={hoveredSkill}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
          />
        )}
      </AnimatePresence>

      {/* Font Imports */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@400;700;900&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap');
      `}</style>
    </section>
  );
}