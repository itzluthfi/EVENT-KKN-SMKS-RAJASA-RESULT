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

const TYPEWRITER_TEXTS = [
  'Building with AI',
  'Designing the Future',
  'Deploying Dreams',
  'Learning & Growing',
];

function TypewriterText() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TYPEWRITER_TEXTS[textIndex];
    let timeout;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % TYPEWRITER_TEXTS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, textIndex]);

  return (
    <span>
      {displayed}
      <span style={{ animation: 'blink-cursor 1s infinite', borderRight: '2px solid #10b981', marginLeft: '2px' }} />
    </span>
  );
}

function CountdownTimer() {
  const eventDate = new Date('2026-05-19T08:00:00+07:00');
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = eventDate - now;
      if (diff <= 0) return setTimeLeft(null);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: '10px 24px', borderRadius: '9999px',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.2))',
          border: '1px solid rgba(16,185,129,0.4)',
          color: '#34d399', fontWeight: 700, fontSize: '14px',
        }}
      >
        <IconRenderer name="PartyPopper" size={16} /> Event Selesai — Terima kasih sudah berpartisipasi!
      </motion.div>
    );
  }

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.mins },
    { label: 'Detik', value: timeLeft.secs },
  ];

  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {units.map((u) => (
        <motion.div
          key={u.label}
          whileHover={{ scale: 1.05 }}
          style={{
            minWidth: '72px', padding: '12px 16px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            textAlign: 'center',
          }}
        >
          <div style={{
            fontSize: '28px', fontWeight: 800,
            fontFamily: 'JetBrains Mono, monospace',
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {String(u.value).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, letterSpacing: '0.08em', marginTop: '2px' }}>
            {u.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 0 80px',
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

      {/* Subtle Dark Overlay to ensure readability over particles and media */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(2,6,23,0.2) 0%, rgba(2,6,23,0.4) 100%)',
        zIndex: -1,
      }} />
      <div style={{
        position: 'absolute', top: '20%', left: '10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '30%', right: '8%',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
        animation: 'float 10s ease-in-out infinite 3s',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            textAlign: 'center', 
            maxWidth: '900px', 
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '32px',
            padding: '60px 40px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          {/* Top badge */}
          <motion.div variants={itemVariants}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 18px 6px 8px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '9999px',
              marginBottom: '28px',
              fontSize: '12px', color: 'var(--emerald)', fontWeight: 600,
            }}>
              <span style={{
                padding: '2px 10px', background: 'linear-gradient(135deg, var(--emerald), var(--cyan))',
                borderRadius: '9999px', color: '#000', fontSize: '11px', fontWeight: 700,
              }}>NEW</span>
              Portfolio Style Hero
            </div>
          </motion.div>

          {/* Title / Name */}
          <motion.h1 variants={itemVariants} style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: '20px',
            fontFamily: 'Space Grotesk, sans-serif',
            color: 'var(--text-primary)',
          }}>
            <span className="gradient-text-emerald">RAJASA</span>
            {' '}
            TECH
            <br />
            EVENT{' '}
            <span className="gradient-text-violet">2026</span>
          </motion.h1>

          {/* Typewriter / Role */}
          <motion.div variants={itemVariants} style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            minHeight: '36px',
          }}>
            <TypewriterText />
          </motion.div>

          {/* Tagline */}
          <motion.p variants={itemVariants} style={{
            fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '48px',
            fontStyle: 'italic', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}>
            <IconRenderer name="Sparkles" size={14} /> "Bridging Theory to Reality with AI" <IconRenderer name="Sparkles" size={14} />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <motion.a href="#projects" className="btn btn-primary" style={{ fontSize: '15px', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: '10px' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <IconRenderer name="Trophy" size={18} /> Lihat Semua Karya
            </motion.a>
            <motion.a href="#prompts" className="btn btn-secondary" style={{ fontSize: '15px', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: '10px' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <IconRenderer name="Zap" size={18} /> Prompt Playground
            </motion.a>
            <motion.a href="#team" className="btn btn-ghost" style={{ fontSize: '15px', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: '10px' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <IconRenderer name="Users" size={18} /> Tim Kami
            </motion.a>
          </motion.div>

          {/* Countdown */}
          <motion.div variants={itemVariants}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
              Countdown to Final Day — 19 Mei 2026
            </p>
            <CountdownTimer />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}
        >
          <span style={{ fontSize: '11px', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '20px', height: '32px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}
          >
            <div style={{ width: '4px', height: '8px', background: '#10b981', borderRadius: '2px' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
