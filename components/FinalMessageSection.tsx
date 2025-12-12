import React from 'react';
import { motion } from 'framer-motion';
import { SectionContainer } from './SectionContainer';

export const FinalMessageSection: React.FC = () => {
  return (
    <SectionContainer className="min-h-[80vh] flex items-center justify-center text-center">
      <div className="max-w-4xl mx-auto">
        
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
        >
          THE MANDATE: <br />
          <span className="text-accent">YOUR YEAR.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto space-y-6"
        >
          <p>
          You’ve carried more than most will ever know.
            This year is about standing tall in what you’ve become.
            Own your pace. Own your path.
          </p>
          <p>
          And when the road shakes, remember —
          you don’t walk it alone.
          </p>
          <p className="font-serif text-2xl text-primary font-bold pt-8">
            Happy Birthday, Brother.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1 }}
           viewport={{ once: true }}
           className="mt-20"
        >
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-accent transition-colors duration-300"
          >
            Replay The Tribute
          </button>
        </motion.div>

      </div>
    </SectionContainer>
  );
};