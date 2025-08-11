import { BrowserRouter } from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from "./components";
import Footer from "./components/Footer";

const StarsCanvas = React.lazy(() => import("./components/canvas/Stars"));

const App = () => {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    // Show StarsCanvas when Contact section is in view
    const handleScroll = () => {
      const contactSection = document.getElementById("contact-section");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setShowStars(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <div id="contact-section">
            <Contact />
          </div>
          {showStars && (
            <Suspense fallback={<div style={{height:300}} />}> {/* fallback can be improved */}
              <StarsCanvas />
            </Suspense>
          )}
          <Footer/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
