import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { EVENT_INFO, TECH_STACK } from '../data/constants';
import IconRenderer from './IconRenderer';

const STATS = [
  { value: EVENT_INFO.stats.students, label: 'Siswa Peserta', suffix: '+', icon: 'GraduationCap', color: '#10b981', span: 'col-span-2 row-span-1' },
  { value: EVENT_INFO.stats.projects, label: 'Project Selesai', suffix: '', icon: 'Rocket', color: '#8b5cf6', span: 'col-span-1 row-span-1' },
  { value: EVENT_INFO.stats.linesOfCode, label: 'Baris Kode', suffix: '+', icon: 'Code', color: '#06b6d4', format: true, span: 'col-span-1 row-span-2' },
  { value: EVENT_INFO.stats.trainingHours, label: 'Jam Pelatihan', suffix: ' Jam', icon: 'Timer', color: '#f59e0b', span: 'col-span-1 row-span-1' },
  { value: EVENT_INFO.stats.aiPrompts, label: 'AI Prompts', suffix: '+', icon: 'Bot', color: '#ec4899', span: 'col-span-2 row-span-1' },
  { value: EVENT_INFO.stats.days, label: 'Hari Kegiatan', suffix: ' Hari', icon: 'Calendar', color: '#34d399', span: 'col-span-1 row-span-1' },
];

function StatCard({ stat, index, inView }) {
  // Ensure CountUp is treated as a component. 
  // If 'import CountUp' results in an object with a default property (common in some CJS/ESM mixes)
  const CountUpComponent = CountUp.default || CountUp;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bento-card ${stat.span || ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--glass-border)',
        boxShadow: inView ? `0 0 20px ${stat.color}10` : 'none',
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <IconRenderer name={stat.icon} color={stat.color} />
      </div>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: 800,
        fontFamily: 'Space Grotesk, sans-serif',
        color: 'var(--text-primary)',
        lineHeight: 1,
        marginBottom: '4px',
      }}>
        {inView ? (
          <CountUpComponent
            end={stat.value}
            duration={2.5}
            separator=","
            delay={0.2}
          />
        ) : '0'}
        <span style={{ fontSize: '1rem', color: stat.color, marginLeft: '2px' }}>{stat.suffix}</span>
      </div>
      <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'center' }}>
        {stat.label}
      </div>
      
      {/* 21st dev style border beam */}
      <div className="border-beam" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
    </motion.div>
  );
}

function TechOrbit() {
  return (
    <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80px', height: '80px', borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--emerald), var(--violet))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 40px rgba(16,185,129,0.3)',
        zIndex: 2,
      }}>
        <IconRenderer name="Bot" size={32} color="#000" />
      </div>

      {TECH_STACK.slice(0, 6).map((tech, i) => {
        const angle = (i / 6) * 360;
        const radius = 110;
        return (
          <motion.div
            key={tech.name}
            animate={{ rotate: 360 }}
            transition={{ duration: 25 + i * 2, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 0, height: 0,
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25 + i * 2, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: Math.cos((angle * Math.PI) / 180) * radius - 22,
                top: Math.sin((angle * Math.PI) / 180) * radius - 22,
                width: 44, height: 44, borderRadius: '12px',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${tech.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <IconRenderer name={tech.icon} size={20} color={tech.color} />
          </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stats" className="section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IconRenderer name="BarChart3" size={14} /> Statistik Kegiatan
          </div>
          <h2 className="section-title">
            Angka yang <span className="gradient-text-emerald">Berbicara</span>
          </h2>
          <p className="section-subtitle">
            Setiap baris kode dan setiap jam pelatihan adalah langkah menuju masa depan.
          </p>
        </motion.div>

        {/* Bento Grid Stats */}
        <div className="bento-grid" style={{ marginBottom: '80px' }}>
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }} className="build-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="section-badge" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconRenderer name="Settings" size={14} /> Tech Stack
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
              Modern <span className="gradient-text-emerald">Tools</span> for Modern <span className="gradient-text-violet">Education</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              Kami menggunakan teknologi terkini untuk memastikan siswa SMK Rajasa siap menghadapi industri.
              AI bukan untuk menggantikan, tapi untuk memberdayakan kreativitas manusia.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {TECH_STACK.map((tech) => (
                <div key={tech.name} className="tag" style={{ color: tech.color, borderColor: `${tech.color}40`, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IconRenderer name={tech.icon} size={14} color={tech.color} /> {tech.name}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <TechOrbit />
          </motion.div>
        </div>
      </div>

      <style>{`
        .col-span-2 { grid-column: span 2; }
        .row-span-2 { grid-row: span 2; }
        @media (max-width: 768px) {
          .col-span-2, .row-span-2 { grid-column: span 1; grid-row: span 1; }
        }
      `}</style>
    </section>
  );
}
