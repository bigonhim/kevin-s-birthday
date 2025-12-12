import React from 'react';
import { motion } from 'framer-motion';
import { SectionContainer } from './SectionContainer';

export const FeaturedTrackSection: React.FC = () => {
  return (
    <SectionContainer className="bg-white/50">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Image - Left aligned */}
        <div className="w-full md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="aspect-[3/4] overflow-hidden"
          >
             <img 
              src="https://picsum.photos/600/800?random=2" 
              alt="Looking forward"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/10 z-0" />
        </div>

        {/* Content - Right aligned */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="font-serif text-sm tracking-widest text-gray-500 uppercase mb-4">
            Track 1 of 2: The Road Ahead
          </h3>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            Everything (Amen)
          </h2>
          <p className="font-serif text-xl text-accent italic mb-8">by Timi Dakolo</p>
          
          <div className="prose prose-lg text-gray-600 font-sans mb-8">
            <p>
              This isn't just a song; it's a blueprint for the energy I see you carrying into this next chapter. It drives forward, unrelenting, yet full of atmosphere and space.
            </p>
            <p className="mt-4">
              Like the synth that builds, your potential is compounding. <em className="text-primary font-medium">Don't wait for the drop—create it.</em>
            </p>
          </div>

          {/* Spotify Embed */}
          <div className="w-full h-[152px] rounded-2xl overflow-hidden shadow-lg relative z-0">
             {/* Key prop forces re-render if needed, but standard eager loading usually suffices. 
                 Using a simple iframe here without lazy loading for immediate availability. */}
            <iframe 
              style={{borderRadius: '12px'}} 
              src="https://open.spotify.com/embed/track/0fMFygZkl6SxSgYbXNQZME?utm_source=generator" 
              width="100%" 
              height="152" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              title="Everything (Amen) by Timi Dakolo"
              className="absolute top-0 left-0 w-full h-full"
              loading="eager"
            ></iframe>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};