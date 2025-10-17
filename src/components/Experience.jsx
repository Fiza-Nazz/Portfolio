'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Code, Palette, Brain } from 'lucide-react';

// Neural Network Background Component
const NeuralBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Node class
    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.pulsePhase += this.pulseSpeed;
      }
      
      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        const alpha = 0.3 + pulse * 0.4;
        
        // Gradient glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 8
        );
        gradient.addColorStop(0, `rgba(34, 211, 238, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(168, 85, 247, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create nodes
    const nodeCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
    const nodes = Array.from({ length: nodeCount }, () => new Node());
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.3;
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(34, 211, 238, ${alpha})`);
            gradient.addColorStop(0.5, `rgba(59, 130, 246, ${alpha})`);
            gradient.addColorStop(1, `rgba(168, 85, 247, ${alpha})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(to bottom, #000000, #0a0a0a, #000000)' }}
    />
  );
};

// Experience Card Component
const ExperienceCard = ({ experience, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const icons = {
    'Full-Stack Developer': Code,
    'Agentic AI Developer': Brain,
    'UI/UX Designer': Palette,
    'Frontend Development Intern': Code
  };
  
  const Icon = icons[experience.role] || Briefcase;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {experience.role}
              </h3>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{experience.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-3">
            {experience.description.map((desc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                <p className="text-gray-300 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Tech Tags */}
          {experience.technologies && (
            <div className="flex flex-wrap gap-2 mt-6">
              {experience.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Main Experience Component
const Experience = () => {
  const experiences = [
    {
      role: 'Full-Stack Developer',
      company: 'Freelance / Remote',
      period: '2023 – Present',
      location: 'Remote',
      description: [
        'Developed and deployed web applications using Next.js, React.js, Node.js, TypeScript, and Python.',
        'Built scalable backend systems and RESTful APIs with modern frameworks.',
        'Implemented responsive UI components with focus on performance and user experience.'
      ],
      technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Python', 'Tailwind CSS']
    },
    {
      role: 'Agentic AI Developer',
      company: 'Projects',
      period: '2025 – Present',
      location: 'Remote',
      description: [
        'Built AI-driven solutions using OpenAI Agents SDK and n8n automation workflows.',
        'Designed and implemented intelligent automation systems for complex business processes.',
        'Integrated multi-agent architectures for enhanced decision-making capabilities.'
      ],
      technologies: ['OpenAI API', 'n8n', 'Python', 'AI Agents']
    },
    {
      role: 'UI/UX Designer',
      company: 'Freelance',
      period: '2023 – Present',
      location: 'Remote',
      description: [
        'Designed user-friendly interfaces and prototypes using Figma for web and mobile apps.',
        'Created comprehensive design systems and style guides for consistency.',
        'Conducted user research and usability testing to optimize user experience.'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch']
    },
    {
      role: 'Frontend Development Intern',
      company: 'QBS Co. Pvt. Ltd.',
      period: 'July 2025 – August 2025',
      location: 'On-site',
      description: [
        'Completed a 6-week internship focusing on frontend development.',
        'Contributed to UI/UX component improvements and development tasks.',
        'Gained hands-on experience in building and polishing frontend features.'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'CSS3', 'HTML5', 'Git', 'Github']
    }
  ];
  
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center py-20 overflow-hidden">
      {/* Neural Network Background */}
      <NeuralBackground />
      
      {/* Volumetric Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left light */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Bottom-right light */}
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm font-medium text-cyan-400 backdrop-blur-xl">
              Professional Journey
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A timeline of my professional growth and technical expertise across
            <span className="text-cyan-400 font-semibold"> full-stack development</span>,
            <span className="text-purple-400 font-semibold"> AI solutions</span>, and
            <span className="text-blue-400 font-semibold"> creative design</span>
          </p>
        </motion.div>
        
        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              index={index}
            />
          ))}
        </div>
        
        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 mb-6">
            Interested in working together?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;