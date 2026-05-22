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
      className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden border backdrop-blur-md ${
        isActive 
          ? '' 
          : 'bg-slate-100/60 dark:bg-white/[0.02] border-slate-300/50 dark:border-white/[0.06] hover:bg-slate-200/60 dark:hover:bg-white/[0.04]'
      }`}
      style={isActive ? {
        background: `linear-gradient(135deg, ${prompt.color}15, transparent)`,
        borderColor: `${prompt.color}40`,
      } : {}}
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
            <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 leading-[1.3]">{prompt.title}</h4>
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
        className="h-full rounded-[20px] overflow-hidden backdrop-blur-xl border shadow-xl dark:shadow-none bg-slate-50/90 dark:bg-black/40"
        style={{ borderColor: `${prompt.color}25` }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-white/[0.06] flex justify-between items-center"
             style={{ background: `linear-gradient(135deg, ${prompt.color}10, transparent)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <IconRenderer name={prompt.emoji} color={prompt.color} size={20} />
            <div>
              <div className="text-[13px] font-bold text-slate-800 dark:text-slate-100">{prompt.title}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Prompt yang membawa {prompt.winner}</div>
            </div>
          </div>

          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full border-none text-[12px] font-bold cursor-pointer flex items-center gap-2 transition-all duration-300 shadow-sm ${
              copied
                ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white'
                : 'bg-white dark:bg-white/[0.08] text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/[0.12]'
            }`}
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

          <pre className="font-mono text-[12.5px] leading-[1.8] whitespace-pre-wrap break-words m-0 text-slate-700 dark:text-slate-200">
            <span className="text-slate-400 dark:text-slate-500">$ </span>
            <span style={{ color: prompt.color }}>ai-prompt</span>
            <span className="text-slate-500 dark:text-slate-400"> --generate</span>
            {'\n\n'}
            <span>{prompt.prompt}</span>
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
