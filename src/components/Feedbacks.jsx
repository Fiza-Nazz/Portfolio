// FeedbacksSection.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { SectionWrapper } from "../hoc";

/* ---------------------------
   TESTIMONIAL DATA
---------------------------- */
const testimonials = [
  {
    name: "Abdullah Khan",
    designation: "Frontend Architect",
    company: "CodeVerse",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    testimonial: "Fiza transformed our complex dashboard into an intuitive masterpiece! Her attention to micro-interactions and user flow optimization resulted in a 40% increase in user engagement. The way she blends aesthetics with functionality is pure magic.",
    rating: 5,
    category: "UI/UX Design",
    project: "Analytics Dashboard",
    duration: "3 months",
    collaboration: "Seamless"
  },
  {
    name: "Ahmed Raza",
    designation: "Full Stack Lead",
    company: "NextVision Labs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    testimonial: "Working with Fiza feels like having a secret weapon! She anticipates user needs before they even arise. Her responsive designs adapt beautifully across all devices, and her component-based thinking saved us countless development hours.",
    rating: 5,
    category: "Web Development",
    project: "E-commerce Platform",
    duration: "6 months",
    collaboration: "Exceptional"
  },
  {
    name: "James Neural",
    designation: "AI Solutions Architect",
    company: "NeuraTech",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    testimonial: "Fiza's ability to translate complex AI workflows into elegant, human-centered interfaces is remarkable. She made our machine learning platform feel approachable and intuitive. The feedback from our enterprise clients has been overwhelmingly positive!",
    rating: 5,
    category: "AI Interface",
    project: "ML Platform Redesign",
    duration: "4 months",
    collaboration: "Innovative"
  }
];

/* ---------------------------
   NEURAL NETWORK BACKGROUND (Matching Contact.jsx)
---------------------------- */
const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create neural nodes
    const nodeCount = Math.min(60, Math.floor(width / 25));
    nodesRef.current = [];

    for (let i = 0; i < nodeCount; i++) {
      nodesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.5,
        color: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#a855f7' : '#ec4899'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      nodesRef.current.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Draw node with glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        );
        gradient.addColorStop(0, node.color + 'cc');
        gradient.addColorStop(0.5, node.color + '66');
        gradient.addColorStop(1, node.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Draw connections
        nodesRef.current.slice(i + 1).forEach(otherNode => {
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 180;

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.4;
            
            // Draw connection line with gradient
            const lineGradient = ctx.createLinearGradient(
              node.x, node.y,
              otherNode.x, otherNode.y
            );
            lineGradient.addColorStop(0, node.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
            lineGradient.addColorStop(1, otherNode.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Add pulsing effect on strong connections
            if (distance < maxDistance * 0.5) {
              ctx.shadowBlur = 10;
              ctx.shadowColor = node.color;
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

/* ---------------------------
   VOLUMETRIC LIGHTING ORBS (Matching Contact.jsx)
---------------------------- */
const VolumetricLighting = () => {
  return (
    <>
      {/* Cyan volumetric light */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.1) 30%, transparent 70%)',
          filter: 'blur(80px)',
          top: '10%',
          left: '10%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 150, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Purple volumetric light */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.1) 30%, transparent 70%)',
          filter: 'blur(90px)',
          top: '40%',
          right: '5%',
        }}
        animate={{
          x: [0, -120, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Pink volumetric light */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.08) 30%, transparent 70%)',
          filter: 'blur(70px)',
          bottom: '15%',
          left: '30%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional accent lights */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '60%',
          left: '70%',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
};

/* ---------------------------
   FLOATING PARTICLES (Matching Contact.jsx)
---------------------------- */
const FloatingParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 8,
    color: i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'purple' : 'pink'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.color === 'cyan' ? 'bg-cyan-400/30' :
            particle.color === 'purple' ? 'bg-purple-400/30' : 'bg-pink-400/30'
          }`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${particle.size * 2}px ${
              particle.color === 'cyan' ? 'rgba(6, 182, 212, 0.5)' :
              particle.color === 'purple' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(236, 72, 153, 0.5)'
            }`
          }}
          animate={{
            y: [-20, -120, -20],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

/* ---------------------------
   AMBIENT GLOW EFFECTS
---------------------------- */
const AmbientGlows = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
  );
};

/* ---------------------------
   RATING STARS WITH ANIMATION
---------------------------- */
const RatingStars = ({ rating = 5 }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: i * 0.1, 
            type: "spring", 
            stiffness: 200,
            damping: 10
          }}
        >
          <svg
            className={`w-5 h-5 ${i < rating ? "text-yellow-400 drop-shadow-lg" : "text-gray-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

/* ---------------------------
   SMALL TESTIMONIAL CARD WITH GLASSMORPHISM
---------------------------- */
const SmallCard = ({ t, onHover, isActive }) => {
  return (
    <motion.div
      className={`relative backdrop-blur-xl p-6 rounded-3xl border transition-all duration-500 cursor-pointer group overflow-hidden
        ${isActive 
          ? 'bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-cyan-400/50 shadow-2xl shadow-cyan-500/20' 
          : 'bg-white/5 border-white/10 hover:border-cyan-300/30 hover:bg-white/10'
        }`}
      onMouseEnter={onHover}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ minWidth: 280, maxWidth: 320 }}
    >
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: '200% 200%' }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img 
              src={t.image} 
              alt={t.name} 
              className="w-14 h-14 rounded-xl object-cover border-2 border-white/20 group-hover:border-cyan-300/50 transition-colors duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <span className="text-xs text-white">✓</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-white font-bold text-lg leading-tight truncate">{t.name}</h4>
                <p className="text-gray-400 text-sm mt-1">{t.designation}</p>
              </div>
              <RatingStars rating={t.rating} />
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30">
                {t.category}
              </span>
              <span className="text-gray-500 text-xs">•</span>
              <span className="text-gray-400 text-xs truncate">{t.duration}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm leading-relaxed mt-4 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
          "{t.testimonial}"
        </p>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <span className="text-gray-400 text-xs">Project: <span className="text-cyan-300 font-semibold">{t.project}</span></span>
          <span className="text-green-400 text-xs font-semibold flex items-center gap-1">
            <motion.div 
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {t.collaboration}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------------------
   FEATURED TESTIMONIAL WITH GLASSMORPHISM
---------------------------- */
const Featured = ({ t }) => {
  return (
    <motion.div 
      className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-900/80 via-cyan-900/20 to-purple-900/20 p-10 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)',
            'linear-gradient(225deg, transparent 30%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-8">
          <div className="relative flex-shrink-0">
            <div className="relative">
              <img 
                src={t.image} 
                alt={t.name} 
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl opacity-20 blur-xl" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-white font-bold text-3xl leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t.name}
                </h3>
                <p className="text-gray-400 text-lg mt-2">
                  {t.designation} · <span className="text-cyan-300 font-semibold">{t.company}</span>
                </p>
              </div>
              
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <RatingStars rating={t.rating} />
                  <span className="text-white font-bold text-lg">{t.rating}.0</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-200 text-xl leading-relaxed mt-8 font-light italic">
              "{t.testimonial}"
            </p>
          </div>
        </div>
        
        {/* Project Details */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/10">
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">Project</div>
            <div className="text-cyan-300 font-semibold text-lg">{t.project}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">Category</div>
            <div className="text-white font-semibold text-lg">{t.category}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">Duration</div>
            <div className="text-green-400 font-semibold text-lg">{t.duration}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">Collaboration</div>
            <div className="text-blue-400 font-semibold text-lg">{t.collaboration}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------------------
   MAIN FEEDBACKS COMPONENT
---------------------------- */
const Feedbacks = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const handleHover = (index) => {
    setFeaturedIndex(index);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden py-20"
      style={{
        background: "linear-gradient(180deg, #050816 0%, #0a0e27 30%, #0f1419 70%, #050816 100%)",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif"
      }}
    >
      {/* Neural Network Background */}
      <NeuralBackground />
      
      {/* Volumetric Lighting */}
      <VolumetricLighting />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Ambient Glows */}
      <AmbientGlows />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content with Glassmorphism */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
            <motion.div
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-sm text-cyan-300 tracking-widest font-mono uppercase">
              Trusted by Amazing Teams
            </p>
            <motion.div
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-white leading-tight mt-4 tracking-tight">
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Client Love
            </motion.span>{" "}
            <br />
            <span className="text-white drop-shadow-2xl">& Testimonials</span>
          </h1>
          
          <motion.p
            className="text-gray-300 text-xl md:text-2xl mt-8 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Discover what industry leaders and innovative teams say about their 
            collaboration with <span className="text-cyan-400 font-semibold">Fiza</span>. 
            Real projects, real results, real relationships built on excellence.
          </motion.p>

          {/* Stats Bar with Glassmorphism */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-12 py-6 px-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">100%</div>
              <div className="text-gray-400 text-sm mt-1">Client Satisfaction</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24+</div>
              <div className="text-gray-400 text-sm mt-1">Projects Delivered</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">5★</div>
              <div className="text-gray-400 text-sm mt-1">Average Rating</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="featured-testimonial">
            <Featured t={testimonials[featuredIndex]} />
          </div>
          
          <div className="flex flex-col gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.2, duration: 0.8 }}
              >
                <SmallCard 
                  t={t} 
                  onHover={() => handleHover(i)}
                  isActive={i === featuredIndex}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-16">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setFeaturedIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === featuredIndex 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 w-8 h-3' 
                  : 'bg-white/20 hover:bg-white/40 w-3 h-3'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar with AI theme */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #a855f7, #ec4899);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #9333ea, #db2777);
        }
        
        /* Selection styles */
        ::selection {
          background: rgba(6, 182, 212, 0.3);
          color: white;
        }
        
        ::-moz-selection {
          background: rgba(6, 182, 212, 0.3);
          color: white;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Prevent layout shift */
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");