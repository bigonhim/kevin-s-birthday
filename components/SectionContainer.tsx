import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({ 
  children, 
  id, 
  className = "",
  delay = 0 
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={`w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 relative ${className}`}
    >
      {children}
    </motion.section>
  );
};