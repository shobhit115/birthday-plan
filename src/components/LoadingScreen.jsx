import { motion } from 'framer-motion';
import planeLogo from '../assets/logo.svg';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-sky-400 flex flex-col items-center justify-center z-50">
            
            {/* Animation Container */}
            <div className="relative w-64 md:w-96 h-16 flex items-center">
                
                {/* 1. The Trailing Line */}
                <motion.div
    className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-white rounded-full "
    initial={{ width: 0 }}
    animate={{ width: "100%" }}
    transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
    }}
/>
                {/* 2. The Moving Plane */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -ml-5" // -ml-5 offsets the plane so its center aligns with the line end
                    initial={{ left: "0%" }}
                    animate={{ left: "100%" }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <img 
                        src={planeLogo} 
                        alt="Loading..." 
                        className="w-12 h-12 object-contain drop-shadow-lg" 
                    />
                </motion.div>
            </div>
            
            {/* Loading Text */}
            <motion.p 
                className="mt-6 text-white font-semibold tracking-[0.2em] uppercase text-sm drop-shadow-md"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                loading...
            </motion.p>

        </div>
    );
}