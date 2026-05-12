import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../data/constants';
import IconRenderer from './IconRenderer';

const DOC_PHOTOS = [
  { day: 1, caption: 'Pembukaan & Ice Breaking — Siswa antusias di Day 1', color: '#10b981', emoji: 'Sprout', label: 'Day 1' },
  { day: 2, caption: 'Workshop AI Design Tools bersama Mentor', color: '#8b5cf6', emoji: 'Palette', label: 'Day 2' },
  { day: 3, caption: 'Sesi coding intensif — masing-masing fokus membangun portfolio', color: '#06b6d4', emoji: 'Code', label: 'Day 3' },
  { day: 4, caption: 'Showcase & Penyerahan Award — Momen bersejarah!', color: '#f59e0b', emoji: 'Trophy', label: 'Day 4' },
  { day: 1, caption: 'Demo GitHub oleh Tim Teknis KKN', color: '#34d399', emoji: 'Github', label: 'Day 1' },
  { day: 3, caption: 'Peer review session — siswa saling mereview kode', color: '#a78bfa', emoji: 'Search', label: 'Day 3' },
];

function PhotoCard({ photo, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        aspectRatio: '4/3',
        background: `linear-gradient(135deg, ${photo.color}18 0%, rgba(2,6,23,0.8) 100%)`,
        border: `1px solid ${photo.color}20`,
        cursor: 'pointer',
      }}
    >
      {/* Pattern BG */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${photo.color}12 1.5px, transparent 1.5px)`,
        backgroundSize: '24px 24px',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.4s',
        transform: hovered ? 'scale(1.2) rotate(5deg)' : 'scale(1) rotate(0)',
      }}>
        <IconRenderer name={photo.emoji} size={56} color={photo.color} />
      </div>

      {/* Day badge */}
      <div style={{
        position: 'absolute', top: '12px', left: '12px',
        padding: '3px 10px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700,
        background: `${photo.color}25`, border: `1px solid ${photo.color}40`, color: photo.color,
      }}>
        {photo.label}
      </div>

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(2,6,23,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'flex-end',
          padding: '16px',
        }}
      >
        <p style={{ fontSize: '12px', color: '#f1f5f9', lineHeight: 1.5 }}>{photo.caption}</p>
      </motion.div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, index, inView }) {
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Quote mark */}
      <div style={{
        position: 'absolute', top: '16px', right: '20px',
        fontSize: '64px', color: 'rgba(255,255,255,0.03)',
        fontFamily: 'Georgia, serif', lineHeight: 1,
      }}>❝</div>

      <p style={{
        fontSize: '14px', color: '#cbd5e1', lineHeight: 1.75,
        fontStyle: 'italic', marginBottom: '20px', position: 'relative', zIndex: 1,
      }}>
        ❝ {testimonial.quote} ❞
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: `linear-gradient(135deg, ${testimonial.color}40, ${testimonial.color}15)`,
            border: `2px solid ${testimonial.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconRenderer name={testimonial.emoji} size={20} color={testimonial.color} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9' }}>{testimonial.name}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>{testimonial.class}</div>
          </div>
        </div>
        <span style={{
          padding: '3px 10px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700,
          background: `${testimonial.color}15`, border: `1px solid ${testimonial.color}30`,
          color: testimonial.color,
        }}>
          {testimonial.award}
        </span>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [dayFilter, setDayFilter] = useState('all');

  const filtered = dayFilter === 'all'
    ? DOC_PHOTOS
    : DOC_PHOTOS.filter((p) => p.day === parseInt(dayFilter));

  return (
    <>
      {/* Testimonials */}
      <section className="section" ref={ref}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-badge amber" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconRenderer name="MessageSquare" size={14} /> Student Voice
            </div>
            <h2 className="section-title">
              Suara <span className="gradient-text-violet">Para Pejuang</span>
            </h2>
            <p className="section-subtitle">
              Apa kata mereka tentang pengalaman belajar AI Web Development bersama KKN ITATS?
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="section-badge emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconRenderer name="Camera" size={14} /> Dokumentasi
            </div>
            <h2 className="section-title">
              Momen yang <span className="gradient-text-emerald">Tak Terlupakan</span>
            </h2>
            <p className="section-subtitle">Kilas balik 4 hari penuh semangat belajar di SMK Rajasa Surabaya.</p>

            {/* Day filter */}
            <div style={{ marginTop: '24px' }}>
              <div className="tabs" style={{ display: 'inline-flex' }}>
                {['all', '1', '2', '3', '4'].map((d) => (
                  <button
                    key={d}
                    className={`tab-btn ${dayFilter === d ? 'active' : ''}`}
                    onClick={() => setDayFilter(d)}
                  >
                    {d === 'all' ? 'Semua' : `Day ${d}`}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}
          >
            <AnimatePresence>
              {filtered.map((photo, i) => (
                <PhotoCard key={`${photo.day}-${photo.emoji}-${i}`} photo={photo} index={i} inView={inView} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
