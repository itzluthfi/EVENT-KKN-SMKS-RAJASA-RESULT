import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/constants';
import IconRenderer from './IconRenderer';

const AWARD_CONFIG = {
  'Juara 1': { label: 'Juara 1', icon: 'Medal', className: 'award-gold', order: 1, color: '#f59e0b' },
  'Juara 2': { label: 'Juara 2', icon: 'Medal', className: 'award-silver', order: 2, color: '#94a3b8' },
  'Juara 3': { label: 'Juara 3', icon: 'Medal', className: 'award-bronze', order: 3, color: '#b45309' },
  'Juara Utama': { label: 'Juara Utama', icon: 'Trophy', className: 'award-special', order: 0, color: '#8b5cf6' },
  'Participant': { label: 'Peserta', icon: 'Award', className: 'award-participant', order: 99, color: '#475569' },
};

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const award = AWARD_CONFIG[project.award_status] || AWARD_CONFIG['Participant'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? project.color + '40' : 'var(--glass-border)'}`,
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.1), 0 0 30px ${project.color}15` : 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* 21st dev border beam on hover */}
      {hovered && <div className="border-beam" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />}

      {/* Thumbnail Area */}
      <div style={{
        height: '180px',
        background: `linear-gradient(135deg, ${project.color}15 0%, rgba(0,0,0,0.05) 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* BG pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(${project.color}15 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }} />

        <motion.div
          animate={hovered ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, type: 'spring' }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <IconRenderer name={project.emoji} size={64} color={project.color} />
        </motion.div>

        {/* Award badge overlay */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span className={`award-badge ${award.className}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IconRenderer name={award.icon} size={12} /> {award.label}
          </span>
        </div>

        {/* Hover overlay with links */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(2,6,23,0.8)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '12px',
                zIndex: 10,
              }}
            >
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="btn btn-primary"
                style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <IconRenderer name="Globe" size={14} /> Demo
              </a>
              <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="btn btn-ghost"
                style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <IconRenderer name="Github" size={14} /> Repo
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.3 }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {project.team_members.length > 0 ? (
              <>
                <IconRenderer name="Users" size={14} /> Tim: {project.team_members.join(', ')}
              </>
            ) : (
              <>
                <IconRenderer name="User" size={14} /> {project.student_name}
              </>
            )}
          </p>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: '14px' }}>
          {project.ai_prompt_story.slice(0, 100)}…
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag" style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [filter, setFilter] = useState('all');

  const filtered = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'A') return p.class_category === 'A';
    if (filter === 'B') return p.class_category === 'B';
    if (filter === 'winners') return p.award_status !== 'Participant';
    return true;
  }).sort((a, b) => {
    const aOrder = AWARD_CONFIG[a.award_status]?.order ?? 99;
    const bOrder = AWARD_CONFIG[b.award_status]?.order ?? 99;
    return aOrder - bOrder;
  });

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
            <div className="section-badge amber" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconRenderer name="Trophy" size={14} /> Hall of Fame
            </div>
          <h2 className="section-title">
            Karya <span className="gradient-text-violet">Terbaik Siswa</span>
          </h2>
          <p className="section-subtitle">
            Portofolio yang dibangun dari nol menggunakan AI dalam 4 hari — hasil nyata dari semangat belajar.
          </p>

          {/* Filter tabs */}
          <div style={{ marginTop: '28px' }}>
            <div className="tabs" style={{ display: 'inline-flex' }}>
              {[
                { value: 'all', label: 'Semua' },
                { value: 'winners', label: 'Pemenang', icon: 'Trophy' },
                { value: 'A', label: 'Kelas A' },
                { value: 'B', label: 'Kelas B' },
              ].map((f) => (
                <button
                  key={f.value}
                  className={`tab-btn ${filter === f.value ? 'active' : ''}`}
                  onClick={() => setFilter(f.value)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {f.icon && <IconRenderer name={f.icon} size={14} />}
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}
        >
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
