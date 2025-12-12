import React from 'react';
import { SectionContainer } from './SectionContainer';
import { AudioPlayer } from './AudioPlayer';

interface AudioTributeSectionProps {
  id?: string;
}

const mockMessages = [
  { id: '1', sender: "Mum", src: "https://kevin-birthday.s3.us-west-2.amazonaws.com/mum.ogg" },
  { id: '2', sender: "Sis", src: "https://kevin-birthday.s3.us-west-2.amazonaws.com/sis.ogg" },
  { id: '3', sender: "Bro", src: "https://kevin-birthday.s3.us-west-2.amazonaws.com/achim.ogg" },
  { id: '4', sender: "The Boys", src: "https://kevin-birthday.s3.us-west-2.amazonaws.com/bramwel.3gp" },
  { 
    id: '5', 
    sender: "Special Little one", 
    src: "https://kevin-birthday.s3.us-west-2.amazonaws.com/cherop-final.mp4", 
  },
];

export const AudioTributeSection: React.FC<AudioTributeSectionProps> = ({ id }) => {
  return (
    <SectionContainer id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Intro Text */}
        <div className="lg:col-span-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            THE COLLECTIVE <br/>
            <span className="border-b-2 border-accent/50 pb-1">HEARTBEAT</span>
          </h2>
          <p className="font-sans text-gray-600 leading-relaxed mb-8">
            Voices from the past and present, converging to celebrate the man you have become. Listen closely to the words they couldn't just write down.
          </p>
        </div>

        {/* Audio List */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {mockMessages.map((msg, idx) => (
            <AudioPlayer 
              key={msg.id} 
              index={idx} 
              sender={msg.sender} 
              src={msg.src} 
              text={(msg as any).text}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};