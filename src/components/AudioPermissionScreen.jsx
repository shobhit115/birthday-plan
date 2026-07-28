// Import a few of your existing clouds to decorate the background
import cloud1 from '../assets/cloud1.svg';
import cloud2 from '../assets/cloud4.svg';
import cloud3 from '../assets/cloud3.svg';

export default function AudioPermissionScreen({ onStart }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-sky-500 overflow-hidden">
      
      {/* Decorative Background Clouds */}
      <img 
        src={cloud1} 
        alt="" 
        className="absolute top-[15%] left-[-5%] w-48 opacity-80 pointer-events-none" 
      />
      <img 
        src={cloud2} 
        alt="" 
        className="absolute top-[10%] right-[-5%] w-64 opacity-90 pointer-events-none" 
      />
      <img 
        src={cloud3} 
        alt="" 
        className="absolute bottom-[20%] left-[20%] w-72 opacity-70 pointer-events-none" 
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