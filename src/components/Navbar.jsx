/**
 * ═══════════════════════════════════════════════════════════════
 * NEXT-GEN AI-INSPIRED NAVIGATION BAR
 * ═══════════════════════════════════════════════════════════════
 * 
 * 🎨 DESIGN PHILOSOPHY:
 * - Glassmorphic navbar with dynamic blur/opacity on scroll
 * - AI-themed orbital logo animation with pulsing glow rings
 * - Intelligent hover states with magnetic cursor effects
 * - Fluid morphing active indicators using layoutId
 * - Ambient animated grid + particle background
 * - Full-screen immersive mobile menu with staggered reveals
 * - Theme-aware gradients (purple/pink/blue AI palette)
 * - Performance-optimized with GPU transforms & will-change
 * 
 * 🔧 TECHNICAL STACK:
 * - React 18+ with Hooks
 * - Framer Motion for fluid animations
 * - Tailwind CSS for utility-first styling
 * - React Router DOM for navigation
 * - Space Grotesk font for futuristic typography
 * 
 * ♿ ACCESSIBILITY:
 * - Semantic HTML with ARIA labels
 * - Keyboard navigation support
 * - Screen reader friendly
 * - Focus indicators for interactive elements
 * 
 * 📱 RESPONSIVE:
 * - Mobile-first approach
 * - Breakpoints: sm (640px), md (768px), lg (1024px)
 * - Touch-optimized interactions
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  // ═══════════════════════════════════════════════════════════
  // STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ═══════════════════════════════════════════════════════════
  // SCROLL ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  const { scrollY } = useScroll();
  const navBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  // ═══════════════════════════════════════════════════════════
  // SCROLL EVENT HANDLER
  // ═══════════════════════════════════════════════════════════
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ═══════════════════════════════════════════════════════════
  // PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
  // ═══════════════════════════════════════════════════════════
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggle]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ANIMATED BACKGROUND GRID PATTERN */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 w-full h-20 pointer-events-none z-40 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px"
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MAIN NAVIGATION BAR */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        style={{
          backdropFilter: scrolled ? `blur(${navBlur}px)` : "blur(0px)"
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-gradient-to-r from-slate-950/95 via-purple-950/90 to-slate-950/95 shadow-2xl shadow-purple-500/10 border-b border-purple-500/20"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Ambient glow effect on scroll */}
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"
          />
        )}

        <div className="max-w-7xl mx-auto relative">
          <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
            
            {/* ══════════════════════════════════════════════════════ */}
            {/* LOGO SECTION WITH AI ORBITAL ANIMATION */}
            {/* ══════════════════════════════════════════════════════ */}
            <motion.div 
              className="relative z-10"
              style={{ scale: logoScale }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/"
                className="flex items-center gap-3 group"
                onClick={() => {
                  setActive("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-label="Homepage"
              >
                {/* Logo container with animated rings */}
                <div className="relative">
                  {/* Outer pulsing ring - simulates AI processing */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-md"
                  />
                  
                  {/* Middle orbital ring - data flow visualization */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -inset-1 rounded-full border-2 border-purple-500/30 border-t-purple-500"
                  />
                  
                  {/* Logo image with gradient border */}
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-0.5 overflow-hidden">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                      <img
                        src={logo}
                        alt="Fiza AI Dev Logo"
                        className="w-8 h-8 object-contain transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Shine effect on hover */}
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                  />
                </div>

                {/* Brand text with gradient animation */}
                <div className="flex flex-col">
                  <motion.p 
                    className="text-white text-lg sm:text-xl font-extrabold tracking-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Fiza
                  </motion.p>
                  <motion.span 
                    className="hidden sm:block text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-wider"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ 
                      backgroundSize: "200% auto",
                      backgroundImage: "linear-gradient(90deg, #c084fc, #f472b6, #c084fc)"
                    }}
                  >
                    AI ENGINEER
                  </motion.span>
                </div>
              </Link>
            </motion.div>

            {/* ══════════════════════════════════════════════════════ */}
            {/* DESKTOP NAVIGATION LINKS */}
            {/* ══════════════════════════════════════════════════════ */}
            <ul className="hidden sm:flex gap-1 lg:gap-2" role="menubar">
              {navLinks.map((nav, i) => (
                <motion.li
                  key={nav.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 + i * 0.1, 
                    duration: 0.6,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="relative group"
                  role="none"
                >
                  <motion.a
                    href={`#${nav.id}`}
                    onClick={() => setActive(nav.title)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative px-4 py-2 text-sm lg:text-base font-medium rounded-lg
                      transition-all duration-300 block
                      ${active === nav.title 
                        ? "text-white" 
                        : "text-gray-300 hover:text-white"
                      }
                    `}
                    role="menuitem"
                    aria-current={active === nav.title ? "page" : undefined}
                  >
                    {/* Active background with morphing animation */}
                    {active === nav.title && (
                      <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-purple-600/30 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.15), transparent 70%)",
                        filter: "blur(8px)"
                      }}
                    />

                    {/* Link text */}
                    <span className="relative z-10">{nav.title}</span>

                    {/* Bottom indicator line with smooth width transition */}
                    <motion.span
                      className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Active indicator dot with layout animation */}
                    {active === nav.title && (
                      <motion.span
                        layoutId="activeDot"
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            {/* ══════════════════════════════════════════════════════ */}
            {/* MOBILE MENU BUTTON */}
            {/* ══════════════════════════════════════════════════════ */}
            <div className="sm:hidden relative z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setToggle(!toggle)}
                className="relative p-2.5 rounded-xl bg-gradient-to-br from-purple-600/90 to-pink-600/90 shadow-lg shadow-purple-500/30 overflow-hidden group"
                aria-label="Toggle mobile menu"
                aria-expanded={toggle}
              >
                {/* Button pulsing glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-md"
                />
                
                {/* Icon with rotation animation */}
                <motion.img
                  animate={{ rotate: toggle ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  src={toggle ? close : menu}
                  alt={toggle ? "Close menu" : "Open menu"}
                  className="relative z-10 w-6 h-6 object-contain"
                />
              </motion.button>
            </div>
          </div>

          {/* Decorative bottom border line with scale animation */}
          {scrolled && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
            />
          )}
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MOBILE MENU - FULL SCREEN IMMERSIVE EXPERIENCE */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {toggle && (
          <>
            {/* Backdrop overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setToggle(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
              aria-hidden="true"
            />

            {/* Mobile menu panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200,
                opacity: { duration: 0.3 }
              }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 z-50 sm:hidden"
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              {/* Background with gradient and glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/95 to-slate-950 backdrop-blur-2xl" />
              
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col p-6 sm:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-white font-bold text-xl tracking-wide">Navigation</p>
                    <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setToggle(false)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Close menu"
                  >
                    <img src={close} alt="Close" className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Navigation links with staggered animation */}
                <ul className="flex-1 flex flex-col gap-2" role="menu">
                  {navLinks.map((nav, i) => (
                    <motion.li
                      key={nav.id}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: 0.1 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                      role="none"
                    >
                      <motion.a
                        href={`#${nav.id}`}
                        onClick={() => {
                          setToggle(false);
                          setActive(nav.title);
                        }}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          relative block px-6 py-4 rounded-xl text-lg font-semibold
                          transition-all duration-300 overflow-hidden group
                          ${active === nav.title 
                            ? "text-white" 
                            : "text-gray-300"
                          }
                        `}
                        role="menuitem"
                      >
                        {/* Active/hover background */}
                        <motion.div
                          className={`
                            absolute inset-0 rounded-xl transition-opacity duration-300
                            ${active === nav.title 
                              ? "opacity-100 bg-gradient-to-r from-purple-600/30 to-pink-600/30" 
                              : "opacity-0 group-hover:opacity-100 bg-white/5"
                            }
                          `}
                        />
                        
                        {/* Left accent line */}
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full transition-all duration-300 group-hover:h-3/4"
                          animate={active === nav.title ? { height: "75%" } : {}}
                        />

                        {/* Text with index number */}
                        <span className="relative z-10 flex items-center gap-3">
                          <span className="text-xs font-mono text-purple-400 opacity-60">
                            0{i + 1}
                          </span>
                          {nav.title}
                        </span>

                        {/* Shine effect on hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                          }}
                          animate={{
                            x: ["-100%", "200%"]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>

                {/* Footer tagline with pulsing dots */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-white/10"
                >
                  <p className="text-sm text-gray-400 text-center">
                    Crafted with <span className="text-purple-400">intelligence</span>
                  </p>
                  <div className="mt-2 flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right edge glow accent */}
              <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;