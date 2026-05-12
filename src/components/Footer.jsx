import { motion } from 'framer-motion';
import IconRenderer from './IconRenderer';

const TECH_MARQUEE = [
  { name: 'React', icon: 'Atom' },
  { name: 'Vite', icon: 'Zap' },
  { name: 'AI Copilot', icon: 'Bot' },
  { name: 'GitHub', icon: 'Github' },
  { name: 'Supabase', icon: 'Zap' },
  { name: 'Figma AI', icon: 'Palette' },
  { name: 'ChatGPT', icon: 'MessageSquare' },
  { name: 'Framer Motion', icon: 'Play' },
  { name: 'Node.js', icon: 'Package' },
  { name: 'GitHub Pages', icon: 'Globe' },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Marquee */}
      <div style={{
        padding: '16px 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.01)',
      }}>
        <motion.div
          animate={{ x: '-50%' }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '32px', whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', fontWeight: 500 }}>
              <IconRenderer name={item.icon} size={14} />
              {item.name}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: '48px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '40px', marginBottom: '40px' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', fontWeight: 900, color: '#000',
              }}>R</div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '16px', color: '#f1f5f9' }}>
                  RAJASA TECH EVENT 2026
                </div>
                <div style={{ fontSize: '11px', color: '#10b981', letterSpacing: '0.08em' }}>
                  AI Web Showcase
                </div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, maxWidth: '320px', marginBottom: '20px' }}>
              Program kerja KKN Kelompok 2 ITATS — memberdayakan siswa SMK Rajasa
              Surabaya dengan teknologi AI dan Web Development modern.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['KKN ITATS', 'SMK Rajasa', 'Surabaya', '2026'].map((tag) => (
                <span key={tag} style={{
                  padding: '3px 10px', borderRadius: '9999px', fontSize: '11px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#64748b',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Navigasi
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['#hero', '#timeline', '#projects', '#team', '#stats', '#prompts', '#gallery'].map((href) => {
                const label = href.replace('#', '').charAt(0).toUpperCase() + href.slice(2);
                return (
                  <a key={href} href={href} style={{
                    fontSize: '13px', color: '#64748b', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = '#10b981'}
                    onMouseLeave={e => e.target.style.color = '#64748b'}
                  >
                    → {label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Info Event
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: 'MapPin', text: 'SMK Rajasa Surabaya' },
                { icon: 'Calendar', text: '11, 12, 18, 19 Mei 2026' },
                { icon: 'GraduationCap', text: 'KKN Kelompok 2 ITATS' },
                { icon: 'Code', text: 'Teknik Informatika' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconRenderer name={item.icon} size={14} color="#64748b" />
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: '#334155' }}>
            © 2026 RAJASA TECH EVENT — Made with ❤️ by{' '}
            <span style={{ color: '#10b981', fontWeight: 600 }}>KKN Kelompok 2 ITATS</span>
          </p>
          <p style={{ fontSize: '12px', color: '#334155', fontFamily: 'JetBrains Mono, monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#8b5cf6' }}>Built</span>{' '}
            <span style={{ color: '#10b981' }}>with</span>{' '}
            <span style={{ color: '#06b6d4' }}>AI</span> <IconRenderer name="Sparkles" size={12} color="var(--violet-light)" />
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </footer>
  );
}
