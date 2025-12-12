import React from 'react';
import { motion } from 'framer-motion';
import { SectionContainer } from './SectionContainer';

export const ReflectionSection: React.FC = () => {
  const words = "We are not defined by the years that pass, but by the bonds that remain unbreakable.".split(" ");

  return (
    <SectionContainer className="py-32 md:py-48">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-12 tracking-wide">
          <span className="border-b border-accent pb-2">THREADS OF TIME</span>
        </h2>
        
        <div className="font-serif text-2xl md:text-4xl lg:text-5xl leading-tight text-primary">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.05,
                  ease: "easeOut" 
                }}
                viewport={{ once: true, margin: "-10%" }}
                className="inline-block mr-3"
              >
                {word === "bonds" || word === "unbreakable." ? (
                  <span className="text-accent italic">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="mt-12 font-sans text-gray-500 max-w-lg mx-auto leading-relaxed"
        >
          From the backyard scrapes to the boardroom victories, every step has been a testament to your character. This year isn't just another number; it's a new terrain.
        </motion.p>
      </div>
    </SectionContainer>
  );
};