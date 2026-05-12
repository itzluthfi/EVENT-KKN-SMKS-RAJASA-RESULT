import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE } from '../data/constants';
import IconRenderer from './IconRenderer';
import { Timeline } from './ui/timeline';

export default function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const timelineData = TIMELINE.map((item) => ({
    title: item.date,
    color: item.color,
    content: (
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
          marginBottom: '2rem'
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
              {item.dayLabel}
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {item.title}
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>{item.subtitle}</span>
          </div>
          <IconRenderer name={item.icon} size={28} color={item.color} style={{ flexShrink: 0, marginLeft: '12px' }} />
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
          {item.desc}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {item.topics.map((t) => (
            <span key={t} style={{
              padding: '4px 12px', borderRadius: '9999px',
              background: `${item.color}10`, border: `1px solid ${item.color}25`,
              color: item.color, fontSize: '12px', fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>
      </motion.div>
    )
  }));

  return (
    <section id="timeline" className="section relative" ref={ref}>
      <div className="container z-10 relative">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge cyan mx-auto" style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'max-content' }}>
            <IconRenderer name="Calendar" size={14} /> Jadwal Kegiatan
          </div>
          <h2 className="section-title">
            4 Hari <span className="gradient-text-emerald">Penuh Transformasi</span>
          </h2>
          <p className="section-subtitle">
            Dari nol hingga deploy — perjalanan 4 pertemuan yang mengubah cara siswa SMK Rajasa memandang teknologi.
          </p>
        </motion.div>

        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
