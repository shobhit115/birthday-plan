import { motion, useScroll, useTransform } from "framer-motion";
import Cloud from './Cloud';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Airplane from './Airplane';

// Ensure these point to your actual assets folder
import cloud1 from '../assets/cloud1.svg';
import cloud2 from '../assets/cloud2.svg';
import cloud3 from '../assets/cloud3.svg';
import cloud4 from '../assets/cloud4.svg';
import cloud5 from '../assets/cloud5.svg';
import cloud6 from '../assets/cloud6.svg';

import nightBackground from '../assets/background.jpg';

export default function SkyScene() {
    const { scrollYProgress } = useScroll();

    // --- NEW: Check if today is July 30th ---
    const today = new Date();
    // getMonth() is 0-indexed (0 = Jan, 6 = July), getDate() is 1-indexed
    const isBirthday = today.getMonth() === 6 && today.getDate() === 30;

    // 1. Night sky fades in towards the end
    const nightOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 0.4]);
    
    // 2. Scroll Prompt fades out very quickly at the beginning
    const scrollPromptOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    // 3. Text fades in and slides up slightly after Phase 2 (0.70)
    const textOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.7, 1], [40, 0]);

    const cloudData = [
        // Background/Mid-ground clouds
        { id: 1, src: cloud1, dir: 'left', style: "top-[85%] md:top-[60%] left-[-10%] md:left-[-5%] w-52 md:w-80 opacity-80 z-10" },
        { id: 2, src: cloud2, dir: 'right', style: "top-[75%] md:top-[70%] right-[-10%] md:right-[-5%] w-60 md:w-96 opacity-95 z-10" },
        // Foreground, massive clouds that feel very close
        { id: 3, src: cloud3, dir: 'left', style: "top-[65%] md:top-[60%] left-[-30%] md:left-[-5%] w-[40rem] md:w-[45rem] z-20" },
        { id: 4, src: cloud4, dir: 'right', style: "top-[50%] md:top-[45%] right-[-5%] md:right-[5%] w-64 md:w-[35rem] z-20" },
        // Huge bottom cloud
        { id: 5, src: cloud5, dir: 'left', style: "bottom-[10%] md:bottom-[-5%] left-[5%] md:left-[5%] w-[20rem] md:w-[50rem] opacity-95 z-30" },
        { id: 6, src: cloud5, dir: 'right', style: "top-[70%] md:top-[50%] right-[-25%] md:right-[10%] w-[40rem] md:w-[50rem] z-10" },
        { id: 7, src: cloud3, dir: 'right', style: "top-[70%] md:top-[60%] left-[60%] md:left-[75%] w-80 md:w-[40rem] z-20" },
    ];

    return (
        <div className="h-[1200vh] bg-gradient-to-b from-sky-400 via-sky-700 to-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Permanent Background Cloud (Cloud 6) */}
                <img
                    src={cloud6}
                    alt="background sky"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60 z-0"
                />
                
                {/* Fading Night Sky Background */}
                <motion.img
                    src={nightBackground}
                    alt="Night Sky"
                    style={{ opacity: nightOpacity }}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[-100]"
                />

                {/* Scroll Down Prompt */}
                <motion.div 
                    style={{ opacity: scrollPromptOpacity }}
                    className="absolute top-[20%] flex flex-col items-center z-50 pointer-events-none"
                >
                    <p className="text-white text-lg md:text-2xl tracking-[0.3em] uppercase font-semibold drop-shadow-md">
                        Scroll Down
                    </p>
                    <div className="text-white text-3xl mt-4 animate-bounce">
                        ↓
                    </div>
                </motion.div>

                {/* Dynamic Text (Birthday or Not) */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute top-[75%] flex flex-col items-center w-full px-4 z-30 pointer-events-none"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] text-center">
                        {isBirthday ? "Happy Birthday Harsh!" : "Wait a minute..."}
                    </h1>
                    <p className="text-xl md:text-3xl text-sky-100 mt-4 font-light tracking-wide drop-shadow-md text-center">
                        {isBirthday 
                            ? "May all your dreams take flight. Enjoy your special day!" 
                            : "It is not your birthday today! Still Wishing you lots of happiness, good health, and success. Have an amazing day!"}
                    </p>
                </motion.div>

                {/* Render the moving clouds */}
                {cloudData.map((cloud) => (
                    <Cloud
                        key={cloud.id}
                        src={cloud.src}
                        direction={cloud.dir}
                        styleClass={cloud.style}
                        scrollProgress={scrollYProgress}
                    />
                ))}
                
                <div className="absolute inset-0 pointer-events-none z-40">
                    <Canvas
                        camera={{
                            position: [0, 0, 8],
                            fov: 55,
                        }}
                    >
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[10, 10, 5]} intensity={2} />
                        <Environment preset="city" />

                        <Airplane scrollProgress={scrollYProgress} />
                    </Canvas>
                </div>

            </div>
        </div>
    );
}