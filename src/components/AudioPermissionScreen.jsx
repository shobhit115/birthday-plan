// Import a few of your existing clouds to decorate the background
import { motion } from 'framer-motion';
import cloud1 from '../assets/cloud5.webp';
import cloud2 from '../assets/cloud4.webp';
import cloud3 from '../assets/cloud3.webp';

export default function AudioPermissionScreen({ onStart }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-sky-500 overflow-hidden">
      
      {/* Decorative Background Clouds */}
      
      {/* Cloud 1: Moves Left to Right */}
      <motion.img 
        src={cloud1} 
        alt="" 
        // Mobile: w-48 | Tablet: w-[400px] | Desktop: w-[700px] (Very Big)
        className="absolute top-[0%] w-[400px] lg:w-[700px] opacity-80 pointer-events-none" 
        initial={{ x: "-20vw" }}
        animate={{ x: "120vw" }}
        transition={{
            duration: 25, 
            repeat: Infinity,
            ease: "linear",
        }}
      />
      
      {/* Cloud 2: Moves Right to Left */}
      <motion.img 
        src={cloud2} 
        alt="" 
        // Mobile: w-64 | Tablet: w-[500px] | Desktop: w-[900px] (Huge)
        className="absolute top-[10%] w-[500px] lg:w-[900px] opacity-90 pointer-events-none" 
        initial={{ x: "10vw" }}
        animate={{ x: "50vw" }}
        transition={{
            duration: 35, 
            repeat: Infinity,
            ease: "linear",
        }}
      />
      
      {/* Cloud 3: Moves Left to Right (Slower) */}
      <motion.img 
        src={cloud3} 
        alt="" 
        // Mobile: w-72 | Tablet: w-[600px] | Desktop: w-[1100px] (Massive)
        className="absolute bottom-[10%] w-[600px] lg:w-[1100px] opacity-70 pointer-events-none" 
        initial={{ x: "-50vw" }}
        animate={{ x: "120vw" }}
        transition={{
            duration: 45, 
            repeat: Infinity,
            ease: "linear",
        }}
      />

      {/* Main Content */}
      <div className="text-center p-6 max-w-md z-10 relative">
        
        <p className="text-sky-50 mb-8 text-lg font-medium drop-shadow-sm">
          For the best experience with immersive sound and music, please click below.
        </p>
        
        <button
          onClick={onStart}
          className="px-8 py-3 bg-white text-sky-600 hover:bg-sky-50 font-bold text-lg rounded-full shadow-lg transition-all transform hover:scale-105"
        >
          Start ✈️
        </button>
      </div>
    </div>
  );
}