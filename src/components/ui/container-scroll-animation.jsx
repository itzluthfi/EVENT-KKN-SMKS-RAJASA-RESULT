"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Parallax background text - moves in opposite direction
  const textTranslate = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div
      className={cn(
        "h-[35rem] md:h-[60rem] flex items-center justify-center relative overflow-hidden",
        className
      )}
      ref={containerRef}
    >
      {/* Background Parallax Text Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: textTranslate }}
          className="flex flex-col items-center justify-center h-full opacity-[0.05] dark:opacity-[0.1] font-black italic tracking-tighter"
        >
          <h2 className="text-[20vw] leading-[0.8] text-primary">FUTURE</h2>
          <h2 className="text-[20vw] leading-[0.8] text-emerald">DESIGN</h2>
          <h2 className="text-[20vw] leading-[0.8] text-violet">AI TECH</h2>
        </motion.div>
      </div>

      <div
        className="py-10 md:py-20 w-full relative px-6 md:px-16"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center relative z-10"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 20px 50px #00000066, 0 50px 100px #00000044",
      }}
      className="-mt-12 mx-auto h-[22rem] md:h-[38rem] w-full border-8 border-[#1a1a1a] p-1 md:p-2 bg-[#0a0a0a] rounded-[40px] shadow-2xl relative z-10"
    >
      <div className="h-full w-full overflow-hidden rounded-[32px] bg-gray-100 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
