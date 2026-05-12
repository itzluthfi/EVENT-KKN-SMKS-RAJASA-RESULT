import React from 'react';
import { TIMELINE } from '../data/constants';
import IconRenderer from './IconRenderer';
import FlowArt, { FlowSection } from './ui/story-scroll';

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative w-full">
      <FlowArt aria-label="Jadwal Kegiatan KKN">
        {TIMELINE.map((item, index) => {
          // Calculate an appropriate text color based on background (assuming most are bright enough except maybe dark ones)
          // For simplicity, we use the specific color as background and white as text, or dark card as background
          // Let's use a very dark version of the color for background, or pure color.
          // Using #020617 as background and item.color as accent makes it look more "dark mode" consistent,
          // but the FlowArt demo uses distinct background colors per section. Let's use a dark shade.
          
          return (
            <FlowSection 
              key={item.day} 
              aria-label={item.title} 
              style={{ backgroundColor: '#020617', color: '#fff' }}
              className="border-t border-white/5"
            >
              <div className="absolute inset-0 z-0">
                 {/* Subtle glowing orb based on item color */}
                 <div style={{
                    position: 'absolute', top: '20%', right: '10%',
                    width: '50vw', height: '50vw', maxWidth: '600px', maxHeight: '600px',
                    background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)`,
                    borderRadius: '50%', pointerEvents: 'none',
                 }} />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em]" style={{ color: item.color }}>
                  0{index + 1} — {item.date}
                </p>
                <hr className="my-[2vw] border-none border-t border-white/20" />
                
                <div className={`flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* TEXT SIDE */}
                  <div className="flex-1 flex flex-col w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                      <div 
                        className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-black/50 backdrop-blur-md shadow-lg"
                        style={{ boxShadow: `0 0 30px ${item.color}20` }}
                      >
                        <IconRenderer name={item.icon} size={32} color={item.color} />
                      </div>
                      <h2 className="text-[clamp(2rem,3.5vw,4rem)] font-bold leading-[1.1] uppercase tracking-tight">
                        {item.title}
                      </h2>
                    </div>

                    <h3 className="text-xl md:text-3xl font-semibold mb-4" style={{ color: item.color }}>
                      {item.subtitle}
                    </h3>
                    <p className="text-[clamp(1rem,1.2vw,1.25rem)] font-normal leading-relaxed text-white/80 mb-8">
                      {item.desc}
                    </p>
                    
                    <div>
                      <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">Key Topics</p>
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map((t) => (
                          <span key={t} className="px-4 py-2 rounded-full text-xs font-medium border backdrop-blur-sm"
                            style={{ 
                              backgroundColor: `${item.color}15`, 
                              borderColor: `${item.color}40`,
                              color: '#fff' 
                            }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* IMAGE SIDE */}
                  <div className="w-full md:w-[45%] lg:w-[50%] shrink-0 aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden relative group border border-white/10 shadow-2xl">
                    <img 
                      src={`/assets/foto/${index === 0 ? '2.JPG' : index === 1 ? '3.JPG' : index === 2 ? '5.JPG' : '8.JPG'}`} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Decorative color line on the image */}
                    <div 
                      className={`absolute top-0 bottom-0 w-2 ${index % 2 !== 0 ? 'right-0' : 'left-0'}`} 
                      style={{ background: item.color }}
                    />
                  </div>

                </div>
              </div>
            </FlowSection>
          );
        })}
      </FlowArt>
    </section>
  );
}
