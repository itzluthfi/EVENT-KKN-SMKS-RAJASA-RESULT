import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EVENT_INFO } from '../data/constants';
import IconRenderer from './IconRenderer';
import { TestimonialsColumn } from './ui/testimonials-columns-1';

const heroMedia = [
  { type: 'image', src: '/assets/foto/1.jpg' },
  { type: 'video', src: '/assets/video/1.mp4' },
  { type: 'image', src: '/assets/foto/2.JPG' },
  { type: 'image', src: '/assets/foto/3.JPG' },
  { type: 'video', src: '/assets/video/2.MP4' },
  { type: 'image', src: '/assets/foto/4.JPG' },
  { type: 'image', src: '/assets/foto/5.JPG' },
  { type: 'video', src: '/assets/video/3.MP4' },
  { type: 'image', src: '/assets/foto/6.JPG' },
  { type: 'video', src: '/assets/video/4.MP4' },
  { type: 'image', src: '/assets/foto/7.JPG' },
  { type: 'image', src: '/assets/foto/8.JPG' },
  { type: 'video', src: '/assets/video/5.MP4' },
];

const col1 = heroMedia.slice(0, 4);
const col2 = heroMedia.slice(4, 9);
const col3 = heroMedia.slice(9, 13);





export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, scale: 1, y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.2, 
        ease: [0.22, 1, 0.36, 1], 
        staggerChildren: 0.12, 
        delayChildren: 0.6 
      } 
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 0 60px',
      position: 'relative',
      isolation: 'isolate',
      overflow: 'hidden',
    }}>
      {/* Media Columns Background - Left and Right */}
      <div className="absolute inset-0 z-[-2] flex justify-between px-2 sm:px-4 md:px-8 opacity-40 md:opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] pointer-events-none overflow-hidden">
        {/* Left Columns */}
        <div className="flex gap-4">
          <TestimonialsColumn media={col1} duration={45} direction="up" className="w-[150px] sm:w-[200px] md:w-[250px]" />
          <TestimonialsColumn media={col2} duration={55} direction="down" className="w-[150px] sm:w-[200px] md:w-[250px] hidden md:block" />
        </div>
        {/* Right Columns */}
        <div className="flex gap-4">
          <TestimonialsColumn media={col3} duration={40} direction="down" className="w-[150px] sm:w-[200px] md:w-[250px] hidden sm:block" />
          <TestimonialsColumn media={col1} duration={60} direction="up" className="w-[150px] sm:w-[200px] md:w-[250px] hidden xl:block" />
        </div>
      </div>

      {/* Overlay to ensure readability over particles and media */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-white/70 to-white/95 dark:from-slate-950/40 dark:to-slate-950/80" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none animate-float bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl" />
      <div className="absolute top-[30%] right-[8%] w-[350px] h-[350px] rounded-full pointer-events-none animate-float blur-3xl bg-violet-500/10 dark:bg-violet-500/15" style={{ animationDelay: '3s' }} />

      <div className="container relative z-10 w-full flex justify-center px-2 md:px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 3vw, 3rem)' }}
          className="text-center w-[95%] md:w-full max-w-[950px] mx-auto bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col justify-center items-center"
        >
          {/* Top badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-full text-emerald-800 dark:text-emerald-400 font-bold text-xs md:text-sm tracking-widest uppercase shadow-sm">
              <IconRenderer name="Award" size={16} className="hidden sm:block" />
              Kegiatan Pengabdian Kepada Masyarakat
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={itemVariants} className="font-black tracking-tight mb-6 font-space text-slate-900 dark:text-white uppercase flex flex-col items-center gap-1 md:gap-2">
            <span className="text-[clamp(1.4rem,3vw,2.5rem)] leading-none text-slate-800 dark:text-white/90">Pelatihan Pembuatan</span>
            <span className="text-[clamp(2rem,5.5vw,4.5rem)] bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent leading-[1.1] py-1">Website Portofolio</span>
            <span className="text-[clamp(0.75rem,1.5vw,1rem)] text-slate-500 dark:text-slate-400 font-bold tracking-[0.2em] mt-2">DENGAN BANTUAN AI</span>
          </motion.h1>

          {/* Target Location */}
          <motion.p variants={itemVariants} className="text-[clamp(1rem,2vw,1.25rem)] font-bold text-cyan-700 dark:text-cyan-400 mb-8 tracking-wider uppercase">
            Di SMKS Rajasa Surabaya
          </motion.p>

          {/* Footer Info / Tagline */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 flex-wrap text-[0.85rem] text-slate-700 dark:text-slate-400 mb-10 font-mono tracking-wider font-semibold uppercase">
            <IconRenderer name="GraduationCap" size={18} /> 
            <span>Institut Teknologi Adhi Tama Surabaya</span>
            <span className="text-emerald-600 dark:text-emerald-400 hidden sm:block">•</span>
            <span>Tahun 2026</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-4">
            <motion.a href="#projects" className="btn btn-primary text-sm px-6 py-3 flex items-center gap-2" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <IconRenderer name="Trophy" size={16} /> Lihat Semua Karya
            </motion.a>
            <motion.a href="#prompts" className="btn btn-secondary text-sm px-6 py-3 flex items-center gap-2" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <IconRenderer name="Zap" size={16} /> Prompt Playground
            </motion.a>
            <motion.a href="#team" className="text-sm px-6 py-3 flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl font-medium transition-colors" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <IconRenderer name="Users" size={16} /> Tim Kami
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] text-slate-500 tracking-[0.2em] uppercase font-bold">Scroll Down</span>
          <div className="w-[1px] h-12 bg-slate-300 dark:bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-emerald-500 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
