import { motion, useScroll, useTransform } from "framer-motion";
import Cloud from './Cloud';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Airplane from './Airplane';
import { useEffect, useState } from "react";

import cloud1 from '../assets/cloud1.webp';
import cloud2 from '../assets/cloud2.webp';
import cloud3 from '../assets/cloud3.webp';
import cloud4 from '../assets/cloud4.webp';
import cloud5 from '../assets/cloud5.webp';
import cloud6 from '../assets/cloud6.svg';
import moon from '../assets/moon.webp';
import nightBackground from '../assets/background.webp';

export default function SkyScene({ planeAudioRef }) {
    const { scrollYProgress } = useScroll();

    // Dynamically adjust plane audio volume based on scroll progress (t)
    useEffect(() => {
        return scrollYProgress.onChange((t) => {
            if (!planeAudioRef?.current) return;

            if (t < 0.45) {
                // Phase 1: Hidden / Quiet
                planeAudioRef.current.volume = 0;
            } else if (t < 0.70) {
                // Phase 2: Flying closer, louder (Scale up volume from 0 to 1)
                const p = (t - 0.45) / 0.25;
                planeAudioRef.current.volume = Math.min(p * 1, 1);
            } else if (t < 0.85) {
                // Phase 3: Peak loudness (Keep high or max)
                planeAudioRef.current.volume = 1;
            } else {
                // Phase 4: Flying away, decreasing volume to 0
                const p = (t - 0.85) / 0.15;
                planeAudioRef.current.volume = Math.max(1 - p, 0);
            }
        });
    }, [scrollYProgress, planeAudioRef]);

    const today = new Date();

// Birthday: 30 July
const birthday = new Date(today.getFullYear(), 6, 30);

// Number of full days since birthday
const diffInDays = Math.floor(
  (today - birthday) / (1000 * 60 * 60 * 24)
);

// Show birthday message on:
// July 30 (0)
// July 31 (1)
// August 1 (2)
// August 2 (3)
const isBirthday = diffInDays >= 0 && diffInDays <= 3;

    const nightOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 0.4]);
    const moonOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.8]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const moonX = useTransform(scrollYProgress, [0, 1], isMobile ? ["15vw", "-40vw"] : ["-15vw", "-40vw"]);
    const moonY = useTransform(scrollYProgress, [0, 1], isMobile ? ["5vh", "20vh"] : [" 0vh", "20vh"]);
    const scrollPromptOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.7, 1], [40, 0]);

    const cloudData = [
        { id: 1, src: cloud1, dir: 'left', style: "top-[85%] md:top-[60%] left-[-10%] md:left-[-5%] w-52 md:w-80 opacity-80 z-10" },
        { id: 2, src: cloud2, dir: 'right', style: "top-[75%] md:top-[70%] right-[-10%] md:right-[-5%] w-60 md:w-96 opacity-95 z-10" },
        { id: 3, src: cloud3, dir: 'left', style: "top-[65%] md:top-[60%] left-[-30%] md:left-[-5%] w-[40rem] md:w-[45rem] z-20" },
        { id: 4, src: cloud4, dir: 'right', style: "top-[50%] md:top-[45%] right-[-5%] md:right-[5%] w-64 md:w-[35rem] z-20" },
        { id: 5, src: cloud5, dir: 'left', style: "bottom-[10%] md:bottom-[-5%] left-[5%] md:left-[5%] w-[20rem] md:w-[50rem] opacity-95 z-30" },
        { id: 6, src: cloud5, dir: 'right', style: "top-[70%] md:top-[50%] right-[-25%] md:right-[10%] w-[40rem] md:w-[50rem] z-10" },
        { id: 7, src: cloud3, dir: 'right', style: "top-[70%] md:top-[60%] left-[60%] md:left-[75%] w-80 md:w-[40rem] z-20" },
    ];

    return (
        <div className="h-[600vh] bg-gradient-to-b from-sky-400 via-sky-700 to-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <motion.img
                    src={moon}
                    alt="Moon"
                    style={{ opacity: moonOpacity, x: moonX, y: moonY }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-11 md:w-18 pointer-events-none z-10"
                />
                <img
                    src={cloud6}
                    alt="background sky"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60 z-0"
                />
                <motion.img
                    src={nightBackground}
                    alt="Night Sky"
                    style={{ opacity: nightOpacity }}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[-100]"
                />
                <motion.div
                    style={{ opacity: scrollPromptOpacity }}
                    className="absolute top-[20%] flex flex-col items-center z-50 pointer-events-none"
                >
                    <p className="text-white text-lg md:text-2xl tracking-[0.3em] uppercase font-semibold drop-shadow-md">
                        Scroll Down
                    </p>
                    <div className="text-white text-3xl mt-4 animate-bounce">↓</div>
                </motion.div>

                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute top-[60%] flex flex-col items-center w-full px-4 z-30 pointer-events-none"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] text-center">
                        {isBirthday ? "Happy Birthday Harsh!" : "Wait a minute..."}
                    </h1>
                    <p className="text-xl md:text-3xl text-sky-100 mt-4 font-light tracking-wide drop-shadow-md text-center">
                        {isBirthday
                            ? "May all your dreams take flight. Enjoy your special day!"
                            : "It is not your birthday today! Still Wishing you happiness, good health, and success. Have an amazing day!"}
                    </p>
                </motion.div>

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
                    <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
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