import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE } from '../data/constants';
import IconRenderer from './IconRenderer';

function TimelineCard({ item, index, inView }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr',
        gap: '0',
        marginBottom: '32px',
        alignItems: 'start',
      }}
      className="timeline-row"
    >
      {/* Left Content */}
      <div style={{ padding: '0 32px 0 0', textAlign: 'right' }} className={isEven ? 'tl-left' : 'tl-left empty'}>
        {isEven && <TimelineCardInner item={item} />}
      </div>

      {/* Center Dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <motion.div
          whileHover={{ scale: 1.2 }}
          style={{
            width: 52, height: 52,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${item.color}30, ${item.color}15)`,
            border: `2px solid ${item.color}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 20px ${item.color}30`,
            cursor: 'default',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <IconRenderer name={item.icon} size={24} color={item.color} />
        </motion.div>
        <div style={{
          width: '2px', flexGrow: 1, minHeight: '40px',
          background: `linear-gradient(to bottom, ${item.color}40, transparent)`,
          marginTop: '4px',
        }} />
      </div>

      {/* Right Content */}
      <div style={{ padding: '0 0 0 32px' }} className={!isEven ? 'tl-right' : 'tl-right empty'}>
        {!isEven && <TimelineCardInner item={item} />}
      </div>
    </motion.div>
  );
}

function TimelineCardInner({ item }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${item.color}20`,
        borderRadius: '20px',
        padding: '24px',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '120px', height: '120px',
        background: `radial-gradient(circle, ${item.color}10 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
            color: item.color, textTransform: 'uppercase', marginBottom: '4px', display: 'block',
          }}>
            {item.dayLabel} · {item.date}
          </span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
            {item.title}
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>{item.subtitle}</span>
        </div>
        <IconRenderer name={item.emoji} size={28} color={item.color} style={{ flexShrink: 0, marginLeft: '12px' }} />
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
        {item.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {item.topics.map((t) => (
          <span key={t} style={{
            padding: '3px 10px', borderRadius: '9999px',
            background: `${item.color}10`, border: `1px solid ${item.color}25`,
            color: item.color, fontSize: '11px', fontWeight: 500,
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="timeline" className="section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge cyan" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IconRenderer name="Calendar" size={14} /> Jadwal Kegiatan
          </div>
          <h2 className="section-title">
            4 Hari <span className="gradient-text-emerald">Penuh Transformasi</span>
          </h2>
          <p className="section-subtitle">
            Dari nol hingga deploy — perjalanan 4 pertemuan yang mengubah cara siswa SMK Rajasa memandang teknologi.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="timeline-desktop">
          {TIMELINE.map((item, i) => (
            <TimelineCard key={item.day} item={item} index={i} inView={inView} />
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="timeline-mobile">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: `${item.color}20`, border: `2px solid ${item.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <IconRenderer name={item.icon} size={20} color={item.color} />
                </div>
                {i < TIMELINE.length - 1 && (
                  <div style={{ width: 2, flexGrow: 1, background: `linear-gradient(${item.color}40, transparent)`, marginTop: 4 }} />
                )}
              </div>
              <TimelineCardInner item={item} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline-mobile { display: none; }
        @media (max-width: 768px) {
          .timeline-desktop { display: none; }
          .timeline-mobile { display: block; }
        }
        .timeline-row .empty { visibility: hidden; }
      `}</style>
    </section>
  );
}
