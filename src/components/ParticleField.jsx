import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.1,
      color: Math.random() > 0.5 ? '#10b981' : Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4',
      pulse: Math.random() * Math.PI * 2,
    }));

    let animFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const opacityMultiplier = isLight ? 2.5 : 1;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        let opacity = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3) * opacityMultiplier;
        if (opacity > 1) opacity = 1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (isLight ? 1.5 : 1), 0, Math.PI * 2);
        
        if (isLight) {
          // Use slate-800 for particles in light mode instead of bright colors which blend with white bg
          ctx.fillStyle = `rgba(30, 41, 59, ${opacity})`;
        } else {
          ctx.fillStyle = p.color + Math.round(opacity * 255).toString(16).padStart(2, '0');
        }
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 120) * (isLight ? 0.4 : 0.15);
            ctx.strokeStyle = isLight ? `rgba(15, 23, 42, ${alpha})` : `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = isLight ? 1 : 0.5;
            ctx.stroke();
          }
        });
      });

      animFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
}
