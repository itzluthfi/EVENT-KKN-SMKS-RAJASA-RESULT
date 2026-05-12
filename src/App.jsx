import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import { HeroScrollDemo } from './components/HeroScrollDemo';
import TimelineSection from './components/TimelineSection';
import ProjectsSection from './components/ProjectsSection';
import TeamSection from './components/TeamSection';
import StatsSection from './components/StatsSection';
import PromptsSection from './components/PromptsSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';

// Cursor glow effect
function CursorGlow() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={cursorRef} className="cursor-glow" />;
}

// Scroll to top button
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed', bottom: '32px', right: '32px',
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #8b5cf6)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', zIndex: 500,
            boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Loading screen
function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#020617',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '24px',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 64, height: 64, borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.08)',
          borderTop: '3px solid #10b981',
          borderRight: '3px solid #8b5cf6',
        }}
      />

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '1.5rem', fontWeight: 800,
          background: 'linear-gradient(135deg, #10b981, #8b5cf6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '6px',
        }}>
          RAJASA TECH EVENT 2026
        </div>
        <div style={{ fontSize: '12px', color: '#475569', letterSpacing: '0.12em' }}>
          LOADING SHOWCASE...
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '1px', overflow: 'hidden' }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #10b981, #8b5cf6)' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-bg">
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="grid-overlay" />
      <ParticleField />
      <CursorGlow />
      <ScrollToTop />

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <HeroSection />
            <HeroScrollDemo />
            <div className="divider" />
            <TimelineSection />
            <div className="divider" />
            <ProjectsSection />
            <div className="divider" />
            <StatsSection />
            <div className="divider" />
            <TeamSection />
            <div className="divider" />
            <PromptsSection />
            <div className="divider" />
            <GallerySection />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
