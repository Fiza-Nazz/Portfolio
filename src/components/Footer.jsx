// Footer.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail,
  ArrowUp,
  Sparkles,
  Code2,
  Palette
} from "lucide-react";

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.8, 0.9], [0.8, 1]);

  // Back to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  // Social media links
  const socialLinks = [
    { icon: Github, href: "https://github.com/Fiza-Nazz", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/fiza-nazz-765241355/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/FizaNazzx", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/zii_tech_63?igsh=eDg5ZnA4ZmUyb3B6", label: "Instagram" },
    { icon: Mail, href: "mailto:hello@Fizanaazz321@gmail.com", label: "Email" },
  ];

  // Floating orbs data
  const orbs = [
    { color: "from-cyan-500/20 to-blue-500/20", size: "w-8 h-8", delay: 0 },
    { color: "from-purple-500/20 to-pink-500/20", size: "w-12 h-12", delay: 2 },
    { color: "from-blue-500/20 to-cyan-500/20", size: "w-6 h-6", delay: 4 },
    { color: "from-pink-500/20 to-purple-500/20", size: "w-10 h-10", delay: 6 },
  ];

  return (
    <motion.footer
      ref={footerRef}
      style={{ opacity, scale }}
      className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-t border-white/10 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        {orbs.map((orb, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full bg-gradient-to-r ${orb.color} blur-xl ${orb.size}`}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + index * 20}%`,
              top: `${10 + (index % 3) * 30}%`,
            }}
          />
        ))}

        {/* Neural Network Lines */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" className="text-cyan-500/20">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M ${i * 150} 0 Q ${i * 150 + 75} 100, ${i * 150} 200`}
                stroke="url(#neuralGradient)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </svg>
        </div>

        {/* Volumetric Lighting */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 gap-12"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        >
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.div
                  className="w-3 h-3 bg-cyan-500 rounded-full absolute -top-1 -right-1"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Code2 className="w-8 h-8 text-cyan-400" />
              </div>
              <motion.h3
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Fiza Nazz
              </motion.h3>
            </motion.div>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              "Designing the future with creativity, intelligence, and innovation."
            </motion.p>

            {/* Newsletter Subscription */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Enter your email for updates"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-6 text-lg">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <motion.li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative group"
                    whileHover={{ x: 5 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="relative">
                      {link.name}
                      <motion.span
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300"
                        initial={false}
                      />
                    </span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6 text-lg">Let's Connect</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-gray-400 text-sm flex items-center gap-4">
            <span>© 2025 Fiza Qureshi. All rights reserved.</span>
            <motion.div
              className="flex items-center gap-2 text-cyan-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Palette className="w-4 h-4" />
              <span className="text-xs">Crafted with passion</span>
            </motion.div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <motion.a
              href="/privacy"
              className="hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/terms"
              className="hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-2xl border border-cyan-400/50 opacity-0 group-hover:opacity-100"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Assistant Orb */}
      <motion.div
        className="fixed bottom-24 right-24 z-40"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <motion.div
            className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-2xl shadow-cyan-500/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-md"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom selection colors */
        ::selection {
          background: rgba(6, 182, 212, 0.3);
          color: white;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
          border-radius: 4px;
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;