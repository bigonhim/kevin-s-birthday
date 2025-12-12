import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, AudioLines, Loader2, AlertCircle } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

interface AudioPlayerProps {
  sender: string;
  src?: string;
  text?: string;
  index: number;
}

// Helper to decode base64 string to Uint8Array
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper to decode raw PCM data into an AudioBuffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ sender, src, text, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref for standard HTML Audio (URL based)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Refs for Web Audio API (Text-to-Speech based)
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);

  // Initialize Audio Context on mount if needed
  useEffect(() => {
    return () => {
      // Cleanup Web Audio
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleEnded = () => {
    setIsPlaying(false);
    pauseTimeRef.current = 0;
  };

  const playVoiceMessage = async () => {
    // Initialize AudioContext if not exists
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;

    // Resume context if suspended (browser policy)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    // If we have the buffer, just play it
    if (audioBufferRef.current) {
      playBuffer(audioBufferRef.current, ctx);
      return;
    }

    // Otherwise, generate it from the text provided
    if (!text) return;
    
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Puck' }, // Standard male voice
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const pcmBytes = decode(base64Audio);
        const buffer = await decodeAudioData(pcmBytes, ctx, 24000, 1);
        audioBufferRef.current = buffer;
        playBuffer(buffer, ctx);
      }
    } catch (error) {
      console.error("Error playing message:", error);
      setError("Failed to generate audio");
    } finally {
      setIsLoading(false);
    }
  };

  const playBuffer = (buffer: AudioBuffer, ctx: AudioContext) => {
    // Stop any existing source
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) { /* ignore */ }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    
    // Calculate start time (resume from pause or start from 0)
    const offset = pauseTimeRef.current % buffer.duration;
    
    source.start(0, offset);
    startTimeRef.current = ctx.currentTime - offset;
    
    source.onended = () => {
      // Only reset if we reached the end naturally (not stopped manually)
      if (ctx.currentTime - startTimeRef.current >= buffer.duration - 0.1) {
        handleEnded();
      }
    };
    
    sourceNodeRef.current = source;
    setIsPlaying(true);
  };

  const pauseVoiceMessage = () => {
    if (sourceNodeRef.current && audioContextRef.current) {
      sourceNodeRef.current.stop();
      // Record where we paused
      pauseTimeRef.current = audioContextRef.current.currentTime - startTimeRef.current;
      sourceNodeRef.current = null;
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    setError(null);
    if (src) {
      // Handle standard audio file
      if (!audioRef.current) return;
      
      // Check if file is loadable (basic check)
      if (audioRef.current.error) {
         setError("Audio unavailable");
         return;
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback error:", error);
            setError("Cannot play audio");
            setIsPlaying(false);
          });
        }
        setIsPlaying(true);
      }
    } else if (text) {
      // Handle Voice Message (generated from text)
      if (isPlaying) {
        pauseVoiceMessage();
      } else {
        playVoiceMessage();
      }
    }
  };

  // Setup standard audio listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Reset state when src changes
    setIsPlaying(false);
    setError(null);

    const onEnded = () => setIsPlaying(false);
    const onError = () => {
      console.error("Audio source error");
      setError("Audio Unavailable");
      setIsPlaying(false);
    };
    
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [src]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-center gap-6 p-6 border border-gray-200 hover:border-accent/30 bg-white/50 backdrop-blur-sm transition-colors duration-300 rounded-lg group"
    >
      {/* Standard Audio Element for URL based tracks */}
      {src && <audio ref={audioRef} src={src} preload="none" />}
      
      <button 
        onClick={togglePlay}
        disabled={isLoading}
        className={`w-12 h-12 flex items-center justify-center rounded-full text-white transition-colors duration-300 shrink-0 shadow-sm ${
          error ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary group-hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed'
        }`}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : error ? (
          <AlertCircle className="w-4 h-4" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-1" />
        )}
      </button>

      <div className="flex-grow">
        <p className="font-serif text-lg font-medium text-primary mb-1">From: {sender}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
          {error ? (
            <span className="text-gray-400">{error}</span>
          ) : isPlaying ? (
             <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex items-center gap-1 text-accent"
             >
               <AudioLines className="w-4 h-4" />
               <span>Playing...</span>
             </motion.div>
          ) : (
            <span>{isLoading ? 'Loading...' : 'Click to Listen'}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};