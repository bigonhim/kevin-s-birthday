import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const element = document.getElementById('tribute');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-4 md:py-0">
      
      {/* Background Decorative Element - Subtle gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Text Content */}
        <div className="md:col-span-7 z-10 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6">
              HAPPY BIRTHDAY. <br />
              <span className="text-accent italic font-light">KEVIN.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-sans text-lg md:text-xl text-gray-600 max-w-md mb-10 leading-relaxed"
          >
            A deep dive into your legacy. A collection of moments, voices, and intent curated for this specific moment in time.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToNext}
            className="group flex items-center gap-3 text-sm tracking-widest uppercase font-bold text-primary border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors duration-300"
          >
            Begin Transmission
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>
        </div>

        {/* Hero Image */}
        <div className="md:col-span-5 relative order-1 md:order-2 h-[50vh] md:h-[70vh] w-full mt-4 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="w-full h-full relative overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 bg-accent/10 z-10 mix-blend-multiply" />
            <img 
              src="/kevin-hero.jpg" 
              alt="Kevin"
              className="w-full h-full object-cover object-center hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};