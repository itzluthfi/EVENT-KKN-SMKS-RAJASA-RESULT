import React, { useState } from 'react';
import CountUp from 'react-countup';
import IconRenderer from '../IconRenderer';

const AccordionItem = ({ item, isActive, onMouseEnter }) => {
  const CountUpComponent = CountUp.default || CountUp;

  return (
    <div
      className={`relative h-[300px] sm:h-[450px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
        isActive ? 'w-[250px] sm:w-[400px]' : 'w-[40px] sm:w-[60px]'
      }`}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; }}
      />
      
      {/* Dark overlays */}
      <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-black/60' : 'bg-black/40 hover:bg-black/20'}`}></div>

      {/* Content */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Active state content */}
        <div 
          className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ease-in-out transform ${
            isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
              <IconRenderer name={item.icon} size={20} color={item.color} />
            </div>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-white font-space mb-1 flex items-baseline">
            {isActive && (
              <CountUpComponent
                end={item.value}
                duration={2.5}
                separator=","
                delay={0}
              />
            )}
            <span style={{ color: item.color }} className="text-xl sm:text-2xl ml-1">{item.suffix}</span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-white/90">
            {item.label}
          </div>
        </div>

        {/* Inactive state content */}
        <span
          className={`absolute text-white font-bold whitespace-nowrap transition-all duration-500 ease-in-out flex items-center gap-3 ${
            isActive
              ? 'opacity-0 scale-90 -translate-x-10 bottom-24 left-1/2 rotate-90'
              : 'opacity-100 scale-100 bottom-24 left-1/2 -translate-x-1/2 rotate-90 text-sm sm:text-base origin-left'
          }`}
        >
          <IconRenderer name={item.icon} size={16} color={item.color} className="shrink-0" />
          <span className="tracking-wider">{item.label}</span>
        </span>
      </div>
    </div>
  );
};

export function InteractiveImageAccordion({ stats, title, subtitle, highlightWord }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered, stats.length]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-5/12 text-center lg:text-left">
          <div className="section-badge emerald mx-auto lg:mx-0 mb-6 flex items-center gap-2 w-max">
            <IconRenderer name="BarChart3" size={14} /> Statistik Kegiatan
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter font-space">
            {title} <span className="gradient-text-emerald">{highlightWord}</span>
          </h2>
          
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {subtitle}
          </p>
          
          <div className="mt-10 flex justify-center lg:justify-start">
            <a
              href="#gallery"
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-full overflow-hidden shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/40"
              style={{ padding: '16px 32px' }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Lihat Galeri</span>
              <div className="relative z-10 bg-white/20 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                <IconRenderer name="ArrowRight" size={18} />
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Image Accordion */}
        <div 
          className="w-full lg:w-7/12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-row items-center justify-center lg:justify-end gap-2 sm:gap-4 w-full">
            {stats.map((item, index) => (
              <AccordionItem
                key={item.label}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
