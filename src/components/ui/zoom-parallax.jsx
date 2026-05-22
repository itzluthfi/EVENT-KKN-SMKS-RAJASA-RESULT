'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export function ZoomParallax({ images }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          const getChildStyles = (i) => {
            switch (i) {
              case 1: return { top: '-30vh', left: '5vw', width: '35vw', height: '30vh' };
              case 2: return { top: '-10vh', left: '-25vw', width: '20vw', height: '45vh' };
              case 3: return { left: '27.5vw', width: '25vw', height: '25vh' };
              case 4: return { top: '27.5vh', left: '5vw', width: '20vw', height: '25vh' };
              case 5: return { top: '27.5vh', left: '-22.5vw', width: '30vw', height: '25vh' };
              case 6: return { top: '22.5vh', left: '25vw', width: '15vw', height: '15vh' };
              default: return { width: '25vw', height: '25vh' }; // center image
            }
          };

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div className="relative" style={getChildStyles(index)}>
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
