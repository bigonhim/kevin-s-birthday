import React from 'react';
import { HeroSection } from './components/HeroSection';
import { AudioTributeSection } from './components/AudioTributeSection';
import { FeaturedTrackSection } from './components/FeaturedTrackSection';
import { ReflectionSection } from './components/ReflectionSection';
import { NostalgiaTrackSection } from './components/NostalgiaTrackSection';
import { FinalMessageSection } from './components/FinalMessageSection';

const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-background font-sans text-primary overflow-hidden selection:bg-accent selection:text-white">
      <HeroSection />
      <AudioTributeSection id="tribute" />
      <FeaturedTrackSection />
      <ReflectionSection />
      <NostalgiaTrackSection />
      <FinalMessageSection />
      
      {/* Footer / Copyright */}
      <footer className="py-8 text-center text-sm text-gray-400 font-sans">
        <p>© {new Date().getFullYear()} A Tribute to Brotherhood.</p>
      </footer>
    </main>
  );
};

export default App;