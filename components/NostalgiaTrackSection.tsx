import React from 'react';
import { motion } from 'framer-motion';
import { SectionContainer } from './SectionContainer';

export const NostalgiaTrackSection: React.FC = () => {
  return (
    <SectionContainer>
      <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-20 items-center">
        
        {/* Image - Right aligned (flex-row-reverse) */}
        <div className="w-full md:w-1/2 relative">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="aspect-square overflow-hidden rounded-full md:rounded-none"
          >
             <img 
              src="https://picsum.photos/800/800?random=3" 
              alt="A memory captured"
              className="w-full h-full object-cover grayscale sepia-[.2] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>

        {/* Content - Left aligned */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left md:text-right">
          <h3 className="font-serif text-sm tracking-widest text-gray-500 uppercase mb-4">
            Track 2 of 2: The Journey Ahead
            
          </h3>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            Believe
          </h2>
          <p className="font-serif text-xl text-accent italic mb-8">by Blessing Offer</p>
        <div className="prose prose-lg text-gray-600 font-sans mb-8 ml-auto">
          <p>
            Do you remember every impossible goal you set for yourself? The world told you to slow down, but you just turned up the volume and built your own lane.
          </p>
          <p className="mt-4">
            This song is the sound of your next chapter. May the conviction you carry serve as your foundation. Go live this year with <em className="text-primary font-medium">roaring intent</em>. Happy Birthday, Bro.
          </p>
        </div>

          {/* Embed Container */}
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/7SFT4ZWpZ20"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};