"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        initial={{
          translateY: props.direction === "down" ? "-50%" : "0%",
        }}
        animate={{
          translateY: props.direction === "down" ? "0%" : "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.media.map((item, i) => (
                <div 
                  className="rounded-3xl border border-white/10 shadow-lg overflow-hidden relative group max-w-xs w-full bg-black/20 backdrop-blur-sm" 
                  key={i}
                  style={{ aspectRatio: item.type === 'video' ? '9/16' : 'auto' }}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`Media ${i}`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  )}
                  {/* Subtle overlay to blend with hero */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
