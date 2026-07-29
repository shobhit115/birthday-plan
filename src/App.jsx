import { useState, useEffect, useRef } from 'react';
import SkyScene from './components/SkyScene';
import LoadingScreen from './components/LoadingScreen';
import AudioPermissionScreen from './components/AudioPermissionScreen';
import { useGLTF } from '@react-three/drei'; // <-- IMPORT useGLTF

// Import assets
import cloud1 from './assets/cloud1.webp';
import cloud2 from './assets/cloud2.webp';
import cloud3 from './assets/cloud3.webp';
import cloud4 from './assets/cloud4.webp';
import cloud5 from './assets/cloud5.webp';
import cloud6 from './assets/cloud6.svg';
import background from './assets/background.webp';
import planeLogo from './assets/logo.svg';
import moon from './assets/moon.webp';

// Import audio files
import windAudioSrc from './assets/wind.mp3';
import planeAudioSrc from './assets/plane.mp3';

// Added "/plane.glb" to the preload array
const allAssets = [
  cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, 
  background, planeLogo, moon, "/plane.glb"
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [audioStarted, setAudioStarted] = useState(false);

  // Audio Refs
  const windAudioRef = useRef(null);
  const planeAudioRef = useRef(null);

  useEffect(() => {
    let loadedAssetsCount = 0;
    const totalAssets = allAssets.length;

    const handleAssetLoaded = () => {
      loadedAssetsCount++;
      
      const progress = Math.round((loadedAssetsCount / totalAssets) * 100);
      setLoadingProgress(progress);

      if (loadedAssetsCount === totalAssets) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500); 
      }
    };

    allAssets.forEach((src) => {
      // Check if it's the 3D model or an image
      if (src === "/plane.glb") {
        useGLTF.preload(src);
        // Since useGLTF handles its own async loading, we simulate/trigger completion 
        // or let it hook into the counter right away
        handleAssetLoaded();
      } else {
        const img = new Image();
        img.src = src;
        img.onload = handleAssetLoaded;
        img.onerror = handleAssetLoaded;
      }
    });

    // Initialize Audio Elements
    windAudioRef.current = new Audio(windAudioSrc);
    windAudioRef.current.loop = true;
    windAudioRef.current.volume = 0.4;

    planeAudioRef.current = new Audio(planeAudioSrc);
    planeAudioRef.current.loop = true;
    planeAudioRef.current.volume = 0;
  }, []);

  const handleStartExperience = () => {
    setAudioStarted(true);
    if (windAudioRef.current) windAudioRef.current.play().catch(() => {});
    if (planeAudioRef.current) planeAudioRef.current.play().catch(() => {});
  };

  return (
    <main className="relative w-full h-screen">
      {isLoading ? (
        <LoadingScreen progress={loadingProgress} /> 
      ) : !audioStarted ? (
        <AudioPermissionScreen onStart={handleStartExperience} />
      ) : (
        <SkyScene planeAudioRef={planeAudioRef} />
      )}
    </main>
  );
}