import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconRenderer from './IconRenderer';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#projects', label: 'Projects' },
  { href: '#team', label: 'Tim KKN' },
  { href: '#stats', label: 'Stats' },
  { href: '#prompts', label: 'Prompts' },
  { href: '#gallery', label: 'Galeri' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 24px',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? (theme === 'dark' ? 'rgba(2, 6, 23, 0.85)' : 'rgba(255, 255, 255, 0.85)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Logo */}
      <motion.a
        href="#hero"
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        whileHover={{ scale: 1.02 }}
      >
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg, var(--emerald), var(--violet))',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', fontWeight: 900,
          color: '#000',
          boxShadow: '0 0 20px rgba(16,185,129,0.4)',
        }}>R</div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>RAJASA</div>
          <div style={{ fontSize: '10px', color: 'var(--emerald)', letterSpacing: '0.1em', fontWeight: 600 }}>TECH EVENT 2026</div>
        </div>
      </motion.a>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
        {NAV_LINKS.map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={() => setActive(link.href)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '7px 14px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              color: active === link.href ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: active === link.href ? 'var(--glass-bg)' : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? <IconRenderer name="Sun" size={20} /> : <IconRenderer name="Moon" size={20} />}
        </button>

        {/* CTA */}
        <motion.a
          href="#projects"
          className="btn btn-primary"
          style={{ padding: '8px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconRenderer name="Rocket" size={16} /> Lihat Karya
        </motion.a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--text-primary)',
            fontSize: '20px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {menuOpen ? <IconRenderer name="X" size={24} /> : <IconRenderer name="Menu" size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '68px',
              left: 0,
              right: 0,
              background: 'var(--bg-primary)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--glass-border)',
              padding: '16px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  background: 'var(--glass-bg)',
                  transition: 'background 0.2s',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          nav > a.btn { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
