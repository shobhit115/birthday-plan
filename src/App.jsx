import { useState, useEffect } from 'react';
import SkyScene from './components/SkyScene';
import LoadingScreen from './components/LoadingScreen';

// Import all assets we want to preload
import cloud1 from './assets/cloud1.svg';
import cloud2 from './assets/cloud2.svg';
import cloud3 from './assets/cloud3.svg';
import cloud4 from './assets/cloud4.svg';
import cloud5 from './assets/cloud5.svg';
import cloud6 from './assets/cloud6.svg';
import background from './assets/background.jpg';
import hero from './assets/hero.png';
import plane from './assets/logo.svg';

const allAssets = [
  cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, 
  background, hero, plane
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let loadedAssetsCount = 0;
    const totalAssets = allAssets.length;

    const handleAssetLoaded = () => {
      loadedAssetsCount++;
      if (loadedAssetsCount === totalAssets) {
        // Optional: Add a slight delay (e.g., 1.5s) so the animation 
        // doesn't flash too fast if assets load instantly from cache.
        setTimeout(() => {
          setIsLoading(false);
        }, 1500); 
      }
    };

    // Preload each image
    allAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleAssetLoaded;
      img.onerror = handleAssetLoaded; // Move forward even if one image fails to load
    });
  }, []);

  return (
    <main>
      {isLoading ? <LoadingScreen /> : <SkyScene />}
    </main>
  );
}