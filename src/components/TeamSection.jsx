import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TEAM_MEMBERS, DPL } from '../data/constants';
import IconRenderer from './IconRenderer';

function AvatarInitial({ name, color, size = 52 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}40, ${color}20)`,
      border: `2px solid ${color}50`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 800,
      color: color, fontFamily: 'Space Grotesk, sans-serif',
      flexShrink: 0,
      boxShadow: `0 0 15px ${color}20`,
    }}>
      {name.split(' ').map(w => w[0]).slice(0, 2).join('')}
    </div>
  );
}

function DPLCard({ member, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: '28px',
        textAlign: 'center',
        transition: 'box-shadow 0.3s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <AvatarInitial name={member.name} color={member.color} size={72} />
      </div>

      <div style={{
        display: 'inline-block', padding: '3px 12px', borderRadius: '9999px',
        background: `${member.color}15`, border: `1px solid ${member.color}30`,
        color: member.color, fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
        marginBottom: '12px',
      }}>
        DOSEN PEMBIMBING
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px', lineHeight: 1.3 }}>
        {member.name}
      </h3>
      <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>{member.role}</p>
      <p style={{ fontSize: '11px', color: '#64748b' }}>
        <span style={{ color: '#475569' }}>Keahlian:</span> {member.expertise}
      </p>
    </motion.div>
  );
}

function MemberCard({ member, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? member.color + '30' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        transition: 'all 0.3s',
        cursor: 'default',
      }}
    >
      <AvatarInitial name={member.name} color={member.color} size={48} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#f1f5f9', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {member.name}
          {member.id === 1 && <span style={{ marginLeft: '6px', fontSize: '10px', background: 'linear-gradient(135deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>KETUA</span>}
        </div>
        <div style={{ fontSize: '11px', color: member.color, fontWeight: 600, marginBottom: '6px' }}>{member.division}</div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {member.skills.map((s) => (
            <span key={s} style={{
              padding: '1px 7px', borderRadius: '9999px', fontSize: '10px',
              background: `${member.color}10`, border: `1px solid ${member.color}25`,
              color: '#94a3b8',
            }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}>
        <IconRenderer name="Sparkles" size={16} color="var(--violet-light)" />
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IconRenderer name="Users" size={14} /> Struktur Organisasi
          </div>
          <h2 className="section-title">
            Tim <span className="gradient-text-violet">KKN Kelompok 2</span>
          </h2>
          <p className="section-subtitle">
            16 mahasiswa Teknik Informatika ITATS yang berdedikasi, dibimbing oleh 3 dosen berpengalaman.
          </p>
        </motion.div>

        {/* DPL Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '20px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 16px', borderRadius: '9999px',
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
            color: '#34d399', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
            marginBottom: '20px',
          }}>
            <IconRenderer name="GraduationCap" size={14} /> Dosen Pembimbing Lapangan (DPL)
          </div>
          <div className="grid-3" style={{ marginBottom: '48px' }}>
            {DPL.map((m, i) => (
              <DPLCard key={m.id} member={m} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>

        {/* Members Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 16px', borderRadius: '9999px',
            background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
            color: '#a78bfa', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
            marginBottom: '20px',
          }}>
            <IconRenderer name="GraduationCap" size={14} /> Mahasiswa KKN Kelompok 2
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
            {TEAM_MEMBERS.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
