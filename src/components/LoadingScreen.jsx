import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import planeLogo from "../assets/logo.svg";

export default function LoadingScreen({ progress = 0 }) {
    const [showNetworkHint, setShowNetworkHint] = useState(false);
    
    // Framer motion values to smoothly animate the number
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    // This effect makes the percentage number slowly tick up to match the "progress" prop
    useEffect(() => {
        const animation = animate(count, progress, {
            duration: 1.2, // This matches the 1.2s duration of the airplane!
            ease: "easeOut",
        });

        return animation.stop;
    }, [progress, count]);

    // Network hint timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNetworkHint(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-sky-400 flex flex-col items-center justify-center z-50">

            {/* Animation Container */}
            <div className="relative w-64 md:w-96 h-16 flex items-center">

                {/* Trail syncing with progress */}
                <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                    }}
                />

                {/* Plane syncing with progress */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 flex-shrink-0"
                    initial={{ left: "0%" }}
                    animate={{ left: `${progress}%` }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                    }}
                >
                    <img
                        src={planeLogo}
                        alt="Loading..."
                        className="w-full h-full object-contain drop-shadow-lg flex-shrink-0"
                    />
                </motion.div>
            </div>

            {/* Loading Text & Percentage */}
            <div className="mt-6 flex flex-col items-center">
                <motion.p
                    className="text-white font-semibold tracking-[0.2em] uppercase text-sm drop-shadow-md"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Loading...
                </motion.p>
                
                {/* Display smoothly animated percentage */}
                <p className="text-white font-bold text-2xl mt-2 drop-shadow-md tracking-wider flex items-center">
                    <motion.span>{rounded}</motion.span>%
                </p>
            </div>

            {/* Helper Message */}
            <motion.p
                key={showNetworkHint ? "internet" : "desktop"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-10 text-center text-white/85 text-xs md:text-sm max-w-xs"
            >
                {showNetworkHint
                    ? "🌐 Taking longer than expected? Please connect to a stable, high-speed internet connection."
                    : "💻 For the best experience, please use a laptop or desktop."}
            </motion.p>
        </div>
    );
}