import { motion, useTransform } from 'framer-motion';

export default function Cloud({ src, direction, styleClass, scrollProgress }) {
  // Determine where the cloud should go based on its direction
  const xTarget = direction === 'left' ? "-100vw" : "100vw";

  // Map the scroll progress (0 to 1) to animations
  const x = useTransform(scrollProgress, [0, 1], ["0vw", xTarget]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 4]);
  const opacity = useTransform(scrollProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <motion.img
      src={src}
      style={{ x, scale, opacity }}
      // pointer-events-none prevents the user from accidentally dragging the image
      className={`absolute ${styleClass} pointer-events-none`}
      alt="cloud"
    />
  );
}