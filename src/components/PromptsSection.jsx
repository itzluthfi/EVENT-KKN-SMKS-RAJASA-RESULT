import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PROMPTS_SHOWCASE } from '../data/constants';
import IconRenderer from './IconRenderer';

function PromptCard({ prompt, index, inView, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      style={{
        background: isActive ? `linear-gradient(135deg, ${prompt.color}15, transparent)` : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${isActive ? prompt.color + '40' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isActive && (
        <motion.div
          layoutId="active-indicator"
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: '3px', background: prompt.color, borderRadius: '3px 0 0 3px',
          }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ flexShrink: 0 }}>
          <IconRenderer name={prompt.emoji} color={prompt.color} size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3 }}>{prompt.title}</h4>
            <span style={{
              padding: '2px 8px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700,
              background: `${prompt.color}15`, border: `1px solid ${prompt.color}30`, color: prompt.color,
              flexShrink: 0,
            }}>
              {prompt.winner}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="tag">{prompt.category}</span>
            <span style={{ fontSize: '11px', color: '#475569' }}>{prompt.tokens} token</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PromptViewer({ prompt }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={prompt.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.35 }}
        style={{
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${prompt.color}25`,
          borderRadius: '20px',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: `linear-gradient(135deg, ${prompt.color}10, transparent)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <IconRenderer name={prompt.emoji} color={prompt.color} size={20} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9' }}>{prompt.title}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Prompt yang membawa {prompt.winner}</div>
            </div>
          </div>

          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '8px 16px', borderRadius: '9999px', border: 'none',
              background: copied
                ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                : `rgba(255,255,255,0.08)`,
              color: copied ? '#000' : '#f1f5f9',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.3s',
            }}
          >
            {copied ? (
              <>
                <IconRenderer name="Check" size={14} /> Tersalin!
              </>
            ) : (
              <>
                <IconRenderer name="Copy" size={14} /> Salin Prompt
              </>
            )}
          </motion.button>
        </div>

        {/* Terminal-style prompt viewer */}
        <div style={{ padding: '20px' }}>
          {/* Window dots */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
            {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>

          <pre style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12.5px',
            color: '#e2e8f0',
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
          }}>
            <span style={{ color: '#64748b' }}>$ </span>
            <span style={{ color: prompt.color }}>ai-prompt</span>
            <span style={{ color: '#94a3b8' }}> --generate</span>
            {'\n\n'}
            <span style={{ color: '#e2e8f0' }}>{prompt.prompt}</span>
          </pre>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PromptsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="prompts" className="section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge cyan" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IconRenderer name="Zap" size={14} /> Prompt Playground
          </div>
          <h2 className="section-title">
            Prompt yang <span className="gradient-text-emerald">Memenangkan</span> Segalanya
          </h2>
          <p className="section-subtitle">
            Pelajari dan salin prompt AI terbaik yang digunakan para pemenang. Kunci sukses ada di sini.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', alignItems: 'start' }} className="prompts-grid">
          {/* Left: Prompt list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PROMPTS_SHOWCASE.map((p, i) => (
              <PromptCard
                key={p.id}
                prompt={p}
                index={i}
                inView={inView}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Right: Prompt viewer */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ position: 'sticky', top: '88px' }}
          >
            <PromptViewer prompt={PROMPTS_SHOWCASE[activeIndex]} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .prompts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
