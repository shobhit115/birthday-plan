import { useState, useEffect, useRef } from 'react';
import SkyScene from './components/SkyScene';
import LoadingScreen from './components/LoadingScreen';
import AudioPermissionScreen from './components/AudioPermissionScreen';

// Import assets
import cloud1 from './assets/cloud1.svg';
import cloud2 from './assets/cloud2.svg';
import cloud3 from './assets/cloud3.svg';
import cloud4 from './assets/cloud4.svg';
import cloud5 from './assets/cloud5.svg';
import cloud6 from './assets/cloud6.svg';
import background from './assets/background.jpg';
import planeLogo from './assets/logo.svg';
import moon from './assets/moon.svg';

// Import audio files
import windAudioSrc from './assets/wind.mp3';
import planeAudioSrc from './assets/plane.mp3';

const allAssets = [
  cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, 
  background, planeLogo, moon
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);

  // Audio Refs
  const windAudioRef = useRef(null);
  const planeAudioRef = useRef(null);

  useEffect(() => {
    let loadedAssetsCount = 0;
    const totalAssets = allAssets.length;

    const handleAssetLoaded = () => {
      loadedAssetsCount++;
      if (loadedAssetsCount === totalAssets) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); 
      }
    };

    allAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleAssetLoaded;
      img.onerror = handleAssetLoaded;
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
        <LoadingScreen />
      ) : !audioStarted ? (
        <AudioPermissionScreen onStart={handleStartExperience} />
      ) : (
        <SkyScene planeAudioRef={planeAudioRef} />
      )}
    </main>
  );
}