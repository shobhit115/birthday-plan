import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import planeLogo from "../assets/logo.svg";

export default function LoadingScreen() {
    const [showNetworkHint, setShowNetworkHint] = useState(false);

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

                {/* Trail */}
                <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "90%" }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Plane */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -ml-5"
                    initial={{ left: "0%" }}
                    animate={{ left: "93%" }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <img
                        src={planeLogo}
                        alt="Loading..."
                        className="w-12 h-12 object-contain drop-shadow-lg "
                    />
                </motion.div>
            </div>

            {/* Loading Text */}
            <motion.p
                className="mt-6 text-white font-semibold tracking-[0.2em] uppercase text-sm drop-shadow-md"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                Loading...
            </motion.p>

            {/* Helper Message */}
<motion.p
    key={showNetworkHint ? "internet" : "desktop"}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mt-4 text-center text-white/85 text-xs md:text-sm max-w-xs"
>
    {showNetworkHint
        ? "🌐 Taking longer than expected? Please connect to a stable, high-speed internet connection."
        : "💻 For the best experience, please use a laptop or desktop."}
</motion.p>
        </div>
    );
}