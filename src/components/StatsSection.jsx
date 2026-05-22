import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { EVENT_INFO, TECH_STACK } from '../data/constants';
import IconRenderer from './IconRenderer';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';

const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    iconName: "Calendar",
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    iconName: "FileText",
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    iconName: "Code",
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    iconName: "User",
    relatedIds: [3, 5],
    status: "pending",
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    iconName: "Timer",
    relatedIds: [4],
    status: "pending",
    energy: 10,
  },
];

const STATS = [
  { value: EVENT_INFO.stats.students, label: 'Siswa Peserta', suffix: '+', icon: 'GraduationCap', color: '#10b981', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop' },
  { value: EVENT_INFO.stats.projects, label: 'Project Selesai', suffix: '', icon: 'Rocket', color: '#8b5cf6', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' },
  { value: EVENT_INFO.stats.linesOfCode, label: 'Baris Kode', suffix: '+', icon: 'Code', color: '#06b6d4', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop' },
  { value: EVENT_INFO.stats.trainingHours, label: 'Jam Pelatihan', suffix: ' Jam', icon: 'Timer', color: '#f59e0b', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop' },
  { value: EVENT_INFO.stats.aiPrompts, label: 'AI Prompts', suffix: '+', icon: 'Bot', color: '#ec4899', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop' },
  { value: EVENT_INFO.stats.days, label: 'Hari Kegiatan', suffix: ' Hari', icon: 'Calendar', color: '#34d399', imageUrl: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=2070&auto=format&fit=crop' },
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


import { InteractiveImageAccordion } from './ui/interactive-image-accordion';

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stats" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <InteractiveImageAccordion 
            stats={STATS} 
            title="Angka yang" 
            highlightWord="Berbicara" 
            subtitle="Setiap baris kode dan setiap jam pelatihan adalah rekam jejak langkah dedikasi siswa menuju masa depan." 
          />
        </motion.div>

        <div style={{ marginTop: '120px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="section-badge mx-auto" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', width: 'max-content' }}>
              <IconRenderer name="Settings" size={14} /> Project Journey
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Development <span className="gradient-text-emerald">Lifecycle</span>
            </h3>
          </motion.div>
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </div>

    </section>
  );
}
