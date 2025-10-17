import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// Neural Network Background Component
const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class NeuralNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
        this.hue = Math.random() * 60 + 200;
        this.pulse = 0;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.pulse += this.pulseSpeed;
      }

      draw(ctx) {
        const alpha = 0.6 + Math.sin(this.pulse) * 0.3;
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 3
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, ${alpha * 0.3})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 60%, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${alpha})`;
        ctx.fill();
      }
    }

    const nodes = Array.from({ length: 80 }, () => new NeuralNode());

    let animationId;

    function animate() {
      ctx.fillStyle = 'rgba(8, 8, 24, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodes.forEach((nodeA, i) => {
        nodes.slice(i + 1).forEach(nodeB => {
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `hsla(200, 60%, 60%, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw(ctx);
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
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
    />
  );
};

// Floating AI Assistant Icon - Enhanced for mobile
const AIAssistant = () => {
  return (
    <motion.div
      className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 z-20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl sm:rounded-2xl blur-lg opacity-50" />
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-cyan-400/30 shadow-2xl">
          <svg
            className="w-full h-full text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        
        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-cyan-400 rounded-xl sm:rounded-2xl"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Enhanced Earth Canvas Wrapper - Improved responsiveness
const EnhancedEarthCanvas = () => {
  return (
    <div className="relative xl:flex-1 xl:h-auto md:h-[550px] h-[350px] sm:h-[450px] lg:h-[600px] w-full">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl blur-2xl" />
      
      {/* Orbital Rings */}
      <motion.div
        className="absolute inset-0 border border-cyan-400/20 rounded-2xl sm:rounded-3xl"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      <motion.div
        className="absolute inset-3 sm:inset-4 border border-purple-400/20 rounded-xl sm:rounded-2xl"
        animate={{
          rotate: -360,
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      <EarthCanvas />
    </div>
  );
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // EmailJS Configuration - Direct values for testing
  const emailjsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_6h6gq0h", // Replace with your Service ID
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_5q8k7p9", // Replace with your Template ID
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY_HERE" // Replace with your Public Key
  };

  // Check EmailJS configuration on component mount
  useEffect(() => {
    console.log("🔧 EmailJS Configuration Check:", {
      serviceId: emailjsConfig.serviceId ? "✅ Set" : "❌ Missing",
      templateId: emailjsConfig.templateId ? "✅ Set" : "❌ Missing",
      publicKey: emailjsConfig.publicKey ? "✅ Set" : "❌ Missing"
    });

    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setError("⚠️ EmailJS configuration incomplete. Please check your .env file.");
    }
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setError("❌ Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!form.email.includes('@')) {
      setError("❌ Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Check EmailJS configuration
    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setError("❌ EmailJS not configured. Please check your environment variables.");
      setLoading(false);
      return;
    }

    try {
      console.log("📧 Sending email with config:", emailjsConfig);
      
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          to_name: "Fatima Nazeer",
          from_email: form.email,
          to_email: "fizanazz321@gmail.com",
          message: form.message,
          reply_to: form.email,
        },
        emailjsConfig.publicKey
      );

      console.log("✅ Email sent successfully:", result);
      
      setLoading(false);
      setIsSubmitted(true);
      
      // Reset form
      setForm({
        name: "",
        email: "", 
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error("❌ Email sending failed:", error);
      setLoading(false);
      
      if (error.text) {
        setError(`❌ Failed to send message: ${error.text}`);
      } else {
        setError("❌ Failed to send message. Please check your EmailJS configuration.");
      }
    }
  };

  // Input field animation variants
  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)",
      borderColor: "rgba(34, 211, 238, 0.5)",
    },
    blur: {
      scale: 1,
      boxShadow: "0 0 0px rgba(34, 211, 238, 0)",
      borderColor: "rgba(255, 255, 255, 0.1)",
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-8 sm:py-12 lg:py-20 overflow-hidden">
      {/* Neural Network Background */}
      <NeuralBackground />
      
      {/* Volumetric Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className={`relative z-10 flex xl:flex-row flex-col-reverse gap-6 sm:gap-8 lg:gap-10 overflow-hidden w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Contact Form */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl w-full'
        >
          {/* AI Assistant */}
          <AIAssistant />

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-xl sm:rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-red-400 font-bold text-sm sm:text-base">Configuration Issue</h4>
                  <p className="text-red-300/80 text-xs sm:text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl sm:rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-green-400 font-bold text-sm sm:text-base">🎉 Message Sent Successfully!</h4>
                  <p className="text-green-300/80 text-xs sm:text-sm">I'll get back to you soon! 💖</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Header with Soundwave Animation */}
          <div className="relative mb-6 sm:mb-8">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='text-cyan-400 text-sm sm:text-lg font-mono tracking-widest uppercase mb-2'
            >
              Get in touch
            </motion.p>
            
            <div className="flex items-center gap-3 sm:gap-4">
              <h3 className='text-2xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                Contact.
              </h3>
              
              {/* Soundwave Animation */}
              <motion.div className="flex items-end gap-0.5 sm:gap-1 h-6 sm:h-8">
                {[1, 2, 3, 2, 4, 3, 2, 1].map((height, index) => (
                  <motion.div
                    key={index}
                    className="w-0.5 sm:w-1 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full"
                    style={{ height: `${height * 3}px` }}
                    animate={{
                      height: [`${height * 3}px`, `${(height + 2) * 3}px`, `${height * 3}px`],
                    }}
                    transition={{
                      duration: 1 + index * 0.1,
                      repeat: Infinity,
                      delay: index * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6'
          >
            {/* Name Input */}
            <motion.label className='flex flex-col relative'>
              <motion.span 
                className='text-cyan-300 font-medium mb-2 sm:mb-3 text-base sm:text-lg'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your Name
              </motion.span>
              <motion.input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className='bg-white/5 py-3 sm:py-4 px-4 sm:px-6 placeholder:text-gray-400 text-white rounded-xl sm:rounded-2xl outline-none border border-white/10 font-medium backdrop-blur-sm transition-all duration-300 text-sm sm:text-base'
                variants={inputVariants}
                whileFocus="focus"
                required
              />
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                animate={{ width: form.name ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.label>

            {/* Email Input */}
            <motion.label className='flex flex-col relative'>
              <motion.span 
                className='text-cyan-300 font-medium mb-2 sm:mb-3 text-base sm:text-lg'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your Email
              </motion.span>
              <motion.input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className='bg-white/5 py-3 sm:py-4 px-4 sm:px-6 placeholder:text-gray-400 text-white rounded-xl sm:rounded-2xl outline-none border border-white/10 font-medium backdrop-blur-sm transition-all duration-300 text-sm sm:text-base'
                variants={inputVariants}
                whileFocus="focus"
                required
              />
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                animate={{ width: form.email ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.label>

            {/* Message Input */}
            <motion.label className='flex flex-col relative'>
              <motion.span 
                className='text-cyan-300 font-medium mb-2 sm:mb-3 text-base sm:text-lg'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Your Message
              </motion.span>
              <motion.textarea
                rows={4}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='What you want to say?'
                className='bg-white/5 py-3 sm:py-4 px-4 sm:px-6 placeholder:text-gray-400 text-white rounded-xl sm:rounded-2xl outline-none border border-white/10 font-medium backdrop-blur-sm transition-all duration-300 resize-none text-sm sm:text-base min-h-[120px] sm:min-h-[150px]'
                variants={inputVariants}
                whileFocus="focus"
                required
              />
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                animate={{ width: form.message ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.label>

            {/* Submit Button */}
            <motion.button
              type='submit'
              disabled={loading}
              className='relative bg-gradient-to-r from-cyan-500 to-purple-500 py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl outline-none w-full sm:w-fit text-white font-bold shadow-2xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2">
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </>
                )}
              </span>

              {/* Pulse Effect */}
              {!loading && (
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400 rounded-xl sm:rounded-2xl"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 1.1, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </motion.button>
          </form>

          {/* Configuration Debug Info */}
          <div className="mt-4 p-3 bg-black/20 rounded-lg">
            <p className="text-xs text-gray-400">
              💡 <strong>Debug Info:</strong> Check browser console for EmailJS configuration status
            </p>
            <p className="text-xs text-cyan-400 mt-1">
              🔧 Service ID: {emailjsConfig.serviceId ? "✅ Set" : "❌ Missing"}
            </p>
          </div>
        </motion.div>

        {/* Enhanced Earth Canvas */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="w-full xl:flex-1 flex items-center justify-center"
        >
          <EnhancedEarthCanvas />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");